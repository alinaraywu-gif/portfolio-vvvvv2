import AVFoundation
import CoreGraphics
import CoreImage
import Foundation
import ImageIO
import UniformTypeIdentifiers

func gifDelay(_ source: CGImageSource, _ index: Int) -> Double {
    guard
        let properties = CGImageSourceCopyPropertiesAtIndex(source, index, nil) as? [CFString: Any],
        let gif = properties[kCGImagePropertyGIFDictionary] as? [CFString: Any]
    else {
        return 0.08
    }

    let unclamped = gif[kCGImagePropertyGIFUnclampedDelayTime] as? Double
    let clamped = gif[kCGImagePropertyGIFDelayTime] as? Double
    let delay = unclamped ?? clamped ?? 0.08
    return delay < 0.02 ? 0.08 : delay
}

func makeBuffer(from image: CGImage, width: Int, height: Int) throws -> CVPixelBuffer {
    var pixelBuffer: CVPixelBuffer?
    let attrs: [CFString: Any] = [
        kCVPixelBufferCGImageCompatibilityKey: true,
        kCVPixelBufferCGBitmapContextCompatibilityKey: true,
    ]
    let status = CVPixelBufferCreate(
        kCFAllocatorDefault,
        width,
        height,
        kCVPixelFormatType_32ARGB,
        attrs as CFDictionary,
        &pixelBuffer
    )
    guard status == kCVReturnSuccess, let buffer = pixelBuffer else {
        throw NSError(domain: "GifConvert", code: 1)
    }

    CVPixelBufferLockBaseAddress(buffer, [])
    defer { CVPixelBufferUnlockBaseAddress(buffer, []) }

    guard let context = CGContext(
        data: CVPixelBufferGetBaseAddress(buffer),
        width: width,
        height: height,
        bitsPerComponent: 8,
        bytesPerRow: CVPixelBufferGetBytesPerRow(buffer),
        space: CGColorSpaceCreateDeviceRGB(),
        bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue
    ) else {
        throw NSError(domain: "GifConvert", code: 2)
    }

    context.setFillColor(CGColor(gray: 0, alpha: 1))
    context.fill(CGRect(x: 0, y: 0, width: width, height: height))

    let scale = min(Double(width) / Double(image.width), Double(height) / Double(image.height))
    let drawWidth = Double(image.width) * scale
    let drawHeight = Double(image.height) * scale
    let x = (Double(width) - drawWidth) / 2
    let y = (Double(height) - drawHeight) / 2

    context.interpolationQuality = .high
    context.draw(image, in: CGRect(x: x, y: y, width: drawWidth, height: drawHeight))
    return buffer
}

let args = CommandLine.arguments
guard args.count >= 3 else {
    fputs("Usage: swift convert-gif-to-mp4.swift input.gif output.mp4 [width]\n", stderr)
    exit(2)
}

let inputURL = URL(fileURLWithPath: args[1])
let outputURL = URL(fileURLWithPath: args[2])
let targetWidth = args.count >= 4 ? Int(args[3]) ?? 960 : 960

guard let source = CGImageSourceCreateWithURL(inputURL as CFURL, nil) else {
    fputs("Could not read GIF: \(inputURL.path)\n", stderr)
    exit(3)
}

let frameCount = CGImageSourceGetCount(source)
guard frameCount > 0, let first = CGImageSourceCreateImageAtIndex(source, 0, nil) else {
    fputs("GIF has no frames: \(inputURL.path)\n", stderr)
    exit(4)
}

let targetHeight = Int((Double(first.height) / Double(first.width) * Double(targetWidth)).rounded())
try? FileManager.default.removeItem(at: outputURL)

let writer = try AVAssetWriter(outputURL: outputURL, fileType: .mp4)
let settings: [String: Any] = [
    AVVideoCodecKey: AVVideoCodecType.h264,
    AVVideoWidthKey: targetWidth,
    AVVideoHeightKey: targetHeight,
    AVVideoCompressionPropertiesKey: [
        AVVideoAverageBitRateKey: 1_800_000,
        AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
    ],
]
let input = AVAssetWriterInput(mediaType: .video, outputSettings: settings)
input.expectsMediaDataInRealTime = false
let adaptor = AVAssetWriterInputPixelBufferAdaptor(
    assetWriterInput: input,
    sourcePixelBufferAttributes: [
        kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32ARGB,
        kCVPixelBufferWidthKey as String: targetWidth,
        kCVPixelBufferHeightKey as String: targetHeight,
    ]
)
guard writer.canAdd(input) else {
    fputs("Cannot add video input\n", stderr)
    exit(5)
}
writer.add(input)
writer.startWriting()
writer.startSession(atSourceTime: .zero)

let frameDurationScale: Int32 = 600
var currentTime = CMTime.zero

for index in 0..<frameCount {
    while !input.isReadyForMoreMediaData {
        Thread.sleep(forTimeInterval: 0.01)
    }
    guard let frame = CGImageSourceCreateImageAtIndex(source, index, nil) else { continue }
    let buffer = try makeBuffer(from: frame, width: targetWidth, height: targetHeight)
    adaptor.append(buffer, withPresentationTime: currentTime)
    let delay = gifDelay(source, index)
    currentTime = currentTime + CMTime(seconds: delay, preferredTimescale: frameDurationScale)
}

input.markAsFinished()
writer.finishWriting {
    if writer.status == .failed {
        fputs("Failed: \(writer.error?.localizedDescription ?? "unknown error")\n", stderr)
        exit(6)
    }
}
while writer.status == .writing {
    Thread.sleep(forTimeInterval: 0.05)
}

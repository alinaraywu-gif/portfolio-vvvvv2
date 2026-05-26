import type { CSSProperties } from "react";

type MediaSlotTone = "cyan" | "green" | "neutral" | "pink" | "sun" | "warm";
type MediaSlotKind = "image" | "phone" | "strip" | "video" | "wide";

const toneStyles: Record<MediaSlotTone, { accent: string; bg: string; text: string }> = {
  cyan: {
    accent: "#42E8E0",
    bg: "rgba(66, 232, 224, 0.08)",
    text: "text-[#42E8E0]",
  },
  green: {
    accent: "#72F064",
    bg: "rgba(114, 240, 100, 0.08)",
    text: "text-[#72F064]",
  },
  neutral: {
    accent: "#A8B1B8",
    bg: "rgba(168, 177, 184, 0.08)",
    text: "text-[#A8B1B8]",
  },
  pink: {
    accent: "#FF5E9F",
    bg: "rgba(255, 94, 159, 0.08)",
    text: "text-[#FF5E9F]",
  },
  sun: {
    accent: "#FFDD42",
    bg: "rgba(255, 221, 66, 0.08)",
    text: "text-[#FFDD42]",
  },
  warm: {
    accent: "#FF8B3D",
    bg: "rgba(255, 139, 61, 0.08)",
    text: "text-[#FF8B3D]",
  },
};

const labelByKind: Record<MediaSlotKind, string> = {
  image: "Visual",
  phone: "Screen",
  strip: "Touchpoint",
  video: "Motion",
  wide: "Hero visual",
};

export default function MediaSlot({
  alt,
  className = "",
  kind = "image",
  src,
  subtitle,
  title,
  tone = "neutral",
}: {
  alt?: string;
  className?: string;
  kind?: MediaSlotKind;
  src?: string;
  subtitle?: string;
  title: string;
  tone?: MediaSlotTone;
}) {
  const style = toneStyles[tone];
  const isPhone = kind === "phone";
  const isVideo = kind === "video";

  // 有图片时：全宽展示，不裁切，不加边框
  if (src) {
    return (
      <figure className={`w-full ${className}`}>
        <div className={`overflow-hidden rounded-lg ${isPhone ? "mx-auto max-w-[270px] rounded-[32px]" : ""}`}>
          {isVideo ? (
            <video
              autoPlay
              className="block w-full"
              loop
              muted
              playsInline preload="metadata"
              src={src}
            />
          ) : (
            <img
              alt={alt || title}
              className="block w-full"
              loading="lazy"
              src={src}
            />
          )}
        </div>
      </figure>
    );
  }

  // 没有图片时：占位符
  return (
    <figure className={`${isPhone ? "mx-auto max-w-[270px]" : "w-full"} ${className}`}>
      <div
        className={`relative overflow-hidden rounded-lg ${isPhone ? "rounded-[32px]" : ""}`}
        style={{ aspectRatio: "16 / 10", "--slot-accent": style.accent } as CSSProperties}
      >
        <div
          className="relative flex h-full min-h-[160px] flex-col justify-between overflow-hidden"
          style={{ background: `linear-gradient(145deg, ${style.bg}, rgba(255,255,255,0.025))` }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:28px_28px]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/[0.04] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--slot-accent)] to-transparent opacity-70" />
          <div className="relative p-5">
            <p className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${style.text}`}>
              {labelByKind[kind]}
            </p>
            <h3 className="mt-3 text-[18px] font-bold leading-tight text-[#F4F7F8]">{title}</h3>
            {subtitle && (
              <p className="mt-2 max-w-[420px] text-[13px] font-light leading-relaxed text-[#A8B1B8]">
                {subtitle}
              </p>
            )}
          </div>
          <div className="relative p-5">
            <div className="flex items-end gap-2 opacity-70">
              <span className="h-10 w-2 rounded-full bg-[var(--slot-accent)]" />
              <span className="h-16 w-2 rounded-full bg-white/25" />
              <span className="h-7 w-2 rounded-full bg-white/15" />
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

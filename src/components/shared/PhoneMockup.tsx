/**
 * Premium phone mockup with 9:19.5 aspect ratio and large rounded corners.
 *
 * Spec:
 * - Phone mockup border-radius: 36–40px
 * - Inner screen radius: 28–32px
 * - Hover: slight lift + image scale 1.025
 * - Image enter: scale 0.96 → 1, blur 18 → 0
 */
export default function PhoneMockup({
  src,
  alt,
  title,
  caption,
  loading = "lazy",
  size = "default",
}: {
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
  loading?: "eager" | "lazy";
  size?: "sm" | "default" | "lg";
}) {
  const maxW =
    size === "sm"
      ? "max-w-[200px]"
      : size === "lg"
        ? "max-w-[360px]"
        : "max-w-[310px]";

  return (
    <figure className="group">
      <div
        className={`relative mx-auto ${maxW} overflow-hidden rounded-[36px] bg-[#141414] p-[6px] shadow-[0_30px_80px_rgba(0,0,0,0.5)] ring-1 ring-white/[0.08] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:-translate-y-1`}
      >
        {/* Dynamic island */}
        <div className="absolute left-1/2 top-[10px] z-10 h-[6px] w-[60px] -translate-x-1/2 rounded-full bg-black/50" />
        {/* Screen */}
        <div className="relative overflow-hidden rounded-[30px] bg-[#0A0A0A]">
          <img
            alt={alt || title || caption || "Phone screenshot"}
            className="block aspect-[9/19.5] w-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
            loading={loading}
            src={src}
          />
          {/* Inner ring for depth */}
          <div className="pointer-events-none absolute inset-0 rounded-[30px] ring-1 ring-inset ring-white/[0.06]" />
        </div>
      </div>
      {(title || caption) && (
        <figcaption className={`mx-auto ${maxW} px-1 pt-5`}>
          {title && (
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#A8B1B8]">
              {title}
            </p>
          )}
          {caption && (
            <p className="mt-2 text-[13px] font-light leading-relaxed text-[#667078]">
              {caption}
            </p>
          )}
        </figcaption>
      )}
    </figure>
  );
}

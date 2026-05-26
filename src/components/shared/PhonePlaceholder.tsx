/**
 * Phone-shaped placeholder with dashed outline and accent dot.
 * Used in pages that haven't yet received real screenshots.
 */
export default function PhonePlaceholder({
  label,
  accent = "#D7E2EA",
}: {
  label: string;
  accent?: string;
}) {
  return (
    <div className="mx-auto max-w-[240px]">
      <div
        className="relative overflow-hidden rounded-[22px] border border-[#D7E2EA]/15 bg-[#10120f] p-2 shadow-[0_22px_70px_rgba(0,0,0,0.38)]"
        style={{ aspectRatio: "750 / 1624" }}
      >
        <div className="absolute left-1/2 top-2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-black/45" />
        <div
          aria-hidden="true"
          className="absolute inset-x-4 top-12 h-28 rounded-2xl opacity-25 blur-2xl"
          style={{ backgroundColor: accent }}
        />
        <div className="relative h-full overflow-hidden rounded-[16px] border border-white/10 bg-[#171a16]">
          <div
            className="h-[28%] border-b border-white/10"
            style={{
              background: `linear-gradient(135deg, ${accent}38 0%, rgba(255,255,255,0.08) 48%, rgba(255,255,255,0.02) 100%)`,
            }}
          />
          <div className="space-y-3 p-4">
            <div className="h-3 w-24 rounded-full bg-white/18" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-20 rounded-xl bg-white/[0.075]" />
              <div className="h-20 rounded-xl bg-white/[0.045]" />
            </div>
            <div className="space-y-2">
              <div className="h-14 rounded-xl bg-white/[0.06]" />
              <div className="h-14 rounded-xl bg-white/[0.045]" />
              <div className="h-14 rounded-xl bg-white/[0.035]" />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center px-8">
          <p className="rounded-full border border-white/12 bg-black/45 px-4 py-2 text-center text-[11px] font-medium leading-snug text-[#D7E2EA]/60 shadow-[0_12px_36px_rgba(0,0,0,0.35)] backdrop-blur-md">
            {label}
          </p>
        </div>
        <div
          className="absolute bottom-4 left-4 h-2 w-2 rounded-full shadow-[0_0_18px_currentColor]"
          style={{ backgroundColor: accent, color: accent }}
        />
      </div>
    </div>
  );
}

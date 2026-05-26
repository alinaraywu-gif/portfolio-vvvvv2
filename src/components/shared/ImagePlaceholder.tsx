/**
 * Generic rectangular placeholder for images / banners / illustrations.
 */
export default function ImagePlaceholder({
  label,
  height = "h-[280px]",
}: {
  label: string;
  height?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[18px] border border-[#D7E2EA]/12 bg-[#D7E2EA]/[0.035] shadow-[0_22px_70px_rgba(0,0,0,0.24)] ${height}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.10),transparent_38%),radial-gradient(circle_at_78%_18%,rgba(244,222,34,0.12),transparent_28%)]" />
      <div className="absolute inset-x-8 top-8 h-10 rounded-full border border-white/10 bg-white/[0.035]" />
      <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-4">
        <div className="h-20 rounded-2xl bg-white/[0.07]" />
        <div className="h-20 rounded-2xl bg-white/[0.045]" />
        <div className="h-20 rounded-2xl bg-white/[0.06]" />
      </div>
      <div className="relative flex h-full items-center justify-center px-6">
        <p className="rounded-full border border-white/12 bg-black/35 px-5 py-2 text-center text-sm font-medium text-[#D7E2EA]/62 backdrop-blur-md">
          {label}
        </p>
      </div>
    </div>
  );
}

import type { ReactNode } from "react";

/**
 * Page container with spec-compliant max-width and padding.
 * - Max width: 1120px (content), outer page max 1200px
 * - Desktop padding: 64px, Mobile padding: 24px
 */
export default function PageContainer({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  /** Use 1200px instead of 1120px */
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full ${wide ? "max-w-[1200px]" : "max-w-[1120px]"} px-6 md:px-16 ${className}`}
    >
      {children}
    </div>
  );
}

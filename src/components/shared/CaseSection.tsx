import type { ReactNode } from "react";
import FadeInSection from "./FadeInSection";
import PageContainer from "./PageContainer";

/**
 * Reusable case detail section.
 *
 * Spec-compliant spacing:
 * - Large chapter gap: 140–180px (py-[clamp(80px,12vw,180px)])
 * - Section Title: 40–52px desktop, 30–36px mobile
 * - Lead Text: 18–22px
 * - Label: 11–12px, letter-spacing 0.12em
 *
 * `accentColor` controls the eyebrow label colour.
 */
export default function CaseSection({
  children,
  eyebrow,
  id,
  intro,
  title,
  accentColor = "text-[#A8B1B8]",
  compact = false,
}: {
  children: ReactNode;
  eyebrow: string;
  id: string;
  intro?: string;
  title: ReactNode;
  accentColor?: string;
  /** Use smaller spacing (64–96px) instead of large chapter gap */
  compact?: boolean;
}) {
  return (
    <section
      className={compact ? "py-[clamp(40px,5vw,64px)]" : "py-[clamp(48px,6vw,96px)]"}
      id={id}
    >
      <PageContainer>
        <FadeInSection>
          <p
            className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${accentColor}`}
          >
            {eyebrow}
          </p>
          <h2 className="text-balance mt-5 max-w-[1120px] text-[clamp(1.875rem,4.2vw,3.25rem)] font-black leading-[1.08] tracking-normal text-[#F4F7F8]">
            {title}
          </h2>
          {intro && (
            <p className="text-pretty mt-6 max-w-[960px] text-[clamp(1rem,1.4vw,1.25rem)] font-light leading-[1.7] text-[#A8B1B8]">
              {intro}
            </p>
          )}
        </FadeInSection>
        <div className="mt-10 space-y-8">{children}</div>
      </PageContainer>
    </section>
  );
}

import { type ReactNode, useEffect, useRef, useState } from "react";

/**
 * Premium fade-in with opacity + translateY + blur reveal.
 * Uses IntersectionObserver for scroll-triggered entrance.
 * Easing: cubic-bezier(0.16, 1, 0.3, 1) — the spec "premium motion" curve.
 */
export default function FadeInSection({
  children,
  className = "",
  delay = 0,
  blur = 12,
  y = 32,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  blur?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={className}
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0,0,0)" : `translate3d(0,${y}px,0)`,
        filter: visible ? "blur(0px)" : `blur(${blur}px)`,
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: visible ? "auto" : "opacity, transform, filter",
      }}
    >
      {children}
    </div>
  );
}

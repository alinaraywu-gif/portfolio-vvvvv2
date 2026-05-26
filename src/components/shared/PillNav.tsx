import { type MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { appPath } from "../../utils/assetPath";

export type PillNavItem = { label: string; href: string };

/**
 * Project navigation order (circular):
 *   instant-retail → daily-low-price → emotional-design → pinhaofan-growth → yearly-recap-2023 → instant-retail
 */
export const PROJECT_ORDER = [
  { slug: "instant-retail-redesign", label: "闪购改版" },
  { slug: "daily-low-price", label: "每日神价" },
  { slug: "emotional-design", label: "情感化设计" },
  { slug: "pinhaofan-growth", label: "拼好饭增长" },
  { slug: "yearly-recap-2023", label: "年度账单" },
  { slug: "written-tests", label: "笔试题" },
] as const;

/**
 * Returns { prev, next } navigation items for the given project slug.
 */
export function getProjectNav(currentSlug: string) {
  const idx = PROJECT_ORDER.findIndex((p) => p.slug === currentSlug);
  if (idx === -1) return { prev: null, next: null };
  const prevIdx = (idx - 1 + PROJECT_ORDER.length) % PROJECT_ORDER.length;
  const nextIdx = (idx + 1) % PROJECT_ORDER.length;
  return {
    prev: {
      label: `← ${PROJECT_ORDER[prevIdx].label}`,
      href: appPath(`/project/${PROJECT_ORDER[prevIdx].slug}`),
    },
    next: {
      label: `${PROJECT_ORDER[nextIdx].label} →`,
      href: appPath(`/project/${PROJECT_ORDER[nextIdx].slug}`),
    },
  };
}

/**
 * Sticky bottom pill navigation bar.
 *
 * Features:
 * - IntersectionObserver-based active section tracking
 * - Mobile-friendly horizontal scroll with hidden scrollbar
 * - Optional prev/next project navigation (pass `projectSlug` to enable)
 */
export default function PillNav({
  items,
  projectSlug,
}: {
  items: PillNavItem[];
  projectSlug?: string;
}) {
  const [active, setActive] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const isUserNavigating = useRef(false);
  const sectionIds = useMemo(
    () => items.map((n) => (n.href.startsWith("#") ? n.href.slice(1) : "")).filter(Boolean),
    [items],
  );

  /* ── active section tracking: recompute from live layout ── */
  useEffect(() => {
    let frame = 0;
    let sectionTops: Array<{ id: string; top: number }> = [];

    const measure = () => {
      sectionTops = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, top: el.getBoundingClientRect().top + window.scrollY } : null;
        })
        .filter((item): item is { id: string; top: number } => item !== null)
        .sort((a, b) => a.top - b.top);
    };

    const updateActive = () => {
      frame = 0;
      if (isUserNavigating.current) return;
      if (sectionTops.length === 0) measure();

      const readLine = window.scrollY + window.innerHeight * 0.42;
      let nextActive = sectionTops[0]?.id ?? "";

      for (const section of sectionTops) {
        if (section.top <= readLine) nextActive = section.id;
        else break;
      }

      setActive((current) => (current === nextActive ? current : nextActive));
    };

    const scheduleUpdate = (shouldMeasure = false) => {
      if (shouldMeasure) measure();
      if (frame) return;
      frame = window.requestAnimationFrame(updateActive);
    };
    const handleScroll = () => scheduleUpdate();
    const handleResize = () => scheduleUpdate(true);
    const handleLoad = () => scheduleUpdate(true);

    measure();
    scheduleUpdate();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleLoad);

    const resizeObserver = new ResizeObserver(() => scheduleUpdate(true));
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) resizeObserver.observe(el);
    }

    const mutationObserver = new MutationObserver(() => scheduleUpdate(true));
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    document.fonts?.ready.then(() => scheduleUpdate(true)).catch(() => undefined);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleLoad);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [sectionIds]);

  useEffect(() => {
    const activeLink = scrollRef.current?.querySelector<HTMLAnchorElement>(
      `a[data-section-id="${active}"]`,
    );
    activeLink?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [active]);

  /* ── build full nav list with prev/next ── */
  const nav = projectSlug ? getProjectNav(projectSlug) : null;
  const allItems: PillNavItem[] = [
    ...(nav?.prev ? [nav.prev] : []),
    ...items,
    ...(nav?.next ? [nav.next] : []),
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 z-50 w-[calc(100%-2rem)] max-w-fit -translate-x-1/2">
      <div
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto rounded-full border border-white/10 bg-black/75 px-5 py-3 shadow-[0_22px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl scrollbar-none"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {allItems.map((n) => {
          const sectionId = n.href.replace(/^.*#/, "");
          const isActive = active === sectionId && !n.href.includes("/project/");
          const isPrev = nav?.prev?.href === n.href;
          const isNext = nav?.next?.href === n.href;
          const isProjectLink = isPrev || isNext;
          const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
            if (!n.href.startsWith("#")) return;
            const target = document.getElementById(sectionId);
            if (!target) return;
            event.preventDefault();
            isUserNavigating.current = true;
            setActive(sectionId);
            target.scrollIntoView({ block: "start", behavior: "smooth" });
            window.history.replaceState(null, "", n.href);
            // Re-enable scroll-based tracking after smooth scroll completes
            setTimeout(() => { isUserNavigating.current = false; }, 1000);
          };

          return (
            <a
              key={n.href + n.label}
              href={n.href}
              data-section-id={sectionId}
              onClick={handleClick}
              className={[
                "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-medium tracking-wide transition-all duration-200",
                isActive
                  ? "bg-white/15 text-[#e8edf2]"
                  : isProjectLink
                    ? "text-[#e8edf2]/50 hover:bg-white/8 hover:text-[#e8edf2]/80"
                    : "text-[#e8edf2]/40 hover:text-[#e8edf2]/70",
              ].join(" ")}
            >
              {isPrev && <ArrowLeft className="h-3 w-3" />}
              {n.label.replace(/^← /, "").replace(/ →$/, "")}
              {isNext && <ArrowRight className="h-3 w-3" />}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

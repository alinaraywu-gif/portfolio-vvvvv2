import {
  Children,
  type CSSProperties,
  type ReactElement,
  type PointerEvent,
  type ReactNode,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import AnimatedAvatar from "./AnimatedAvatar";
import { appPath, assetPath } from "../utils/assetPath";

const coverImage = (filename: string) => assetPath(`assets/covers/${filename}`);

const marqueeImages = [
  coverImage("instant-retail-1.webp"),
  coverImage("instant-retail-2.webp"),
  coverImage("instant-retail-3.webp"),
  coverImage("daily-low-price-1.webp"),
  coverImage("daily-low-price-2.webp"),
  coverImage("daily-low-price-3.webp"),
  coverImage("emotional-design-1.webp"),
  coverImage("emotional-design-2.webp"),
  coverImage("emotional-design-3.webp"),
  coverImage("yearly-recap-1.webp"),
  coverImage("yearly-recap-2.webp"),
  coverImage("yearly-recap-3.webp"),
  coverImage("pinhaofan-1.webp"),
  coverImage("pinhaofan-2.webp"),
  coverImage("pinhaofan-3.webp"),
];

const decorImages: { alt: string; className: string; delay: number; src: string; x: number }[] = [
  {
    alt: "3D star",
    className: "w-24 h-24 md:w-36 md:h-36 top-[12%] left-[6%] md:left-[10%]",
    delay: 0,
    src: assetPath("assets/decor/star-3d.webp"),
    x: -60,
  },
  {
    alt: "3D vortex",
    className: "w-24 h-24 md:w-36 md:h-36 top-[18%] right-[6%] md:right-[10%]",
    delay: 0.15,
    src: assetPath("assets/decor/vortex-3d.webp"),
    x: 50,
  },
  {
    alt: "3D glass",
    className: "w-28 h-28 md:w-40 md:h-40 bottom-[18%] left-[4%] md:left-[8%]",
    delay: 0.3,
    src: assetPath("assets/decor/glass-3d.webp"),
    x: -40,
  },
  {
    alt: "Crazy Hour",
    className: "w-24 h-24 md:w-36 md:h-36 bottom-[12%] right-[4%] md:right-[8%]",
    delay: 0.45,
    src: assetPath("assets/decor/crazy-hour-3d.webp"),
    x: 60,
  },
];

const services = [
  {
    name: "电商体验策略",
    englishName: "Commerce UX Strategy",
    description:
      "围绕用户决策效率拆解电商链路，把浏览、比较、信任和转化过程设计得更清晰、更容易行动。",
  },
  {
    name: "产品改版设计",
    englishName: "Product Redesign",
    description:
      "从业务目标、信息结构、交互状态到视觉层级，支持产品从 1.0 到 3.0 的持续迭代与体验升级。",
  },
  {
    name: "视觉系统搭建",
    englishName: "Visual System",
    description:
      "沉淀可复用的组件、运营语言和视觉规则，让频道、活动与功能页面在高频迭代中保持一致性。",
  },
  {
    name: "增长营销设计",
    englishName: "Growth Design",
    description:
      "结合拉新、转化、留存等业务目标，设计兼顾商业效率和用户理解成本的增长触点。",
  },
  {
    name: "情感化表达",
    englishName: "Emotional Design",
    description:
      "在不牺牲可用性的前提下，为电商场景加入记忆点、情绪价值和品牌化叙事。",
  },
];

export type HomeProject = {
  id: string;
  number: string;
  title: string;
  englishTitle: string;
  subtitle: string;
  tags: string[];
  coverImages?: string[];
  link: string;
  category?: string;
  englishCategory?: string;
  nameLines?: string[];
  titleClassName?: string;
};

const instantRetailCoverImages = [
  coverImage("instant-retail-1.webp"),
  coverImage("instant-retail-2.webp"),
  coverImage("instant-retail-3.webp"),
];

const dailyLowPriceCoverImages = [
  coverImage("daily-low-price-1.webp"),
  coverImage("daily-low-price-2.webp"),
  coverImage("daily-low-price-3.webp"),
];

const emotionalDesignCoverImages = [
  coverImage("emotional-design-1.webp"),
  coverImage("emotional-design-2.webp"),
  coverImage("emotional-design-3.webp"),
];

const yearlyRecapCoverImages = [
  coverImage("yearly-recap-1.webp"),
  coverImage("yearly-recap-2.webp"),
  coverImage("yearly-recap-3.webp"),
];

const pinhaofanCoverImages = [
  coverImage("pinhaofan-1.webp"),
  coverImage("pinhaofan-2.webp"),
  coverImage("pinhaofan-3.webp"),
];

const defaultProjectCoverImages = instantRetailCoverImages;

export const homeProjects: HomeProject[] = [
  {
    id: "instant-retail-redesign",
    number: "01",
    title: "美团闪购改版 1.0 → 2.0 → 3.0",
    englishTitle: "Meituan Instant Retail Redesign",
    subtitle: "从认识闪购，到高效购买",
    tags: ["C端电商体验", "首页改版", "用户决策路径", "视觉系统"],
    coverImages: instantRetailCoverImages,
    link: "/project/instant-retail-redesign",
    category: "核心业务改版",
    englishCategory: "Commerce Case",
    nameLines: ["美团闪购改版"],
    titleClassName: "text-[clamp(2.25rem,4.4vw,5rem)]",
  },
  {
    id: "daily-low-price",
    number: "02",
    title: "每日神价频道改版",
    englishTitle: "Daily Low Price Channel",
    subtitle: "强化低价心智与商品点击效率",
    tags: ["频道增长设计", "低价心智", "商品点击效率", "运营转化"],
    coverImages: dailyLowPriceCoverImages,
    link: "/project/daily-low-price",
    category: "频道增长设计",
    englishCategory: "Growth Channel",
    nameLines: ["每日神价频道改版"],
    titleClassName: "text-[clamp(1.72rem,3.15vw,3.65rem)]",
  },
  {
    id: "emotional-design",
    number: "03",
    title: "闪购情感化设计",
    englishTitle: "Emotional Design System",
    subtitle: "用 IP 和动效建立品牌记忆",
    tags: ["情感化设计", "IP 设计", "动效表达", "品牌记忆"],
    coverImages: emotionalDesignCoverImages,
    link: "/project/emotional-design",
    category: "情感化设计",
    englishCategory: "Visual Narrative",
    nameLines: ["闪购情感化设计"],
    titleClassName: "text-[clamp(1.86rem,3.3vw,3.85rem)]",
  },
  {
    id: "yearly-recap-2023",
    number: "04",
    title: "美团外卖年度账单 2023",
    englishTitle: "Meituan Waimai Yearly Recap 2023",
    subtitle: "把年度数据转化成情绪化叙事",
    tags: ["年度运营活动", "数据叙事", "情绪化表达", "活动设计"],
    coverImages: yearlyRecapCoverImages,
    link: "/project/yearly-recap-2023",
    category: "年度运营活动",
    englishCategory: "Annual Campaign",
    nameLines: ["美团外卖", "年度账单 2023"],
    titleClassName: "text-[clamp(1.8rem,3.35vw,3.9rem)]",
  },
  {
    id: "pinhaofan-growth",
    number: "05",
    title: "拼好饭用户增长营销设计",
    englishTitle: "Pinhaofan Growth Marketing",
    subtitle: "高频增长场景下的营销视觉提效",
    tags: ["用户增长营销", "营销视觉", "高频增长", "转化提效"],
    coverImages: pinhaofanCoverImages,
    link: "/project/pinhaofan-growth",
    category: "用户增长营销",
    englishCategory: "Growth Marketing",
    nameLines: ["拼好饭用户增长", "营销设计"],
    titleClassName: "text-[clamp(1.78rem,3.25vw,3.75rem)]",
  },
];

export const projectCards = homeProjects;

export function getProjectLink(project: HomeProject) {
  return project.link || "#projects";
}

export function getProjectName(project: HomeProject) {
  return project.title;
}

export function getProjectTitleLines(project: HomeProject) {
  return project.nameLines && project.nameLines.length > 0
    ? project.nameLines
    : [project.title];
}

export function getProjectEnglishTitle(project: HomeProject) {
  return project.englishTitle;
}

export function getProjectCategory(project: HomeProject) {
  return project.category || project.tags[0] || "核心项目";
}

export function getProjectEnglishCategory(project: HomeProject) {
  return project.englishCategory || "Selected Project";
}

export function getProjectTitleClassName(project: HomeProject) {
  return project.titleClassName || "text-[clamp(1.78rem,3.25vw,3.75rem)]";
}

export function getProjectCoverImages(project: HomeProject) {
  const images = project.coverImages || [];

  return [
    images[0] || defaultProjectCoverImages[0],
    images[1] || images[0] || defaultProjectCoverImages[1],
    images[2] || images[1] || images[0] || defaultProjectCoverImages[2],
  ];
}

const navItems = [
  { label: "概述", englishLabel: "Overview", href: "#about" },
  { label: "作品", englishLabel: "Works", href: "#works" },
  { label: "项目", englishLabel: "Projects", href: "#projects" },
];

export default function PortfolioLanding() {
  useEffect(() => {
    document.title = "Neeko Wu -- 项目整理";
  }, []);

  return (
    <main className="min-h-screen overflow-x-clip bg-[#0C0C0C] text-[#D7E2EA]">
      <StickyNav />
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <div className="section-divider mx-auto max-w-5xl" />
      <ServicesSection />
      <div className="section-divider mx-auto max-w-5xl" />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}

function StickyNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 grid grid-cols-3 items-start gap-3 px-5 pt-5 pb-4 text-center text-xs font-medium uppercase tracking-wider text-[#D7E2EA] transition-all duration-300 sm:px-6 sm:text-sm md:px-10 md:pt-6 md:text-base lg:text-lg ${
        scrolled
          ? "bg-[#0C0C0C]/80 backdrop-blur-xl shadow-[0_1px_0_rgba(215,226,234,0.08)]"
          : "bg-transparent"
      }`}
    >
      {navItems.map((item) => (
        <a
          className="flex min-w-0 flex-col gap-0.5 transition-opacity duration-200 hover:opacity-70"
          href={item.href}
          key={item.href}
        >
          <span>{item.label}</span>
          <span className="hidden text-[0.52em] font-light tracking-[0.24em] opacity-60 sm:block">
            {item.englishLabel}
          </span>
        </a>
      ))}
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      className="relative flex h-screen min-h-[720px] flex-col overflow-hidden overflow-x-clip bg-[#0C0C0C]"
      id="top"
    >
      {/* Spacer for the fixed StickyNav */}
      <div className="h-16 md:h-20" />

      <div className="relative flex flex-1 flex-col justify-between">
        <div className="relative z-0 overflow-hidden px-3">
          <FadeIn delay={0.15} immediate y={40}>
            <h1 className="hero-heading mx-auto mt-6 w-full max-w-[100vw] whitespace-nowrap text-center text-[clamp(4.3rem,15vw,16rem)] font-black uppercase leading-none tracking-tight sm:mt-4 md:-mt-4">
              Neeko Wu
            </h1>
          </FadeIn>
        </div>

        <div className="pointer-events-none absolute left-1/2 top-[47%] z-10 w-[min(98vw,540px)] max-w-none -translate-x-1/2 -translate-y-1/2 sm:w-[min(70vw,640px)] md:w-[min(58vw,740px)] lg:w-[min(50vw,820px)] xl:w-[min(46vw,900px)]">
          <FadeIn delay={0.6} immediate y={30}>
            <Magnet
              activeTransition="transform 0.3s ease-out"
              inactiveTransition="transform 0.6s ease-in-out"
              padding={150}
              strength={3}
            >
              <HeroCaseVisual />
            </Magnet>
          </FadeIn>
        </div>

        <div className="relative z-20 flex items-end justify-between gap-8 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
          <FadeIn delay={0.35} immediate y={20}>
            <p className="max-w-[190px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[240px] md:max-w-[300px]">
              电商体验设计 · 项目整理
              <span className="mt-3 block text-[0.68em] tracking-[0.22em] opacity-60">
                Commerce UX / Project Archive
              </span>
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function HeroCaseVisual() {
  return (
    <div className="pointer-events-auto relative aspect-square w-full">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(182, 0, 168, 0.24), rgba(118, 33, 176, 0.13) 45%, transparent 72%)",
        }}
      />

      <AnimatedAvatar
        className="relative z-10 h-full w-full scale-[1.02] object-contain drop-shadow-[0_42px_110px_rgba(0,0,0,0.78)]"
      />

      <div className="absolute bottom-[7%] left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full border-2 border-[#D7E2EA] bg-[#0C0C0C]/82 px-5 py-3 text-xs font-medium tracking-[0.22em] text-white shadow-[0_18px_44px_rgba(0,0,0,0.42)] backdrop-blur-md sm:text-sm">
        <span>个人品牌 Personal IP</span>
        <span className="h-2 w-2 rounded-full bg-[#B600A8]" />
      </div>
    </div>
  );
}

function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const rowOne = marqueeImages.slice(0, 11);
  const rowTwo = marqueeImages.slice(11);

  useEffect(() => {
    function updateOffset() {
      if (!sectionRef.current) {
        return;
      }

      const sectionTop =
        sectionRef.current.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    }

    updateOffset();
    window.addEventListener("scroll", updateOffset, { passive: true });
    window.addEventListener("resize", updateOffset);

    return () => {
      window.removeEventListener("scroll", updateOffset);
      window.removeEventListener("resize", updateOffset);
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
      id="works"
      ref={sectionRef}
    >
      <MarqueeRow images={rowOne} translateX={offset - 200} />
      <MarqueeRow images={rowTwo} translateX={-(offset - 200)} />
    </section>
  );
}

function MarqueeRow({
  images,
  translateX,
}: {
  images: string[];
  translateX: number;
}) {
  const repeatedImages = [...images, ...images, ...images];

  return (
    <div
      className="mb-3 flex gap-3"
      style={{ transform: `translateX(${translateX}px)`, willChange: "transform" }}
    >
      {repeatedImages.map((src, index) => (
        <img
          alt=""
          className="h-[193px] w-[300px] shrink-0 rounded-2xl object-cover sm:h-[270px] sm:w-[420px]"
          key={`${src}-${index}`}
          loading="lazy"
          src={src}
        />
      ))}
    </div>
  );
}

function AboutSection() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10"
      id="about"
    >
      {decorImages.map((image) => (
        <FadeIn
          className={`pointer-events-none absolute hidden sm:block ${image.className}`}
          delay={image.delay}
          duration={0.9}
          key={image.src}
          x={image.x}
          y={0}
        >
          <img alt={image.alt} className="w-full" loading="lazy" src={image.src} />
        </FadeIn>
      ))}

      <div className="relative z-10 flex max-w-3xl flex-col items-center gap-10 text-center sm:gap-14 md:gap-16">
        <FadeIn y={40}>
          <h2 className="hero-heading text-keep text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">
            概述
            <span className="mt-3 block text-[0.14em] font-medium uppercase tracking-[0.28em] text-[#D7E2EA] [-webkit-text-fill-color:#D7E2EA]">
              Overview
            </span>
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText text="这份整理收录了我在美团闪购、拼好饭等业务线的核心设计项目。每个案例都从业务背景、设计策略到落地结果完整记录，方便快速了解项目全貌和设计思路。" />
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="relative z-0 bg-[#0C0C0C] px-5 py-20 text-[#D7E2EA] sm:px-8 sm:py-24 md:px-10 md:py-32">
      <FadeIn y={40}>
        <h2 className="hero-heading text-keep mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">
          设计方法
          <span className="mt-4 block text-[0.14em] font-medium uppercase tracking-[0.28em] text-[#D7E2EA] [-webkit-text-fill-color:#D7E2EA]">
            Design Approach
          </span>
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {services.map((service, index) => (
          <FadeIn delay={index * 0.1} key={service.name}>
            <article className="grid gap-5 border-t border-[#D7E2EA]/15 py-8 last:border-b sm:grid-cols-[0.32fr_1fr] sm:gap-8 sm:py-10 md:py-12">
              <span className="text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#D7E2EA]/20">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col justify-center gap-3">
                <h3 className="text-keep text-[clamp(1.45rem,3vw,3rem)] font-medium leading-tight text-[#D7E2EA]">
                  {service.name}
                  <span className="mt-2 block text-[0.38em] font-medium uppercase tracking-[0.28em] text-[#D7E2EA]/45">
                    {service.englishName}
                  </span>
                </h3>
                <p className="max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed text-[#D7E2EA]/60">
                  {service.description}
                </p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  const stackMinHeight = `calc(var(--vh) * ${Math.max(homeProjects.length, 1) * 72})`;

  return (
    <section
      className="relative z-10 bg-[#0C0C0C] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32"
      id="projects"
    >
      <FadeIn y={40}>
        <h2 className="hero-heading text-keep mb-14 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20">
          核心项目
          <span className="mt-4 block text-[0.14em] font-medium uppercase tracking-[0.28em] text-[#D7E2EA] [-webkit-text-fill-color:#D7E2EA]">
            Selected Projects
          </span>
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-7xl">
        <ScrollStack
          baseScale={0.86}
          blurAmount={0}
          itemDistance={80}
          itemScale={0.025}
          itemStackDistance={26}
          minHeight={stackMinHeight}
          rotationAmount={0}
          scaleEndPosition="8%"
          stackPosition="18%"
          useWindowScroll
        >
          {homeProjects.map((project, index) => (
            <ScrollStackItem key={project.id}>
              <ProjectCard index={index} project={project} />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}

type ScrollStackProps = {
  baseScale?: number;
  blurAmount?: number;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  minHeight?: string;
  rotationAmount?: number;
  scaleEndPosition?: string;
  stackPosition?: string;
  useWindowScroll?: boolean;
};

type ScrollStackItemProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  index?: number;
  itemDistance?: number;
  setItemRef?: (node: HTMLDivElement | null, index: number) => void;
  stackPosition?: string;
  style?: CSSProperties;
};

function ScrollStack({
  baseScale = 0.86,
  blurAmount = 0,
  children,
  className,
  disabled = false,
  itemDistance = 80,
  itemScale = 0.025,
  itemStackDistance = 26,
  minHeight,
  rotationAmount = 0,
  scaleEndPosition = "8%",
  stackPosition = "18%",
  useWindowScroll = true,
}: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const items = Children.toArray(children);
  const itemCount = items.length;
  const isStackDisabled =
    disabled || shouldReduceMotion || isMobile || itemCount < 2;
  const releaseSpace = `max(calc(var(--vh) * 30), ${itemCount * itemStackDistance + 120}px)`;
  const shellStyle = {
    "--scroll-stack-min-height": minHeight || `calc(var(--vh) * ${Math.max(itemCount, 1) * 78})`,
    "--scroll-stack-release-space": releaseSpace,
  } as CSSProperties;

  const setItemRef = useCallback(
    (node: HTMLDivElement | null, index: number) => {
      itemRefs.current[index] = node;
    },
    [],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateIsMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);

    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const end = endRef.current;

    if (!container || !end) {
      return;
    }

    const stackItems = itemRefs.current
      .slice(0, itemCount)
      .filter((item): item is HTMLDivElement => item !== null);
    let frameId: number | null = null;

    const resetItems = () => {
      stackItems.forEach((item) => {
        item.style.filter = "";
        item.style.transform = "";
        item.style.zIndex = "";
      });
    };

    if (isStackDisabled) {
      resetItems();
      return;
    }

    const requestUpdate = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(updateStack);
    };

    const updateStack = () => {
      frameId = null;

      const viewportHeight = useWindowScroll
        ? window.innerHeight
        : container.clientHeight;
      const scrollTop = useWindowScroll ? window.scrollY : container.scrollTop;
      const stackPositionPx = parseScrollStackPosition(
        stackPosition,
        viewportHeight,
      );
      const scaleEndPositionPx = parseScrollStackPosition(
        scaleEndPosition,
        viewportHeight,
      );
      const pinEnd =
        getDocumentTop(end) -
        viewportHeight * 0.5 -
        itemStackDistance * Math.max(itemCount - 1, 0);

      stackItems.forEach((item, index) => {
        const itemTop = getDocumentTop(item);
        const pinStart = itemTop - stackPositionPx - itemStackDistance * index;
        const scaleStart = pinStart;
        const scaleEnd = itemTop - scaleEndPositionPx;
        const scaleProgress = getScrollProgress(
          scrollTop,
          scaleStart,
          scaleEnd,
        );
        const targetScale = Math.min(1, baseScale + index * itemScale);
        const scale = 1 - scaleProgress * (1 - targetScale);
        const rotation =
          rotationAmount === 0
            ? 0
            : rotationAmount * scaleProgress * (index % 2 === 0 ? 1 : -1);
        const blur =
          blurAmount === 0 ? 0 : Math.max(0, scaleProgress - 0.45) * blurAmount;
        let translateY = 0;

        if (scrollTop >= pinStart && scrollTop <= pinEnd) {
          translateY =
            scrollTop - itemTop + stackPositionPx + itemStackDistance * index;
        } else if (scrollTop > pinEnd) {
          translateY =
            pinEnd - itemTop + stackPositionPx + itemStackDistance * index;
        }

        item.style.zIndex = String(index + 1);
        item.style.filter = blur > 0 ? `blur(${blur.toFixed(2)}px)` : "";
        item.style.transform = `translate3d(0, ${translateY.toFixed(
          2,
        )}px, 0) scale(${scale.toFixed(4)}) rotate(${rotation.toFixed(2)}deg)`;
      });
    };

    requestUpdate();

    const scrollTarget: Window | HTMLDivElement = useWindowScroll
      ? window
      : container;
    scrollTarget.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      scrollTarget.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      resetItems();
    };
  }, [
    baseScale,
    blurAmount,
    isStackDisabled,
    itemCount,
    itemScale,
    itemStackDistance,
    rotationAmount,
    scaleEndPosition,
    stackPosition,
    useWindowScroll,
  ]);

  return (
    <div
      className={[
        "scroll-stack",
        isStackDisabled ? "scroll-stack--static" : "",
        className || "",
      ]
        .filter(Boolean)
        .join(" ")}
      ref={containerRef}
      style={shellStyle}
    >
      <div className="scroll-stack__items">
        {items.map((child, index) => {
          if (isValidElement<ScrollStackItemProps>(child)) {
            return cloneElement(child as ReactElement<ScrollStackItemProps>, {
              disabled: isStackDisabled,
              index,
              itemDistance,
              setItemRef,
              stackPosition,
            });
          }

          return (
            <ScrollStackItem
              disabled={isStackDisabled}
              index={index}
              itemDistance={itemDistance}
              key={index}
              setItemRef={setItemRef}
              stackPosition={stackPosition}
            >
              {child}
            </ScrollStackItem>
          );
        })}
        <div aria-hidden="true" className="scroll-stack__end" ref={endRef} />
      </div>
    </div>
  );
}

function ScrollStackItem({
  children,
  className,
  disabled = false,
  index = 0,
  itemDistance = 80,
  setItemRef,
  stackPosition = "18%",
  style,
}: ScrollStackItemProps) {
  const itemStyle = {
    "--scroll-stack-item-distance": `${itemDistance}px`,
    "--scroll-stack-top": stackPosition,
    ...style,
  } as CSSProperties;

  return (
    <div
      className={[
        "scroll-stack__item",
        disabled ? "scroll-stack__item--static" : "",
        className || "",
      ]
        .filter(Boolean)
        .join(" ")}
      ref={(node) => setItemRef?.(node, index)}
      style={itemStyle}
    >
      {children}
    </div>
  );
}

function parseScrollStackPosition(value: string, viewportHeight: number) {
  const numericValue = Number.parseFloat(value);

  if (Number.isNaN(numericValue)) {
    return 0;
  }

  if (value.trim().endsWith("%")) {
    return (numericValue / 100) * viewportHeight;
  }

  return numericValue;
}

function getScrollProgress(scrollTop: number, start: number, end: number) {
  if (end <= start) {
    return scrollTop >= end ? 1 : 0;
  }

  return Math.min(1, Math.max(0, (scrollTop - start) / (end - start)));
}

function getDocumentTop(element: HTMLElement) {
  let top = 0;
  let currentElement: HTMLElement | null = element;

  while (currentElement) {
    top += currentElement.offsetTop;
    currentElement = currentElement.offsetParent as HTMLElement | null;
  }

  return top;
}

function ProjectCard({
  project,
  index,
}: {
  project: HomeProject;
  index: number;
}) {
  const projectName = getProjectName(project);
  const projectImages = getProjectCoverImages(project);

  return (
    <motion.article className="rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8">
      <div className="grid gap-6 pb-6 md:pb-8 lg:grid-cols-[minmax(300px,0.34fr)_minmax(0,1fr)] lg:items-start xl:grid-cols-[minmax(360px,0.32fr)_minmax(0,1fr)_auto]">
        <div className="flex min-w-0 items-start gap-5 sm:gap-7">
          <span className="shrink-0 text-[clamp(4.5rem,9vw,11rem)] font-black leading-none text-[#D7E2EA]">
            {project.number || String(index + 1).padStart(2, "0")}
          </span>
          <span className="min-w-[140px] pt-[clamp(0.3rem,1.4vw,1.8rem)] text-sm font-medium uppercase tracking-[0.28em] text-[#D7E2EA]/70">
            {getProjectCategory(project)}
            <span className="mt-2 block text-[0.78em] opacity-55">
              {getProjectEnglishCategory(project)}
            </span>
          </span>
        </div>

        <h3
          className={`text-keep min-w-0 max-w-[11em] font-black leading-[0.98] tracking-tight text-[#D7E2EA] ${getProjectTitleClassName(project)}`}
        >
          {getProjectTitleLines(project).map((line) => (
            <span className="block" key={line}>
              {line}
            </span>
          ))}
          <span className="mt-3 block text-[0.2em] font-medium uppercase tracking-[0.24em] text-[#D7E2EA]/55">
            {getProjectEnglishTitle(project)}
          </span>
        </h3>
        <div className="justify-self-start lg:col-start-2 xl:col-start-auto xl:justify-self-end xl:pt-3">
          <LiveProjectButton href={appPath(getProjectLink(project))} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[0.4fr_0.6fr]">
        <div className="grid gap-4">
          <img
            alt={`${projectName} preview 1`}
            className="h-[clamp(130px,16vw,230px)] w-full rounded-[32px] object-cover sm:rounded-[42px] md:rounded-[50px]"
            loading="lazy"
            src={projectImages[0]}
          />
          <img
            alt={`${projectName} preview 2`}
            className="h-[clamp(160px,22vw,340px)] w-full rounded-[32px] object-cover sm:rounded-[42px] md:rounded-[50px]"
            loading="lazy"
            src={projectImages[1]}
          />
        </div>
        <img
          alt={`${projectName} preview 3`}
          className="h-[clamp(320px,42vw,590px)] w-full rounded-[32px] object-cover sm:rounded-[42px] md:rounded-[50px]"
          loading="lazy"
          src={projectImages[2]}
        />
      </div>
    </motion.article>
  );
}

function LiveProjectButton({ href }: { href: string }) {
  return (
    <a
      className="inline-flex min-w-[190px] items-center justify-center gap-3 whitespace-nowrap rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:min-w-[220px] sm:px-10 sm:py-3.5 sm:text-base"
      href={href}
    >
      查看案例
      <span className="hidden text-[0.78em] uppercase opacity-55 xl:inline">
        View Case
      </span>
      <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}

function ContactSection() {
  return (
    <section
      className="bg-[#0C0C0C] px-5 pb-16 pt-32 text-[#D7E2EA] sm:px-8 sm:pt-40 md:px-10 md:pt-48"
      id="contact"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between border-t border-[#D7E2EA]/10 pt-6 text-xs font-light tracking-wider text-[#D7E2EA]/35">
        <span>&copy; {new Date().getFullYear()} Neeko Wu</span>
        <span>Project Archive</span>
      </div>
    </section>
  );
}

function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.7,
  immediate = false,
  x = 0,
  y = 30,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  immediate?: boolean;
  x?: number;
  y?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={immediate ? { opacity: 1, x: 0, y: 0 } : undefined}
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, x, y }}
      transition={{
        delay: shouldReduceMotion ? 0 : delay,
        duration: shouldReduceMotion ? 0 : duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      viewport={immediate ? undefined : { once: true, margin: "50px", amount: 0 }}
      whileInView={immediate ? undefined : { opacity: 1, x: 0, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

function Magnet({
  children,
  padding,
  strength,
  activeTransition,
  inactiveTransition,
}: {
  children: ReactNode;
  padding: number;
  strength: number;
  activeTransition: string;
  inactiveTransition: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({
    transform: "translate3d(0, 0, 0)",
    transition: inactiveTransition,
    willChange: "transform",
  });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const element = ref.current;

    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const cursorX = event.clientX - rect.left;
    const cursorY = event.clientY - rect.top;
    const active =
      cursorX > -padding &&
      cursorX < rect.width + padding &&
      cursorY > -padding &&
      cursorY < rect.height + padding;

    if (!active) {
      setStyle({
        transform: "translate3d(0, 0, 0)",
        transition: inactiveTransition,
        willChange: "transform",
      });
      return;
    }

    const x = (cursorX - rect.width / 2) / strength;
    const y = (cursorY - rect.height / 2) / strength;

    setStyle({
      transform: `translate3d(${x}px, ${y}px, 0)`,
      transition: activeTransition,
      willChange: "transform",
    });
  }

  function handlePointerLeave() {
    setStyle({
      transform: "translate3d(0, 0, 0)",
      transition: inactiveTransition,
      willChange: "transform",
    });
  }

  return (
    <div
      ref={ref}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      style={style}
    >
      {children}
    </div>
  );
}

function AnimatedText({ text }: { text: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.p
      className="relative max-w-[660px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]"
      initial={shouldReduceMotion ? false : { opacity: 0.35, y: 24 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: "50px", amount: 0.2 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {text}
    </motion.p>
  );
}

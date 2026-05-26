import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Star,
} from "lucide-react";
import {
  CaseSection,
  FadeInSection,
  PageContainer,
  PhoneMockup,
  PillNav,
  type PillNavItem,
} from "./shared";
import { appPath, assetPath } from "../utils/assetPath";

const A = assetPath("assets/daily-low-price/");
const assets = {
  beforeHome: `${A}before-home.webp`,
  afterHome: `${A}after-home.webp`,
  beforeHook: `${A}before-hook.webp`,
  afterHook: `${A}after-hook.svg`,
  beforeCoupon: `${A}before-coupon.webp`,
  afterCoupon: `${A}after-coupon.webp`,
  beforeFeed: `${A}before-feed.webp`,
  afterFeed: `${A}after-feed.webp`,
  cardBefore: `${A}card-before.svg`,
  cardAfter: `${A}card-after.svg`,
  bannerBefore: `${A}banner-before.svg`,
  bannerAfter: `${A}banner-after.svg`,
  heroBefore: `${A}hero-before.webp`,
  heroAfter: `${A}hero-after.webp`,
  visualId1: `${A}visual-revisit.mp4`,
  visualId2: `${A}visual-promo.webp`,
  visualId3: `${A}visual-daily.mp4`,
  pageCleanBefore: `${A}page-cleanup-before.svg`,
  pageCleanAfter: `${A}page-cleanup-after.svg`,
  lotteryBefore1: `${A}lottery-before-1.svg`,
  lotteryBefore2: `${A}lottery-before-2.svg`,
  lotteryBefore3: `${A}lottery-before-3.svg`,
  lotteryAfter1: `${A}lottery-after-1.svg`,
  lotteryAfter2: `${A}lottery-after-2.svg`,
  lotteryAfter3: `${A}lottery-after-3.svg`,
  showcase1: `${A}showcase-1.svg`,
  showcase2: `${A}showcase-2.svg`,
  showcase3: `${A}showcase-3.svg`,
  showcase4: `${A}showcase-4.svg`,
  beforeDouble11Home: `${A}before-double11-home.webp`,
  overviewBanner: `${A}overview-banner.webp`,
  decoBadgeRed: `${A}deco-badge-red.webp`,
  decoBadgeYellow: `${A}deco-badge-yellow.webp`,
  decoTextVisual: `${A}deco-text-visual.webp`,
  decoPercent: `${A}deco-percent.webp`,
  decoArrow: `${A}deco-arrow.webp`,
};

const projectMeta = [
  ["周期", "2025.12 至今"],
  ["职责", "频道视觉 / 体验设计"],
  ["范围", "频道首页改版、商品卡优化、视觉降噪、抽奖体验重塑"],
] as const;

const heroHighlights = [
  {
    label: "用户任务",
    value: "快速判断",
    detail: "价格真实感、配送可达性、下单必要性需要在浏览中完成判断。",
  },
  {
    label: "设计抓手",
    value: "结构重排",
    detail: "把首屏资源交给商品流，让浏览路径更贴近购买决策。",
  },
  {
    label: "业务结果",
    value: "+0.4pp CTR",
    detail: "商品卡点击稳定提升，最优实验组 CXR +0.13pp。",
  },
] as const;

const coreIssues = [
  {
    label: "结构失衡",
    title: "首屏黄金区没有服务主转化",
    body: "钩子品与运营位占据近半首屏，但订单贡献偏低，真正高转化的商品 feed 露出不足。",
  },
  {
    label: "判断成本高",
    title: "用户看得到低价，却不一定能快速判断值不值",
    body: "免凑单、已补贴、1件可送、大包规单价等关键利益点不够显性，用户需要二次理解。",
  },
  {
    label: "视觉噪点多",
    title: "页面看起来更像活动合集",
    body: "头部、商品卡、券区与抽奖入口的视觉风格不统一，页面更像活动合集，稳定低价频道感弱。",
  },
  {
    label: "流程断层",
    title: "抽奖强化了噱头，却打断购物",
    body: "抽奖从当前页跳出，结果反馈与红包使用路径分离，用户获得感和权益归属感都偏弱。",
  },
] as const;

const strategyCards = [
  {
    number: "01",
    title: "重构首屏框架",
    body: "把点击和下单表现弱的模块下移，让商品列表更早出现。",
    decision: "钩子品仍有订单贡献，压缩保留；运营位效率过低，降权下移。",
  },
  {
    number: "02",
    title: "商品信息前置",
    body: "把补贴、配送、件数、折算单价前置到商品卡，让用户不进详情也能完成初筛。",
    decision: "让用户在浏览阶段就能判断值不值得买，这是低价频道的核心。",
  },
  {
    number: "03",
    title: "统一低价频道样式",
    body: "建立更稳定的头图、标签与卡片语言，让\u201c便宜且快\u201d成为页面第一感受。",
    decision: "减少与价格判断无关的干扰，让页面更像一个长期频道。",
  },
  {
    number: "04",
    title: "抽奖体验优化",
    body: "把抽奖从跳转任务改为当前页轻交互，中奖后直接引导到可使用的红包与商品。",
    decision: "抽奖要提升参与，也要守住商品流；结果反馈必须回到下单场景。",
  },
] as const;

const moduleDiagnostics = [
  {
    module: "钩子品货架",
    signal: "占用高 / 订单中低",
    decision: "压缩保留",
    reason: "仍贡献约 7% 订单，因此保留入口并改为横滑货架，释放纵向空间。",
    tone: "#FF2469",
  },
  {
    module: "运营瓷片区",
    signal: "点击低 / 转化低",
    decision: "下移降权",
    reason: "CTR 与 CXR 都偏低，继续美化收益有限，应把首屏还给高价值链路。",
    tone: "#FF2469",
  },
  {
    module: "红包权益",
    signal: "有吸引力 / 易打断",
    decision: "轻量承接",
    reason: "保留权益感知，但弱化弹窗和跳转，把结果导回商品流。",
    tone: "#FF2469",
  },
  {
    module: "商品 Feed",
    signal: "点击高 / 订单高",
    decision: "前置放大",
    reason: "贡献 >90% 订单，是页面主转化区，应获得更多首屏曝光。",
    tone: "#34d399",
  },
] as const;

const choiceNotes = {
  screen: {
    label: "设计取舍",
    title: "重新分配首屏资源",
    body: "钩子品仍有一定订单贡献，所以保留入口但压缩空间；运营位效率低，因此下移；Feed 是主转化区，因此提前露出。",
    tone: "#FF2469",
  },
  decision: {
    label: "设计取舍",
    title: "商品卡信息层级优化",
    body: "原来价格、配送、凑单信息分散，用户需要来回看。改版把这些内容整理到商品卡主要区域，列表里就能完成基本判断。",
    tone: "#FF2469",
  },
  visual: {
    label: "设计取舍",
    title: "统一频道视觉",
    body: "保留红黄的促销识别，但收敛装饰、统一卡片层级，让页面从活动集合变成长期可复用的频道语言。",
    tone: "#FF2469",
  },
  lottery: {
    label: "设计取舍",
    title: "把权益接回商品流",
    body: "抽奖能提高参与，但如果跳出频道会损失浏览连续性。改版后在当前页完成反馈，并把结果导向红包使用。",
    tone: "#FF2469",
  },
} as const;

const screenResults = [
  ["首屏释放", ">50%"],
  ["卡片高度", "260px → 232px"],
  ["每屏商品", "+3 个"],
] as const;

const visualGroups = [
  {
    title: "复访头图",
    body: "承接闪购与外部路径，强化频道记忆点。",
    src: assets.visualId1,
    type: "video" as const,
  },
  {
    title: "大促头图",
    body: "保留活动氛围，同时延续日常频道样式。",
    src: assets.visualId2,
    type: "image" as const,
  },
  {
    title: "日常头图",
    body: "用固定主张建立「每日可逛」的频道感。",
    src: assets.visualId3,
    type: "video" as const,
  },
];

const visualPrinciples = [
  ["主张稳定", "头图都围绕便宜和配送速度展开，减少不同入口带来的理解成本。"],
  ["装饰收敛", "保留红黄促销识别，把贴纸、爆炸形、强光效等元素降到辅助层。"],
  ["状态复用", "日常、复访、大促共用同一套频道框架，降低后续延展成本。"],
] as const;

const lotteryFlow = [
  {
    title: "改版前",
    body: "跳转抽奖页，流程断开，中奖后需要用户自己理解权益去向。",
    images: [assets.lotteryBefore1, assets.lotteryBefore2, assets.lotteryBefore3],
  },
  {
    title: "改版后",
    body: "当前页弹层完成抽奖，结果即时反馈，并把用户带回红包可使用的商品场景。",
    images: [assets.lotteryAfter1, assets.lotteryAfter2, assets.lotteryAfter3],
  },
] as const;

const resultMetrics = [
  { label: "商品卡 CTR", value: "+0.4pp", detail: "三组实验均稳定提升" },
  { label: "最优 CXR", value: "+0.13pp", detail: "整体模块样式表现最好" },
  { label: "抽奖参与", value: "+35%", detail: "轻量化交互带来更高参与" },
] as const;

const experimentRows = [
  ["实验组 1", "整体模块样式 + 其他改动", "+0.47pp", "+0.13pp", true],
  ["实验组 2", "分卡片样式 + 其他改动", "+0.44pp", "+0.05pp", false],
  ["实验组 3", "无钩子品区 + 其他改动", "+0.46pp", "+0.02pp", false],
] as const;

const takeaways = [
  {
    title: "结构优先于视觉润色",
    body: "首屏最大的问题不是不好看，而是空间没给对地方。",
  },
  {
    title: "低价频道的核心是低判断成本",
    body: "用户愿意买低价商品，但前提是能快速确认划算、能送、不用凑单。",
  },
  {
    title: "激励玩法要接回购买链路",
    body: "抽奖如果跳出频道就断了浏览，权益必须回到商品流里用掉。",
  },
] as const;

const pillNavItems: PillNavItem[] = [
  { label: "背景", href: "#context" },
  { label: "问题", href: "#problem" },
  { label: "策略", href: "#strategy" },
  { label: "首屏重构", href: "#screen" },
  { label: "决策信息", href: "#decision" },
  { label: "视觉统一", href: "#visual" },
  { label: "抽奖体验", href: "#lottery" },
  { label: "验证", href: "#results" },
  { label: "复盘", href: "#reflection" },
];

export default function DailyLowPriceCaseDetail() {
  useEffect(() => {
    document.title = "每日神价频道改版 — Neeko Wu";
  }, []);

  return (
    <main className="min-h-screen overflow-x-clip bg-[linear-gradient(180deg,#07080a_0%,#0b0c0d_46%,#07080a_100%)] text-[#F4F7F8]">
      <CaseNav />
      <HeroSection />
      <ProjectInfoBar />
      <ContextSection />
      <ProblemSection />
      <StrategySection />
      <ScreenRebuildSection />
      <DecisionSection />
      <VisualSection />
      <LotterySection />
      <ResultsSection />
      <ReflectionSection />
      <BackToProjects />
      <PillNav items={pillNavItems} projectSlug="daily-low-price" />
    </main>
  );
}

function CaseNav() {
  return (
    <nav className="py-7">
      <PageContainer className="flex items-center justify-between">
        <a
          className="inline-flex items-center gap-2.5 text-[13px] font-medium tracking-[0.15em] text-[#F4F7F8]/50 transition-colors duration-200 hover:text-[#F4F7F8]"
          href={appPath("/#projects")}
        >
          <ArrowLeft className="h-4 w-4" />
          返回项目
        </a>
        <a
          className="hidden text-[13px] font-medium uppercase tracking-[0.28em] text-[#F4F7F8]/35 transition-colors duration-200 hover:text-[#F4F7F8]/70 sm:inline"
          href={appPath("/")}
        >
          Neeko Wu
        </a>
      </PageContainer>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative pb-[clamp(72px,11vw,150px)] pt-10">
      <PageContainer wide>
        <div className="grid min-h-[calc(var(--vh)*100-150px)] gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.72fr)] lg:items-center">
          <div>
            <FadeInSection>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FF2469]">
                THREE / 每日神价改版
              </p>
            </FadeInSection>
            <FadeInSection delay={90}>
              <h1 className="mt-8 max-w-[780px] text-[clamp(3.2rem,7.2vw,6.3rem)] font-black leading-[0.94] tracking-normal text-[#F4F7F8]">
                每日神价
                <br />
                频道改版
              </h1>
            </FadeInSection>
            <FadeInSection delay={160}>
              <p className="mt-6 text-[15px] font-medium uppercase tracking-[0.22em] text-[#F4F7F8]/30">
                Channel Experience & Visual Redesign
              </p>
            </FadeInSection>
            <FadeInSection delay={230}>
              <p className="mt-10 max-w-[690px] text-[clamp(1rem,1.38vw,1.22rem)] font-light leading-[1.75] text-[#A8B1B8]">
                每日神价是闪购里的低价频道，用户进入后通常只想快速判断三件事：价格是否真的划算、配送是否可达、现在下单是否省心。改版围绕这条选购路径重排首屏资源，把价格、补贴、配送等信息放到商品卡的第一阅读路径里。
              </p>
            </FadeInSection>
            <FadeInSection delay={300}>
              <HeroHighlightStrip />
            </FadeInSection>
          </div>
          <FadeInSection delay={180}>
            <HeroPreview />
          </FadeInSection>
        </div>
      </PageContainer>
    </section>
  );
}

function HeroPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);

  const handleMove = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    handleMove(e.clientX);
  }, [handleMove]);
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  return (
    <div className="relative mx-auto max-w-[340px]">
      {/* Phone mockup frame */}
      <div className="relative overflow-hidden rounded-[44px] border-[6px] border-[#2a2a2e] bg-black shadow-[0_40px_120px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06)]">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-30 h-[28px] w-[120px] -translate-x-1/2 rounded-b-[14px] bg-[#2a2a2e]" />

        {/* Slider comparison area */}
        <div
          ref={containerRef}
          className="relative aspect-[390/844] w-full cursor-col-resize select-none overflow-hidden"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* After image (full, below) */}
          <img
            alt="改版后每日神价页面"
            className="absolute inset-0 h-full w-full object-cover object-top"
            draggable={false}
            src={assets.heroAfter}
          />
          {/* Before image (clipped by slider) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              alt="改版前每日神价页面"
              className="h-full object-cover object-top"
              draggable={false}
              src={assets.heroBefore}
              style={{ width: containerRef.current?.offsetWidth ?? "100%" }}
            />
          </div>
          {/* Slider line */}
          <div
            className="absolute top-0 z-20 h-full w-[2px] bg-white/80"
            style={{ left: `${sliderPos}%`, transform: "translateX(-1px)" }}
          >
            {/* Handle */}
            <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-black/60 backdrop-blur-sm">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M8 5l-5 7 5 7M16 5l5 7-5 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          {/* Labels */}
          <span className="absolute left-3 top-[36px] z-10 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">Before</span>
          <span className="absolute right-3 top-[36px] z-10 rounded-full bg-[#FF2469]/90 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">After</span>
        </div>
      </div>
      {/* Caption */}
      <p className="mt-5 text-center text-[12px] text-[#A8B1B8]/60">← 左右滑动对比改版前后 →</p>
    </div>
  );
}

function HeroHighlightStrip() {
  return (
    <div className="mt-10 grid border-y border-white/[0.08] md:grid-cols-3 md:divide-x md:divide-white/[0.08]">
      {heroHighlights.map((item) => (
        <div className="py-5 md:px-5 md:first:pl-0 md:last:pr-0" key={item.label}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F4F7F8]/36">
            {item.label}
          </p>
          <p className="mt-3 text-[22px] font-black leading-none text-[#F4F7F8]">
            {item.value}
          </p>
          <p className="mt-3 text-[13px] leading-[1.68] text-[#A8B1B8]">
            {item.detail}
          </p>
        </div>
      ))}
    </div>
  );
}

function ProjectInfoBar() {
  return (
    <section className="pb-[clamp(36px,6vw,76px)]">
      <PageContainer>
        <FadeInSection>
          <div className="grid border-y border-white/[0.10] sm:grid-cols-3 sm:divide-x sm:divide-white/[0.10]">
            {projectMeta.map(([key, value]) => (
              <div className="py-6 sm:px-7 sm:first:pl-0" key={key}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F4F7F8]/30">
                  {key}
                </p>
                <p className="mt-2 text-[15px] font-medium leading-relaxed text-[#F4F7F8]/76">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </FadeInSection>
      </PageContainer>
    </section>
  );
}

function ContextSection() {
  return (
    <>
      {/* Overview banner - above the section title */}
      <section className="pb-[clamp(40px,6vw,80px)]">
        <PageContainer>
          <FadeInSection>
            <img
              alt="每日神价频道全景概览"
              className="mx-auto w-full max-w-[1400px] rounded-[24px] object-contain"
              src={assets.overviewBanner}
            />
          </FadeInSection>
        </PageContainer>
      </section>
      <CaseSection
        accentColor="text-[#FF2469]"
        eyebrow="01 背景"
        id="context"
        intro="每日神价承接闪购里的低价商品和复访流量。用户进入频道后想快速找到便宜、可送、值得买的商品，页面却把注意力分给了过多运营入口。"
        title="频道现状与改版动因"
      >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.55fr)_minmax(320px,0.9fr)] lg:items-start">
        <FadeInSection>
          <figure>
            <div className="relative mx-auto max-w-[280px]">
              {/* Phone mockup */}
              <div className="relative overflow-hidden rounded-[36px] border-[5px] border-[#2a2a2e] bg-black shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
                <div className="absolute left-1/2 top-0 z-10 h-[22px] w-[90px] -translate-x-1/2 rounded-b-[11px] bg-[#2a2a2e]" />
                <img
                  alt="改版前每日神价页面结构"
                  className="block w-full object-cover object-top"
                  loading="lazy"
                  src={`${A}context-phone.webp`}
                />
              </div>
              {/* Scattered decorations around the phone */}
              <img alt="" className="absolute -right-14 top-[15%] z-20 w-[58px] rotate-[12deg] drop-shadow-lg" src={assets.decoBadgeRed} />
              <img alt="" className="absolute -right-10 top-[45%] z-20 w-[64px] rotate-[-6deg] drop-shadow-lg" src={assets.decoBadgeYellow} />
              <img alt="" className="absolute -right-16 bottom-[25%] z-20 w-[90px] rotate-[-10deg] drop-shadow-lg" src={assets.decoTextVisual} />
              <img alt="" className="absolute -left-10 bottom-[20%] z-20 w-[48px] rotate-[8deg] drop-shadow-lg" src={assets.decoPercent} />
              <img alt="" className="absolute -left-8 top-[35%] z-20 w-[44px] rotate-[-12deg] drop-shadow-lg" src={assets.decoArrow} />
            </div>
            <figcaption className="mx-auto max-w-[280px] pt-5">
              <p className="text-[13px] font-black text-[#F4F7F8]/82">改版前页面</p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#A8B1B8]/64">
                改版前页面将大量运营信息压在首屏，真正承担成交的商品流被推后。
              </p>
            </figcaption>
          </figure>
        </FadeInSection>
        <FadeInSection delay={120}>
          <div className="space-y-4">
            {coreIssues.map((issue) => (
              <article
                className="grid gap-3 rounded-2xl bg-[#141516] p-5 sm:grid-cols-[110px_1fr]"
                key={issue.label}
              >
                <p className="text-[12px] font-bold text-[#F4F7F8]/38">
                  {issue.label}
                </p>
                <div>
                  <h3 className="text-[20px] font-black leading-snug bg-gradient-to-r from-[#FFBBCA] via-white via-[30%] to-white bg-clip-text text-transparent">
                    {issue.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.72] text-[#A8B1B8]">
                    {issue.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </FadeInSection>
      </div>
    </CaseSection>
    </>
  );
}

function ProblemSection() {
  return (
    <CaseSection
      accentColor="text-[#FF2469]"
      eyebrow="02 诊断"
      id="problem"
      intro="钩子商品和运营入口占了接近一半首屏，但订单贡献偏低；真正产生订单的商品 Feed 露出不够。"
      title="问题诊断"
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <FadeInSection>
          <div>
            <h3 className="text-[clamp(1.6rem,3.2vw,2.2rem)] font-black leading-tight text-[#F4F7F8]">
              50% 首屏空间，换来约 7% 订单
            </h3>
            <p className="mt-5 max-w-[520px] text-[15px] leading-[1.78] text-[#A8B1B8]">
              用户进入频道后主要在找便宜、可送、值得买的商品。首屏继续堆运营入口，会挤压商品浏览和下单判断。
            </p>
            <div className="mt-8 space-y-5">
              <ProgressLine label="钩子商品区订单贡献" value="7%" width="18%" />
              <ProgressLine label="运营瓷片区订单贡献" value="<1%" width="6%" />
              <ProgressLine label="商品 feed 订单贡献" value=">90%" width="92%" strong />
            </div>
          </div>
        </FadeInSection>
        <FadeInSection delay={120}>
          <div className="grid gap-5 sm:grid-cols-2">
            <PhoneMockup
              caption="顶部货架占位过大，阻断浏览"
              size="lg"
              src={assets.beforeHook}
              title="钩子商品区"
            />
            <PhoneMockup
              caption="运营位转化效率低，占据首屏"
              size="lg"
              src={assets.heroBefore}
              title="运营与权益区"
            />
          </div>
        </FadeInSection>
      </div>

      <FadeInSection>
        <div className="mt-16">
          <div className="mb-8 grid gap-3 md:grid-cols-[240px_1fr] md:items-end">
            <h3 className="shrink-0 text-[clamp(1.2rem,2.4vw,1.8rem)] font-black text-[#F4F7F8]">
              模块处理策略
            </h3>
            <p className="text-[13px] leading-relaxed text-[#A8B1B8]/60">
              对照占位、点击和订单表现，把页面模块分成保留、压缩、下移三类。
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {moduleDiagnostics.map((item) => (
              <div
                className="rounded-2xl bg-[#141516] p-6"
                key={item.module}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-[16px] font-black text-[#F4F7F8]">
                    {item.module}
                  </h4>
                  <span
                    className="rounded-full px-2.5 py-1 text-[11px] font-bold"
                    style={{ background: `${item.tone}20`, color: item.tone }}
                  >
                    {item.decision}
                  </span>
                </div>
                <p className="mb-3 text-[12px] font-medium text-[#F4F7F8]/35">
                  {item.signal}
                </p>
                <p className="text-[13px] leading-[1.72] text-[#A8B1B8]">
                  {item.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>
    </CaseSection>
  );
}

function ProgressLine({
  label,
  strong = false,
  value,
  width,
}: {
  label: string;
  strong?: boolean;
  value: string;
  width: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-[13px] font-medium text-[#A8B1B8]">{label}</span>
        <span
          className={`font-mono text-[13px] font-black ${
            strong ? "text-[#FF2469]" : "text-[#F4F7F8]/54"
          }`}
        >
          {value}
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={`h-full rounded-full ${
            strong ? "bg-[#FF2469]" : "bg-[#F4F7F8]/28"
          }`}
          style={{ width }}
        />
      </div>
    </div>
  );
}

function StrategySection() {
  return (
    <CaseSection
      accentColor="text-[#FF2469]"
      eyebrow="03 策略"
      id="strategy"
      intro="围绕首屏资源、商品卡信息、视觉样式和抽奖体验四个方向推进改版。"
      title="改版策略"
    >
      <div className="space-y-4">
        {strategyCards.map((item, index) => (
          <FadeInSection delay={index * 70} key={item.title}>
            <article className="rounded-2xl bg-[#141516] p-6">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[20px] font-black leading-none text-[#FF2469]">
                  {item.number}
                </span>
                <h3 className="text-[clamp(1.25rem,2vw,1.6rem)] font-black leading-snug text-[#F4F7F8]">
                  {item.title}
                </h3>
              </div>
              <p className="mt-3 pl-[52px] text-[14px] leading-[1.75] text-[#A8B1B8]">
                {item.body}
              </p>
              <div className="mt-4 border-t border-white/[0.06] pt-4 pl-[52px]">
                <span className="mr-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F4F7F8]/34">
                  取舍
                </span>
                <span className="text-[13px] leading-[1.72] text-[#A8B1B8]">
                  {item.decision}
                </span>
              </div>
            </article>
          </FadeInSection>
        ))}
      </div>
    </CaseSection>
  );
}

function ScreenRebuildSection() {
  return (
    <CaseSection
      accentColor="text-[#FF2469]"
      eyebrow="04 首屏重构"
      id="screen"
      intro="把钩子商品从纵向大模块改为横向货架，同时下移低效运营模块，把屏幕空间让给商品流和关键权益。"
      title="首屏空间重分配"
    >
      <ChoiceCallout {...choiceNotes.screen} />

      <FadeInSection>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F4F7F8]/34">
                Before
              </p>
              <img alt="改版前" className="w-full rounded-2xl" loading="lazy" src={assets.beforeHome} />
              <p className="mt-3 text-[12px] text-[#A8B1B8]/60">改版前：运营与钩子品占据过多空间</p>
            </div>
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FF2469]">
                After
              </p>
              <img alt="改版后" className="w-full rounded-2xl" loading="lazy" src={assets.afterHome} />
              <p className="mt-3 text-[12px] text-[#A8B1B8]/60">改版后：横向货架、权益前置、商品流提前</p>
            </div>
          </div>
          <div className="grid gap-4">
            {screenResults.map(([label, value]) => (
              <SurfacePanel className="flex items-center justify-between gap-6" key={label}>
                <span className="text-[15px] font-medium text-[#A8B1B8]">
                  {label}
                </span>
                <span className="font-mono text-[24px] font-black text-[#FF2469]">
                  {value}
                </span>
              </SurfacePanel>
            ))}
          </div>
        </div>
      </FadeInSection>

      <div className="space-y-10">
        <FadeInSection>
          <div className="rounded-2xl bg-[#141516] p-6">
            <h3 className="text-[18px] font-black text-[#F4F7F8]">低效模块下移，释放首屏空间</h3>
            <p className="mt-2 mb-6 text-[13px] leading-relaxed text-[#A8B1B8]">
              将低效的运营模块下移到商品 feed 中，让首屏更多位置展示商品。
            </p>
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr_0.6fr] lg:items-start">
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F4F7F8]/34">Before</p>
                <img alt="低效模块下移前" className="w-full rounded-2xl" loading="lazy" src={assets.beforeCoupon} />
              </div>
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FF2469]">After</p>
                <img alt="低效模块下移后" className="w-full rounded-2xl" loading="lazy" src={assets.afterCoupon} />
              </div>
              <div className="space-y-4 lg:pl-4 lg:pt-6">
                <DesignAction label="结构调优化" desc="打造沉浸式瀑布流" />
                <DesignAction label="钩子模块压缩" desc="释放纵向空间" />
                <DesignAction label="运营专区" desc="收敛至商品 feed 中" />
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={80}>
          <div className="rounded-2xl bg-[#141516] p-6">
            <h3 className="text-[18px] font-black text-[#F4F7F8]">优化商品卡高度，提升展示密度</h3>
            <p className="mt-2 mb-6 text-[13px] leading-relaxed text-[#A8B1B8]">
              单张商品卡高度从 260px 压缩至 232px，首屏有效曝光商品数 +3，提高流量分发效率。
            </p>
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr_0.6fr] lg:items-start">
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F4F7F8]/34">Before</p>
                <img alt="商品卡 260px" className="w-full rounded-2xl" loading="lazy" src={assets.beforeFeed} />
              </div>
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FF2469]">After</p>
                <img alt="商品卡 232px" className="w-full rounded-2xl" loading="lazy" src={assets.afterFeed} />
              </div>
              <div className="space-y-4 lg:pl-4 lg:pt-6">
                <DesignAction label="卡片高度 -28px" desc="每张卡片减少冗余间距" />
                <DesignAction label="每屏商品 +1.5 个" desc="提高曝光密度" />
                <DesignAction label="转化效率提升" desc="流量分发更充分" />
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </CaseSection>
  );
}

function DecisionSection() {
  return (
    <CaseSection
      accentColor="text-[#FF2469]"
      eyebrow="05 决策效率"
      id="decision"
      intro="商品卡需要把价格、补贴、配送和凑单门槛讲清楚。这里主要处理信息摆放和阅读顺序。"
      title="商品卡信息层级优化"
    >
      <FadeInSection>
        <div>
          <div className="mb-6 max-w-[760px]">
            <h3 className="text-[clamp(1.2rem,2vw,1.5rem)] font-black text-[#F4F7F8]">
              关键利益点前置
            </h3>
            <p className="mt-3 text-[14px] leading-[1.75] text-[#A8B1B8]">
              原卡片里价格、券、配送和按钮分散，改版后把信息层级收拢到商品卡主区域。
            </p>
          </div>
          <img
            alt="商品卡利益点强化对比"
            className="w-full rounded-2xl"
            loading="lazy"
            src={`${A}card-comparison.webp`}
          />
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="mx-auto grid max-w-[860px] gap-6 md:grid-cols-2">
          <VisualFrame
            alt="商品 feed 改版前"
            caption="改版前：商品卡信息分散，价格和利益点关系不清晰。"
            src={assets.beforeFeed}
            title="Feed 改版前"
          />
          <VisualFrame
            alt="商品 feed 改版后"
            caption="改版后：价格、补贴、配送与行动按钮形成稳定阅读顺序。"
            src={assets.afterFeed}
            title="Feed 改版后"
          />
        </div>
      </FadeInSection>
    </CaseSection>
  );
}

function VisualSection() {
  return (
    <CaseSection
      accentColor="text-[#FF2469]"
      eyebrow="06 视觉统一"
      id="visual"
      intro="视觉优化主要处理两个问题：减少杂乱装饰，让日常、复访和大促状态看起来属于同一个频道。"
      title="统一头图和频道样式"
    >
      <ChoiceCallout {...choiceNotes.visual} />

      <FadeInSection>
        <div className="grid gap-5 sm:grid-cols-3">
          {visualGroups.map((group) => (
            <div key={group.title}>
              <div className="overflow-hidden rounded-2xl">
                {group.type === "video" ? (
                  <video
                    autoPlay
                    className="w-full"
                    loop
                    muted
                    playsInline preload="metadata"
                    src={group.src}
                  />
                ) : (
                  <img alt={group.title} className="w-full" loading="lazy" src={group.src} />
                )}
              </div>
              <p className="mt-4 text-[13px] font-black text-[#F4F7F8]">{group.title}</p>
              <p className="mt-2 text-[12px] leading-relaxed text-[#A8B1B8]">{group.body}</p>
            </div>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="border-y border-white/[0.10] py-7">
          <h3 className="max-w-[780px] text-[clamp(1.45rem,3vw,2.4rem)] font-black leading-tight text-[#F4F7F8]">
            活动视觉收敛为可复用的频道语言
          </h3>
          <p className="mt-4 max-w-[840px] text-[15px] leading-[1.76] text-[#A8B1B8]">
            新视觉保留红黄低价氛围，减少无意义装饰，把主张、商品与价格关系放在更稳定的位置。各入口进入时，<span className="whitespace-nowrap">页面样式保持一致。</span>
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {visualPrinciples.map(([title, body]) => (
              <div className="border-t border-white/[0.07] pt-4" key={title}>
                <p className="text-[13px] font-black text-[#F4F7F8]">
                  {title}
                </p>
                <p className="mt-2 text-[13px] leading-[1.7] text-[#A8B1B8]">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <img
          alt="头图设计拆解"
          className="w-full rounded-2xl"
          loading="lazy"
          src={`${A}visual-header-detail.webp`}
        />
      </FadeInSection>


      <FadeInSection>
        <div className="mx-auto grid max-w-[640px] gap-6 sm:grid-cols-2">
          <div className="flex flex-col items-center gap-3">
            <div className="overflow-hidden rounded-2xl">
              <img alt="改版前页面" className="w-full" loading="lazy" src={`${A}page-cleanup-before.webp`} />
            </div>
            <p className="text-[12px] text-[#A8B1B8]">改版前：装饰与高饱和色块过多，浏览成本高。</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="overflow-hidden rounded-2xl">
              <video autoPlay className="w-full" loop muted playsInline preload="metadata" src={`${A}visual-daily.mp4`} />
            </div>
            <p className="text-[12px] text-[#A8B1B8]">改版后：视觉层级更聚焦，弱化无效装饰。</p>
          </div>
        </div>
      </FadeInSection>
    </CaseSection>
  );
}

function LotterySection() {
  return (
    <CaseSection
      accentColor="text-[#FF2469]"
      eyebrow="07 抽奖体验"
      id="lottery"
      intro="原抽奖需要跳转到独立页面，中奖反馈和红包使用分开。改版后把抽奖、结果反馈和红包使用放回同一条购买流程。"
      title="抽奖与红包使用体验优化"
    >
      <FadeInSection>
        <img
          alt="抽奖体验改版前后对比"
          className="w-full rounded-2xl"
          loading="lazy"
          src={`${A}lottery-comparison.webp`}
        />
      </FadeInSection>
    </CaseSection>
  );
}

function ResultsSection() {
  return (
    <CaseSection
      accentColor="text-[#FF2469]"
      eyebrow="08 验证"
      id="results"
      intro="上线后商品卡点击和下单转化都有提升，说明首屏调整和商品卡信息优化方向有效。"
      title="数据验证"
    >
      <FadeInSection>
        <div className="grid gap-px overflow-hidden rounded-2xl bg-[#FF2469]/10 md:grid-cols-[0.85fr_1fr]">
          <div className="bg-[#0b1210] p-6 md:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#FF2469]">
              目标验证
            </p>
            <p className="mt-4 font-mono text-[clamp(2rem,5vw,4rem)] font-black leading-none text-[#FF2469]">
              +0.4pp
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-[#A8B1B8]">
              商品卡 CTR 超过原目标 +0.3pp，说明「空间重排 + 信息前置」的方向有效。
            </p>
          </div>
          <div className="grid bg-[#0d0e10] sm:grid-cols-3">
            {[
              ["目标", "+0.3pp"],
              ["实际", "+0.4pp"],
              ["超出", "约 33%"],
            ].map(([label, value]) => (
              <div className="border-b border-white/[0.07] p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0" key={label}>
                <p className="text-[12px] font-medium text-[#F4F7F8]/42">{label}</p>
                <p className="mt-3 font-mono text-[24px] font-black text-[#F4F7F8]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      <div className="grid gap-4 sm:grid-cols-3">
        {resultMetrics.map((metric) => (
          <SurfacePanel className="h-full" key={metric.label}>
            <p className="text-[12px] font-medium text-[#F4F7F8]/46">
              {metric.label}
            </p>
            <p className="mt-3 font-mono text-[34px] font-black text-[#FF2469]">
              {metric.value}
            </p>
            <p className="mt-3 text-[14px] leading-[1.7] text-[#A8B1B8]">
              {metric.detail}
            </p>
          </SurfacePanel>
        ))}
      </div>

      <FadeInSection>
        <div className="overflow-hidden border-y border-white/[0.10]">
          {experimentRows.map(([group, strategy, ctr, cxr, best]) => (
            <div
              className={`grid gap-4 border-b border-white/[0.07] px-6 py-5 last:border-b-0 md:grid-cols-[120px_1fr_120px_120px] md:items-center ${
                best ? "bg-[#FF2469]/[0.06]" : ""
              }`}
              key={group}
            >
              <div className="flex items-center gap-2">
                {best && <Star className="h-4 w-4 fill-[#FF2469] text-[#FF2469]" />}
                <p className="text-[14px] font-black text-[#F4F7F8]">{group}</p>
              </div>
              <p className="text-[14px] leading-relaxed text-[#A8B1B8]">
                {strategy}
              </p>
              <p className="font-mono text-[16px] font-black text-[#FF2469]">
                CTR {ctr}
              </p>
              <p className="font-mono text-[16px] font-black text-[#FF2469]">
                CXR {cxr}
              </p>
            </div>
          ))}
        </div>
      </FadeInSection>
    </CaseSection>
  );
}

function ReflectionSection() {
  return (
    <CaseSection
      accentColor="text-[#FF2469]"
      eyebrow="09 复盘"
      id="reflection"
      intro="回看整个改版，最核心的转变是让频道从活动合集回归日常选购工具。"
      title="关键收获与取舍"
    >
      <FadeInSection>
        <SurfacePanel>
          <h3 className="text-[18px] font-black text-[#F4F7F8]">复盘总结</h3>
          <div className="mt-4 space-y-4 text-[14px] leading-[1.8] text-[#A8B1B8]">
            <p>
              商品卡 CTR +0.4pp（超过目标 +0.3pp），最优实验组 CXR +0.13pp，抽奖参与率 +35%。首屏空间重排和商品卡信息前置是这次提升最明确的两个动作。
            </p>
            <p>
              过程中最纠结的取舍是钩子品区：效率不高但仍贡献约 7% 订单，不能直接砍掉；运营位需要给业务留出口子，但不能继续占首屏。最终用数据给模块分级，把空间按转化贡献重新分配。
            </p>
            <p>
              视觉上最大的收获是跑通了一套频道语言——头图、商品卡、权益模块共用同一组规则，后续大促和日常态在同一框架内切换，不用每次重新画。
            </p>
          </div>
        </SurfacePanel>
      </FadeInSection>

      <div className="grid gap-4 md:grid-cols-3">
        {takeaways.map((item, index) => (
          <FadeInSection delay={index * 80} key={item.title}>
            <SurfacePanel className="h-full">
              <p className="font-mono text-[13px] font-black text-[#FF2469]">
                0{index + 1}
              </p>
              <h3 className="mt-6 text-[20px] font-black leading-snug text-[#F4F7F8]">
                {item.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.75] text-[#A8B1B8]">
                {item.body}
              </p>
            </SurfacePanel>
          </FadeInSection>
        ))}
      </div>
    </CaseSection>
  );
}

function BackToProjects() {
  return (
    <FadeInSection>
      <div className="flex justify-center py-24">
        <a
          className="group inline-flex items-center gap-3 rounded-full border border-white/10 px-8 py-4 text-[14px] font-medium text-[#F4F7F8]/65 transition-all duration-300 hover:border-white/25 hover:text-[#F4F7F8]"
          href={appPath("/#projects")}
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          返回所有项目
        </a>
      </div>
    </FadeInSection>
  );
}

function BeforeAfterPhones({
  after,
  afterCaption,
  before,
  beforeCaption,
}: {
  after: string;
  afterCaption: string;
  before: string;
  beforeCaption: string;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F4F7F8]/34">
          Before
        </p>
        <PhoneMockup caption={beforeCaption} size="lg" src={before} />
      </div>
      <div>
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FF2469]">
          After
        </p>
        <PhoneMockup caption={afterCaption} size="lg" src={after} />
      </div>
    </div>
  );
}

function ComparisonCard({
  after,
  before,
  title,
}: {
  after: string;
  before: string;
  title: string;
}) {
  return (
    <SurfacePanel className="h-full">
      <h3 className="text-[18px] font-black text-[#F4F7F8]">{title}</h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
        <PhoneMockup caption="Before" size="sm" src={before} />
        <PhoneMockup caption="After" size="sm" src={after} />
      </div>
    </SurfacePanel>
  );
}

function DesignAction({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="rounded-xl bg-white/[0.04] px-4 py-3">
      <p className="text-[13px] font-bold text-[#FF2469]">{label}</p>
      <p className="mt-1 text-[12px] text-[#A8B1B8]">{desc}</p>
    </div>
  );
}

function VisualFrame({
  alt,
  caption,
  src,
  title,
}: {
  alt: string;
  caption: string;
  src: string;
  title: string;
}) {
  return (
    <figure>
      <div>
        <img
          alt={alt}
          className="block w-full rounded-[28px] object-contain object-top"
          loading="lazy"
          src={src}
        />
      </div>
      <figcaption className="pt-4">
        <p className="text-[13px] font-black text-[#F4F7F8]/82">{title}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-[#A8B1B8]/64">
          {caption}
        </p>
      </figcaption>
    </figure>
  );
}

function ChoiceCallout({
  body,
  label,
  title,
}: {
  body: string;
  label: string;
  title: string;
  tone: string;
}) {
  return (
    <FadeInSection>
      <div className="border-y border-white/[0.10] py-5">
        <div className="grid gap-4 md:grid-cols-[190px_1fr] md:items-start">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#FF2469]">
              {label}
            </p>
            <h3 className="mt-2 text-[20px] font-black leading-tight text-[#F4F7F8]">
              {title}
            </h3>
          </div>
          <p className="text-[14px] leading-[1.78] text-[#A8B1B8] md:pt-6">
            {body}
          </p>
        </div>
      </div>
    </FadeInSection>
  );
}

function SurfacePanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-[#141516] p-6 ${className}`}
    >
      {children}
    </div>
  );
}

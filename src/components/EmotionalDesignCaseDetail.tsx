import { useEffect, type ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import {
  CaseSection,
  FadeInSection,
  MediaSlot,
  PageContainer,
  PillNav,
  type PillNavItem,
} from "./shared";
import { appPath, assetPath } from "../utils/assetPath";

const projectMeta: [string, string][] = [
  ["周期", "2024.12 — 2025.01"],
  ["职责", "负责视觉 / UI 设计"],
  ["范围", "情感化设计 / 时令场景 / IP 应用 / 动效表达"],
];

const heroSignals = [
  { label: "生活信号", value: "时令", note: "把季节变化转译成即时购买动机" },
  { label: "体验感受", value: "沉浸", note: "让频道从促销信息变成当下场景" },
  { label: "长期价值", value: "复用", note: "让不同节气与商品都能延展同一套语言" },
];

const backgroundPoints = [
  { number: "01", label: "业务现状", body: "闪购核心优势是 30 分钟送达，但频道页面长期以硬广大促为主，满屏价格标签和活动 banner" },
  { number: "02", label: "用户反馈", body: "高频促销导致审美疲劳，用户对价格信息注意力下降，页面缺少与当下生活的连接感" },
  { number: "03", label: "设计机会", body: "把季节变化和节气热点转化为页面体验，用情绪驱动购买意愿，而非单纯依赖补贴" },
];

const insightRows = [
  { number: "01", dimension: "用户心理", finding: "草莓上市想尝鲜、立冬想吃火锅——季节情绪比价格标签更容易触发即时行动" },
  { number: "02", dimension: "场景连接", finding: "闪购即时配送能力天然适合承接时令需求，但页面没把这种能力和用户感受连起来" },
  { number: "03", dimension: "设计缺口", finding: "现有频道只有促销信息层，缺少情绪体验层——需要让用户先感知场景、再看到商品" },
];

const emotionalLayers = [
  { number: "01", title: "本能层", body: "色彩、材质、季节元素营造首屏氛围，建立一眼可感知的应季吸引力" },
  { number: "02", title: "行为层", body: "掉落、停留、横幅等动态叙事引导视线，从氛围自然过渡到商品决策" },
  { number: "03", title: "反思层", body: "IP 形象与节气故事形成记忆锚点，让用户把平台和当季购物乐趣关联起来" },
];

const designFlow = [
  { number: "01", title: "感知", body: "从草莓上市、立冬节气等高感知信号切入，连接用户正在经历的生活状态" },
  { number: "02", title: "情绪", body: "用颜色、IP、动效和页面氛围强化季节感，让用户感受到当下买正合适" },
  { number: "03", title: "转化", body: "把氛围和商品内容串联起来，让注意力从情绪自然落到应季商品入口" },
  { number: "04", title: "延展", body: "沉淀色彩和动效关系为模板，后续节气只需换主题素材即可快速适配" },
];

const strawberrySteps = [
  {
    number: "01",
    title: "第一眼看到新鲜上市",
    body: "用开屏掉落制造新品到来的即时惊喜，先把注意力从常规频道刷新中拉出来。",
  },
  {
    number: "02",
    title: "停留时记住丹东草莓",
    body: "在动效停留阶段强化丹东草莓、新品上市等主题信息，让情绪与商品名绑定。",
  },
  {
    number: "03",
    title: "退场后进入商品决策",
    body: "动效退场后保留横幅和商品承接，减少注意力断层，引导用户继续浏览和点击。",
  },
];

const winterPoints = [
  {
    number: "01",
    title: "温暖反差",
    body: "暖色调与雪花动效形成寒冷天气里的温暖反差。",
  },
  {
    number: "02",
    title: "文化语境",
    body: "IP 场景化植入强化立冬食养生的文化语境。",
  },
  {
    number: "03",
    title: "需求承接",
    body: "火锅食材、热饮、时令果蔬等商品模块承接节气需求。",
  },
];

const moreScenes = [
  { title: "柿子上市", tone: "warm" as const },
  { title: "立春", tone: "green" as const },
  { title: "圣诞", tone: "pink" as const },
  { title: "樱花季", tone: "green" as const },
];

const reflectionPoints = [
  {
    number: "01",
    title: "情感化服务于浏览路径",
    body: "从进入频道的第一秒开始，让用户知道这个场景为什么和自己当下有关，而非单纯增加装饰。",
  },
  {
    number: "02",
    title: "时令是天然的情感锚",
    body: "季节、节气、天气本身带有文化和生活经验，比单纯促销更容易生成购买理由。",
  },
  {
    number: "03",
    title: "两种目标共用同一套框架",
    body: "草莓侧重商品转化、立冬侧重氛围沉浸，但三层模型的拆法是通用的，区别只在各层权重。",
  },
  {
    number: "04",
    title: "模板化决定能否持续落地",
    body: "只有把氛围、动效和营销承接拆成稳定图层，情感化设计才不会停留在单次大图里。",
  },
];

const pillNavItems: PillNavItem[] = [
  { label: "概览", href: "#overview" },
  { label: "背景", href: "#background" },
  { label: "洞察", href: "#insight" },
  { label: "方法", href: "#method" },
  { label: "实践", href: "#cases" },
  { label: "延展", href: "#more-scenes" },
  { label: "回顾", href: "#reflection" },
];

export default function EmotionalDesignCaseDetail() {
  useEffect(() => {
    document.title = "闪购情感化设计 — Neeko Wu";
  }, []);

  return (
    <main className="relative isolate min-h-screen overflow-x-clip bg-[#060807] pb-28 text-[#F4F7F8]">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(180deg,#060807_0%,#0A120D_38%,#09080A_72%,#060807_100%)]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-[#72F064]/40 to-transparent" />
      <div className="relative z-10">
        <HeroSection />
        <BackgroundSection />
        <InsightSection />
        <MethodSection />
        <CasesSection />
        <MoreScenesSection />
        <ReflectionSection />
        <BackToProjects />
        <PillNav items={pillNavItems} projectSlug="emotional-design" />
      </div>
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden" id="overview">
      <PageContainer className="flex min-h-screen flex-col justify-center py-10">
        <FadeInSection className="mb-12">
          <a
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#A8B1B8] transition-colors duration-300 hover:text-[#72F064]"
            href={appPath("/#projects")}
          >
            <ArrowLeft size={14} />
            返回项目
          </a>
        </FadeInSection>

        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.7fr)] lg:items-center">
          <FadeInSection>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#72F064]">
              FOUR+ · Emotional design
            </p>
            <h1 className="mt-5 max-w-[860px] text-[clamp(3rem,7vw,6rem)] font-black leading-[1.02] tracking-normal text-[#F4F7F8]">
              闪购情感化
              <br />
              <span className="text-[#A8B1B8]">设计探索</span>
            </h1>
            <p className="mt-6 max-w-[680px] text-[clamp(1rem,1.45vw,1.22rem)] font-light leading-[1.75] text-[#A8B1B8]">
              把四季更迭与节日热点转化为频道体验，用季节感驱动即时购买意愿，并沉淀一套后续节气可直接复用的情感化设计方法。
            </p>

            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {heroSignals.map((signal) => (
                <div className="border-t border-white/[0.10] pt-5" key={signal.label}>
                  <p className="text-[28px] font-black leading-none text-[#72F064]">{signal.value}</p>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">
                    {signal.label}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#A8B1B8]">{signal.note}</p>
                </div>
              ))}
            </div>

            <dl className="mt-10 grid max-w-[720px] gap-5 border-t border-white/[0.08] pt-7 text-sm text-[#A8B1B8] sm:grid-cols-3">
              {projectMeta.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">{label}</dt>
                  <dd className="mt-2 leading-relaxed">{value}</dd>
                </div>
              ))}
            </dl>
          </FadeInSection>

          <FadeInSection delay={140}>
            <div className="grid grid-cols-2 gap-5" style={{ transform: "scale(1.3) translateX(30px)", transformOrigin: "center center" }}>
              <div className="aspect-[9/19] overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
                <video
                  src={assetPath("strawberry-drop.mp4")}
                  autoPlay
                  loop
                  muted
                  playsInline preload="metadata"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="aspect-[9/19] overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
                <video
                  src={assetPath("snow-fall.mp4")}
                  autoPlay
                  loop
                  muted
                  playsInline preload="metadata"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </FadeInSection>
        </div>
      </PageContainer>
    </section>
  );
}

/* ─── 01 背景 ─── */
function BackgroundSection() {
  return (
    <CaseSection
      accentColor="text-[#72F064]"
      eyebrow="01 背景"
      id="background"
      intro="闪购频道拥有极强的即时履约能力，但频道页面长期停留在促销逻辑里，和用户当下的生活状态脱节。"
      title="从促销页面到生活场景"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.45fr)] lg:items-end">
        <div className="space-y-0">
          {backgroundPoints.map((point, i) => (
            <FadeInSection delay={i * 80} key={point.label}>
              <article className="grid gap-4 border-t border-white/[0.06] py-6 first:border-t-0 md:grid-cols-[48px_100px_minmax(0,1fr)]">
                <p className="font-mono text-[14px] font-bold text-[#72F064]">{point.number}</p>
                <p className="text-[14px] font-bold text-[#F4F7F8]">{point.label}</p>
                <p className="text-[14px] leading-[1.75] text-[#A8B1B8]">{point.body}</p>
              </article>
            </FadeInSection>
          ))}
        </div>
        <FadeInSection delay={120}>
          <div className="flex items-center gap-3">
            <img
              src={assetPath("emotional-screen-a.webp")}
              alt="频道页面截图 A"
              className="h-[420px] rounded-2xl object-contain shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            />
            <img
              src={assetPath("emotional-screen-b.webp")}
              alt="频道页面截图 B"
              className="h-[420px] rounded-2xl object-contain shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            />
          </div>
        </FadeInSection>
      </div>
    </CaseSection>
  );
}

/* ─── 02 洞察 ─── */
function InsightSection() {
  return (
    <CaseSection
      accentColor="text-[#72F064]"
      eyebrow="02 洞察"
      id="insight"
      intro="草莓上市想尝鲜、立冬想吃火锅——季节情绪比价格标签更容易触发即时下单。闪购要做的是把这种情绪接住。"
      title="季节情绪与即时购买"
    >
      <div className="space-y-0">
        {insightRows.map((row, i) => (
          <FadeInSection delay={i * 80} key={row.dimension}>
            <article className="grid gap-4 border-t border-white/[0.06] py-6 first:border-t-0 md:grid-cols-[48px_100px_minmax(0,1fr)]">
              <p className="font-mono text-[14px] font-bold text-[#72F064]">{row.number}</p>
              <p className="text-[14px] font-bold text-[#F4F7F8]">{row.dimension}</p>
              <p className="text-[14px] leading-[1.75] text-[#A8B1B8]">{row.finding}</p>
            </article>
          </FadeInSection>
        ))}
      </div>
    </CaseSection>
  );
}

/* ─── 03 方法 ─── */
function MethodSection() {
  return (
    <CaseSection
      accentColor="text-[#72F064]"
      eyebrow="03 设计方法"
      id="method"
      intro="基于情感化设计三层模型，把频道体验拆分为本能层、行为层和反思层，并定义从感知到转化的四步流程。"
      title="三层模型，四步落地"
    >
      <FadeInSection>
        <h3 className="mb-4 text-[13px] font-bold uppercase tracking-[0.12em] text-[#667078]">情感化三层</h3>
        <div className="space-y-0">
          {emotionalLayers.map((layer) => (
            <article className="grid gap-4 border-t border-white/[0.06] py-6 first:border-t-0 md:grid-cols-[48px_80px_minmax(0,1fr)]" key={layer.title}>
              <p className="font-mono text-[14px] font-bold text-[#72F064]">{layer.number}</p>
              <p className="text-[14px] font-bold text-[#F4F7F8]">{layer.title}</p>
              <p className="text-[14px] leading-[1.75] text-[#A8B1B8]">{layer.body}</p>
            </article>
          ))}
        </div>
        <img
          src={assetPath("emotional-layers.webp")}
          alt="情感化设计图层拆解示意"
          className="mt-6 w-full rounded-xl object-contain"
        />
      </FadeInSection>

      <FadeInSection>
        <h3 className="mb-6 text-[13px] font-bold uppercase tracking-[0.12em] text-[#667078]">设计流程</h3>
        {/* 进度条 */}
        <div className="relative mb-8 h-[3px] w-full rounded-full bg-white/[0.06]">
          <div className="absolute inset-y-0 left-0 w-full rounded-full bg-gradient-to-r from-[#72F064]/60 to-[#72F064]/10" />
          {designFlow.map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 h-[9px] w-[9px] -translate-y-1/2 rounded-full border-2 border-[#72F064] bg-[#0a0a0b]"
              style={{ left: `${(i / (designFlow.length - 1)) * 100}%`, marginLeft: i === 0 ? 0 : i === designFlow.length - 1 ? "-9px" : "-4.5px" }}
            />
          ))}
        </div>
        {/* 四列内容 */}
        <div className="grid grid-cols-4 gap-6">
          {designFlow.map((step) => (
            <div key={step.number}>
              <p className="text-[12px] font-bold text-[#72F064]">{step.title}</p>
              <p className="mt-2 text-[12px] leading-[1.7] text-[#A8B1B8]">{step.body}</p>
            </div>
          ))}
        </div>
      </FadeInSection>
    </CaseSection>
  );
}

/* ─── 04 实践 ─── */
function CasesSection() {
  return (
    <CaseSection
      accentColor="text-[#72F064]"
      eyebrow="04 设计实践"
      id="cases"
      intro="同时选择两个场景验证方法论：草莓上市侧重商品转化，立冬节气侧重氛围沉浸。两种目标共用同一套情感化框架。"
      title="一套方法，两种验证"
    >
      {/* 草莓上市 */}
      <FadeInSection>
        <div className="rounded-2xl bg-[#141516] p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#72F064]">场景 A · 商品转化导向</p>
          <h3 className="mt-3 text-[20px] font-black text-[#F4F7F8]">草莓应季上市</h3>
          <p className="mt-3 mb-6 text-[14px] leading-[1.75] text-[#A8B1B8]">
            草莓上市季节，用户对应季的感知天然强烈。页面用掉落动效制造惊喜，再把注意力平滑转移到新品和购买入口，目标是缩短从感知到下单的路径。
          </p>
          <div className="space-y-0">
            {strawberrySteps.map((step) => (
              <article className="grid gap-4 border-t border-white/[0.06] py-5 first:border-t-0 md:grid-cols-[48px_minmax(160px,200px)_minmax(0,1fr)]" key={step.number}>
                <p className="font-mono text-[14px] font-bold text-[#72F064]">{step.number}</p>
                <p className="text-[14px] font-bold text-[#F4F7F8]">{step.title}</p>
                <p className="text-[14px] leading-[1.75] text-[#A8B1B8]">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="flex items-center gap-5">
          <img
            src={assetPath("strawberry-steps.webp")}
            alt="草莓上市三步动效流程"
            className="h-[520px] rounded-xl object-contain"
          />
          <div className="h-[520px] flex-shrink-0 overflow-hidden rounded-2xl">
            <video
              src={assetPath("strawberry-drop.mp4")}
              autoPlay
              loop
              muted
              playsInline preload="metadata"
              className="h-full rounded-2xl object-contain"
            />
          </div>
        </div>
      </FadeInSection>

      {/* 立冬节气 */}
      <FadeInSection>
        <div className="rounded-2xl bg-[#141516] p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#72F064]">场景 B · 氛围沉浸导向</p>
          <h3 className="mt-3 text-[20px] font-black text-[#F4F7F8]">立冬节气</h3>
          <p className="mt-3 mb-6 text-[14px] leading-[1.75] text-[#A8B1B8]">
            立冬场景从寒冷与温暖的情绪反差出发，用暖色插画、IP 和雪花动效营造节气氛围，目标是让用户在频道里感受到季节变化带来的生活仪式感。
          </p>
          <div className="space-y-0">
            {winterPoints.map((point) => (
              <article className="grid gap-4 border-t border-white/[0.06] py-5 first:border-t-0 md:grid-cols-[48px_minmax(100px,120px)_minmax(0,1fr)]" key={point.number}>
                <p className="font-mono text-[14px] font-bold text-[#72F064]">{point.number}</p>
                <p className="text-[14px] font-bold text-[#F4F7F8]">{point.title}</p>
                <p className="text-[14px] leading-[1.75] text-[#A8B1B8]">{point.body}</p>
              </article>
            ))}
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="flex items-center gap-5">
          <img
            src={assetPath("winter-mockup.webp")}
            alt="立冬节气 IP 与频道界面"
            className="h-[520px] rounded-xl object-contain"
          />
          <div className="h-[520px] flex-shrink-0 overflow-hidden rounded-2xl">
            <video
              src={assetPath("snow-fall.mp4")}
              autoPlay
              loop
              muted
              playsInline preload="metadata"
              className="h-full rounded-2xl object-contain"
            />
          </div>
        </div>
      </FadeInSection>
    </CaseSection>
  );
}

/* ─── 05 延展 ─── */
function MoreScenesSection() {
  return (
    <CaseSection
      accentColor="text-[#72F064]"
      eyebrow="05 场景延展"
      id="more-scenes"
      intro="草莓和立冬跑通之后，把氛围、动效和商品承接拆成标准化图层，后续节气换主题素材和色彩就能快速出页面。"
      title="从单点验证到模板化产出"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { src: assetPath("screen-autumn.webp"), title: "柿子上市主题" },
          { src: assetPath("screen-spring.webp"), title: "立春主题" },
          { src: assetPath("screen-christmas.webp"), title: "圣诞主题" },
          { src: assetPath("screen-sakura.webp"), title: "樱花季主题" },
        ].map((scene, i) => (
          <FadeInSection delay={i * 80} key={scene.title}>
            <div className="overflow-hidden rounded-[1.8rem] border-[3px] border-[#2a2a2a]">
              <img
                src={scene.src}
                alt={scene.title}
                className="w-full object-cover"
              />
            </div>
          </FadeInSection>
        ))}
      </div>
    </CaseSection>
  );
}

/* ─── 06 回顾 ─── */
function ReflectionSection() {
  return (
    <CaseSection
      accentColor="text-[#72F064]"
      eyebrow="06 项目回顾"
      id="reflection"
      intro="两个场景都跑完后，对情感化设计在电商频道里怎么用有了更具体的认识。"
      title="认知迭代"
    >
      <div className="space-y-0">
        {reflectionPoints.map((point, i) => (
          <FadeInSection delay={i * 80} key={point.title}>
            <article className="grid gap-4 border-t border-white/[0.06] py-6 first:border-t-0 md:grid-cols-[48px_minmax(200px,260px)_minmax(0,1fr)]">
              <p className="font-mono text-[14px] font-bold text-[#72F064]">{point.number}</p>
              <p className="text-[14px] font-bold text-[#F4F7F8]">{point.title}</p>
              <p className="text-[14px] leading-[1.75] text-[#A8B1B8]">{point.body}</p>
            </article>
          </FadeInSection>
        ))}
      </div>
    </CaseSection>
  );
}

function BackToProjects() {
  return (
    <FadeInSection>
      <div className="mx-auto flex max-w-6xl justify-center px-6 py-24 md:px-16">
        <a
          className="group inline-flex items-center gap-3 rounded-full border border-white/[0.12] px-8 py-4 text-[14px] font-medium text-[#A8B1B8] transition-colors duration-300 hover:border-[#72F064]/50 hover:text-[#F4F7F8]"
          href={appPath("/#projects")}
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          返回所有项目
        </a>
      </div>
    </FadeInSection>
  );
}

function PhoneMockup({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto w-full max-w-[320px] ${className}`}>
      <div className="relative overflow-hidden rounded-[1.8rem] border-[3px] border-[#2a2a2a] bg-black shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-[10px] z-20 h-[20px] w-[72px] -translate-x-1/2 rounded-full bg-black" />
        {/* Screen */}
        <div className="aspect-[9/19.5] w-full overflow-hidden">
          {children}
        </div>
      </div>
    </div>
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
    <div className={`h-full rounded-2xl bg-[#141516] p-6 ${className}`}>
      {children}
    </div>
  );
}

import { useEffect, useRef, useState, type ReactNode } from "react";
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
  ["Timeline", "2023.12 — 2024.10"],
  ["Role", "负责视觉设计"],
  ["Scope", "用户增长营销 / 活动视觉 / 新人承接 / 社群裂变"],
];

const heroKeywords = [
  "用户增长",
  "营销 IP",
  "活动会场",
  "新人承接",
  "社群裂变",
  "组件化设计",
];

const backgroundPoints = [
  {
    label: "产品模式",
    text: "拼好饭通过集单拼单、统一配送压缩成本，为价格敏感型用户提供高性价比外卖。",
  },
  {
    label: "用户特征",
    text: "以大学生和初入职场的年轻用户为主，对价格敏感度高、决策链路短、但对「加入新平台」有默认的信任门槛。",
  },
  {
    label: "增长挑战",
    text: "全年高频拉新促活，每次活动周期短、触点多，视觉很容易做成一次性海报然后丢掉。",
  },
];


const designStrategy = [
  {
    label: "01",
    title: "利益点前置",
    body: "活动画面第一件事是让用户看到价格和福利，而不是氛围插画。",
  },
  {
    label: "02",
    title: "营销 IP 化",
    body: "把单次活动包装成可识别的主题（如 1 元爆品团），用固定角色和色彩贯穿后续各期活动。",
  },
  {
    label: "03",
    title: "全链路统一",
    body: "从入口资源位、会场、弹窗到分享图，让用户在不同触点看到同一件事。",
  },
  {
    label: "04",
    title: "组件化沉淀",
    body: "拆出头图、价格区、IP 元素等模块，运营换主题时设计不用从零开始。",
  },
];

const reflectionPoints = [
  {
    title: "组件化思维比「做得好看」更有长期价值",
    body: "当我把视觉拆成可复用模块后，后续活动的出图效率提升了很多，运营换主题只需要换素材而不是重新设计整个页面。",
  },
  {
    title: "增长场景里，设计要服务于转化逻辑",
    body: "一开始我会习惯性地先把氛围做满，后来发现用户根本不看背景插画——价格和利益点的层级才是转化率的关键。",
  },
  {
    title: "如果重来，会更早建立设计资产库",
    body: "项目前期每次活动都是从零画起，到后期才沉淀出组件规范。如果一开始就有这个意识，前期的返工会少很多。",
  },
];

const pillNavItems: PillNavItem[] = [
  { label: "概览", href: "#overview" },
  { label: "背景", href: "#background" },
  { label: "目标", href: "#goals" },
  { label: "1元爆品团", href: "#case-one-yuan" },
  { label: "开学季", href: "#case-back-to-school" },
  { label: "新人增长", href: "#case-new-user" },
  { label: "回顾", href: "#reflection" },
];

/* ─── 案例模块数据 ─── */

interface CaseModule {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  metrics: { label: string; value: string }[];
  images: { src: string; alt: string; tone: "pink" | "sun" | "cyan" }[];
  glowColor: string;
}

const caseModules: CaseModule[] = [
  {
    id: "case-one-yuan",
    eyebrow: "03 1 元爆品团 · 饮品频道 · 全品类会场",
    title: "1 元爆品团系列活动",
    intro: "拼好饭核心拉新 IP，从 23 年基础版到 24 年饮品频道（周六奶茶日）再到 928 全品类会场，逐步扩品。我负责会场主视觉、大促 banner 换肤和各期物料延展。",
    metrics: [
      { label: "会场转化率", value: "+32%" },
      { label: "裂变渠道转化率", value: "+0.95pp" },
    ],
    images: [
      { src: assetPath("assets/pinhaofan-growth/1yuan-hero.webp"), alt: "1元爆品团主视觉", tone: "pink" },
      { src: assetPath("assets/pinhaofan-growth/1yuan-drinks-allcat.webp"), alt: "饮品频道·周六奶茶日 & 全品类会场", tone: "cyan" },
    ],
    glowColor: "rgba(255, 60, 115, 0.06)",
  },
  {
    id: "case-back-to-school",
    eyebrow: "04 开学季活动",
    title: "开学季营销活动",
    intro: "针对大学生返校节点策划的营销活动，复用 1 元爆品团的视觉组件快速搭建会场，负责活动页、弹窗、瓷片入口和朋友圈海报等全套视觉设计。",
    metrics: [
      { label: "活动 DAU", value: "426w" },
      { label: "活跃率提升", value: "+1.44pp" },
    ],
    images: [
      { src: assetPath("assets/pinhaofan-growth/backtoschool.webp"), alt: "开学季活动主视觉与会场页面", tone: "sun" },
    ],
    glowColor: "rgba(255, 200, 50, 0.06)",
  },
  {
    id: "case-new-user",
    eyebrow: "05 新人增长",
    title: "新人承接与裂变链路",
    intro: "围绕新客首单转化设计了承接页、策略页、进群页和邀新赚现金页，用视觉优化信任背书和利益点展示，降低新用户决策门槛。",
    metrics: [
      { label: "首页访购率", value: "+2.11pp" },
    ],
    images: [
      { src: assetPath("assets/pinhaofan-growth/newuser.webp"), alt: "新人承接页·进群页·邀新赚现金页", tone: "pink" },
    ],
    glowColor: "rgba(255, 80, 140, 0.06)",
  },
];

export default function PinhaofanGrowthCaseDetail() {
  useEffect(() => {
    document.title = "拼好饭用户增长营销设计 — Neeko Wu";
  }, []);

  return (
    <main className="relative isolate min-h-screen overflow-x-clip bg-[#09070D] pb-28 text-[#F4F7F8]">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(180deg,#09070D_0%,#120811_44%,#0A0B0D_100%)]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-[#FF3C73]/50 to-transparent" />
      <div className="relative z-10">
        <HeroSection />
        <BackgroundSection />
        <GoalsSection />
        <CaseTransition />
        {caseModules.map((mod) => (
          <StickyCase key={mod.id} data={mod} />
        ))}
        <ReflectionSection />
        <BackToProjects />
        <PillNav items={pillNavItems} projectSlug="pinhaofan-growth" />
      </div>
    </main>
  );
}

/* ─── Sticky 左右分栏案例模块 ─── */

function StickyCase({ data }: { data: CaseModule }) {
  return (
    <section className="relative overflow-hidden" id={data.id}>
      {/* ─── 图片外发光 ─── */}
      {/* 不在背景做文章，而是让图片自身带一圈柔和的彩色 glow */}

      <div className="relative mx-auto max-w-7xl px-6 md:px-16">
        <div className="grid lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-12">
          {/* 左侧 sticky 信息栏 */}
          <div className="py-[clamp(48px,6vw,96px)] lg:sticky lg:top-24 lg:self-start">
            <FadeInSection>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">
                {data.eyebrow}
              </p>
              <h2 className="mt-4 text-[clamp(1.6rem,3.2vw,2.4rem)] font-black leading-[1.1] text-[#F4F7F8]">
                {data.title}
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-[#A8B1B8]">
                {data.intro}
              </p>

              {/* 数据指标 */}
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                {data.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="text-[24px] font-black leading-none text-[#FF3C73]">{m.value}</p>
                    <p className="mt-1 text-[11px] font-medium text-[#A8B1B8]/60">{m.label}</p>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>

          {/* 右侧大图流 */}
          <div className="space-y-6 py-[clamp(48px,6vw,96px)]">
            {data.images.map((img, i) => (
              <FadeInSection key={img.alt} delay={i * 60}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full rounded-lg"
                  style={{
                    boxShadow: `0 0 60px 10px ${data.glowColor.replace(/[\d.]+\)$/, '0.18)')}, 0 0 120px 40px ${data.glowColor.replace(/[\d.]+\)$/, '0.08)')}`,
                  }}
                />
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Hero ─── */

function HeroSection() {
  return (
    <section className="relative overflow-hidden" id="overview">
      <PageContainer className="pt-28 pb-10">
        <FadeInSection className="mb-8">
          <a
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#A8B1B8] transition-colors duration-300 hover:text-[#FF3C73]"
            href={appPath("/#projects")}
          >
            <ArrowLeft size={14} />
            Back to projects
          </a>
        </FadeInSection>

        <FadeInSection className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FF3C73]">
            FIVE · Growth marketing design
          </p>
          <h1 className="mt-4 text-[clamp(2.8rem,6vw,5rem)] font-black leading-[1.02] tracking-tight text-[#F4F7F8]">
            拼好饭用户增长营销设计
          </h1>
          <p className="mt-4 text-[15px] font-light leading-[1.8] text-[#A8B1B8]/80">
            从营销 IP 到活动会场到新人承接页，搭建统一的增长视觉体系，把价格和福利推到用户第一眼。
          </p>
        </FadeInSection>

        <FadeInSection delay={80}>
          <div className="mt-10 flex flex-wrap justify-center gap-2 border-t border-white/[0.06] pt-6">
            {heroKeywords.map((kw) => (
              <span
                key={kw}
                className="rounded-full border border-white/[0.08] px-3 py-1 text-[12px] text-[#A8B1B8]/80"
              >
                {kw}
              </span>
            ))}
          </div>

          <dl className="mt-6 flex flex-wrap justify-center gap-x-10 gap-y-3 text-[13px] text-[#A8B1B8]/70">
            {projectMeta.map(([label, value]) => (
              <div className="flex items-baseline gap-2" key={label}>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#667078]">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </FadeInSection>
      </PageContainer>

      {/* 全宽贯穿配图，无左右间距 */}
      <FadeInSection delay={100}>
        <img
          src={assetPath("pinhaofan-hero.webp")}
          alt="拼好饭 3D IP 主视觉"
          className="-mt-8 w-full object-contain"
        />
      </FadeInSection>
    </section>
  );
}

/* ─── Background ─── */

function BackgroundSection() {
  return (
    <section className="py-[clamp(48px,6vw,96px)]" id="background">
      <PageContainer>
        <FadeInSection>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">01 项目背景</p>
          <h2 className="mt-5 text-[clamp(1.875rem,4.2vw,3.25rem)] font-black leading-[1.08] text-[#F4F7F8]">
            低价外卖的高频增长场景
          </h2>
        </FadeInSection>

        <FadeInSection delay={60}>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {backgroundPoints.map((point) => (
              <div key={point.label}>
                <p className="text-[12px] font-semibold text-[#FF3C73]">{point.label}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-[#A8B1B8]">{point.text}</p>
              </div>
            ))}
          </div>
        </FadeInSection>
      </PageContainer>
    </section>
  );
}

/* ─── Goals ─── */

function GoalsSection() {
  return (
    <section className="py-[clamp(48px,6vw,96px)]" id="goals">
      <PageContainer>
        <FadeInSection>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">02 设计策略</p>
          <h2 className="mt-5 text-[clamp(1.875rem,4.2vw,3.25rem)] font-black leading-[1.08] text-[#F4F7F8]">
            从单次活动到可复用的增长视觉系统
          </h2>
        </FadeInSection>

        <FadeInSection delay={80}>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {designStrategy.map((item) => (
              <div key={item.label} className="border-t border-white/[0.06] pt-5">
                <p className="text-[13px] font-bold text-[#FF3C73]">{item.label}</p>
                <h3 className="mt-2 text-[16px] font-bold text-[#F4F7F8]">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#A8B1B8]/80">{item.body}</p>
              </div>
            ))}
          </div>
        </FadeInSection>
      </PageContainer>
    </section>
  );
}

/* ─── Case Transition ─── */

function CaseTransition() {
  return (
    <section className="py-[clamp(32px,4vw,64px)]">
      <PageContainer>
        <FadeInSection>
          <p className="text-[14px] leading-relaxed text-[#A8B1B8]/80">
            以下三个案例按落地顺序排列：先用 1 元爆品团建立视觉母体，再把组件复用到开学季节点活动，最后延伸到新人承接和裂变场景。
          </p>
        </FadeInSection>
      </PageContainer>
    </section>
  );
}

/* ─── Reflection ─── */

function ReflectionSection() {
  return (
    <section className="py-[clamp(48px,6vw,96px)]" id="reflection">
      <PageContainer>
        <FadeInSection>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">06 总结与复盘</p>
          <h2 className="mt-5 text-[clamp(1.875rem,4.2vw,3.25rem)] font-black leading-[1.08] text-[#F4F7F8]">
            关键判断与迭代认知
          </h2>
        </FadeInSection>

        <FadeInSection delay={80}>
          <div className="mt-10 space-y-0 divide-y divide-white/[0.06]">
            {reflectionPoints.map((point, i) => (
              <article className="grid gap-4 py-6 md:grid-cols-[60px_minmax(0,720px)]" key={point.title}>
                <p className="text-[18px] font-black text-[#FF3C73]">0{i + 1}</p>
                <div>
                  <h3 className="text-[16px] font-bold text-[#F4F7F8]">{point.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#A8B1B8]/80">{point.body}</p>
                </div>
              </article>
            ))}
          </div>
        </FadeInSection>
      </PageContainer>
    </section>
  );
}

/* ─── Back ─── */

function BackToProjects() {
  return (
    <FadeInSection>
      <div className="mx-auto flex max-w-6xl justify-center px-6 py-24 md:px-16">
        <a
          className="group inline-flex items-center gap-3 rounded-full border border-white/[0.12] px-8 py-4 text-[14px] font-medium text-[#A8B1B8] transition-colors duration-300 hover:border-[#FF3C73]/50 hover:text-[#F4F7F8]"
          href={appPath("/#projects")}
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          返回所有项目
        </a>
      </div>
    </FadeInSection>
  );
}

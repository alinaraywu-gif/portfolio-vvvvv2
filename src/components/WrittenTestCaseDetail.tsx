import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowLeft, FileText, ExternalLink } from "lucide-react";
import { FadeInSection, PageContainer, PillNav, type PillNavItem } from "./shared";
import { appPath, assetPath } from "../utils/assetPath";

/* ═══════════════════ Data ═══════════════════ */

interface TestProject {
  id: string;
  number: string;
  company: string;
  title: string;
  englishTitle: string;
  subtitle: string;
  tags: string[];
  pdfPath: string;
  accent: string;
  accentBg: string;
}

const ACCENT = "#A8B1B8";
const ACCENT_BG = "rgba(168,177,184,0.06)";

const testProjects: TestProject[] = [
  {
    id: "tmall-ai-home",
    number: "01",
    company: "天猫家装",
    title: "AI放我家 · 体验升级",
    englishTitle: "Tmall AI Home Furnishing Experience Upgrade",
    subtitle: "从摆放工具升级为 AI 家装决策助手，帮用户判断适不适合买、怎么搭配买",
    tags: ["AI 体验设计", "家装决策", "UX 升级", "天猫"],
    pdfPath: assetPath("assets/written-tests/tmall-ai-home.pdf"),
    accent: ACCENT,
    accentBg: ACCENT_BG,
  },
  {
    id: "95fen-pdp",
    number: "02",
    company: "得物 95分",
    title: "鞋类商详页改版",
    englishTitle: "95fen Sneaker PDP Redesign",
    subtitle: "从信息展示型商详到决策辅助型商详，围绕价值判断、信任建立与行动承接重构信息优先级",
    tags: ["商品详情页", "二手交易", "信任设计", "决策效率"],
    pdfPath: assetPath("assets/written-tests/95fen-pdp-redesign.pdf"),
    accent: ACCENT,
    accentBg: ACCENT_BG,
  },
  {
    id: "jd-health-ai",
    number: "03",
    company: "京东健康",
    title: "小康 IP 与 AI 对话页优化",
    englishTitle: "JD Health AI Assistant — XiaoKang IP Redesign",
    subtitle: "基于 JOY 的友好基因重塑健康 AI 助手，建立可信、可延展的角色系统与对话首页",
    tags: ["IP 设计", "AI 对话", "角色系统", "健康服务"],
    pdfPath: assetPath("assets/written-tests/jd-health-ai.pdf"),
    accent: ACCENT,
    accentBg: ACCENT_BG,
  },
  {
    id: "douyin-gift-panel",
    number: "04",
    company: "抖音直播",
    title: "礼物面板分层推荐体验优化",
    englishTitle: "Douyin Live Gift Panel — Layered Recommendation UX",
    subtitle: "基于用户关系阶段分层推荐送礼理由，让推荐区在陈列礼物的基础上补充送礼动机和下一步动作",
    tags: ["分层推荐", "直播互动", "体验优化", "送礼决策"],
    pdfPath: assetPath("assets/written-tests/douyin-gift-panel.pdf"),
    accent: ACCENT,
    accentBg: ACCENT_BG,
  },
];

/* --- PillNav --- */

const detailNavItems: PillNavItem[] = [
  { label: "概览", href: "#overview" },
  { label: "天猫家装 AI", href: "#tmall-ai-home" },
  { label: "95分商详", href: "#95fen-pdp" },
  { label: "京东健康 IP", href: "#jd-health-ai" },
  { label: "抖音礼物面板", href: "#douyin-gift-panel" },
];

/* ═══════════════════ Main Export ═══════════════════ */

export default function WrittenTestCaseDetail() {
  useEffect(() => {
    document.title = "笔试设计题 — Neeko Wu";
  }, []);

  return (
    <main className="relative isolate min-h-screen overflow-x-clip bg-[#050608] pb-28 text-[#F4F7F8]">
      {/* Background gradient — neutral */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_30%_12%,rgba(255,255,255,0.02),transparent_30%),radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.015),transparent_28%),linear-gradient(180deg,#050608_0%,#080a0f_42%,#050608_100%)]" />

      <div className="relative z-10">
        <HeroSection />
        {testProjects.map((project) => (
          <ProjectSection key={project.id} project={project} />
        ))}
        <PillNav items={detailNavItems} projectSlug="written-tests" />
      </div>
    </main>
  );
}

/* ═══════════════════ Hero ═══════════════════ */

function HeroSection() {
  return (
    <section id="overview" className="relative pb-20 pt-8">
      {/* Top nav */}
      <PageContainer>
        <nav className="flex items-center justify-between py-6">
          <a
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#667078] transition-colors duration-300 hover:text-[#F4F7F8]"
            href={appPath("/#projects")}
          >
            <ArrowLeft className="h-4 w-4" />
            BACK TO PROJECTS
          </a>
          <span className="hidden text-[13px] font-medium uppercase tracking-[0.28em] text-[#667078] sm:inline">
            Neeko Wu
          </span>
        </nav>
      </PageContainer>

      {/* Hero content */}
      <PageContainer className="mt-12 md:mt-20">
        <FadeInSection>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#667078]">
            Written Test Projects · 笔试设计题
          </p>
          <h1 className="mt-5 text-[clamp(2.8rem,6.5vw,5.5rem)] font-black leading-[1.02] tracking-tight text-[#F4F7F8]">
            笔试设计作品集
          </h1>
          <p className="mt-6 max-w-3xl text-[clamp(1rem,1.5vw,1.25rem)] font-light leading-[1.7] text-[#A8B1B8]">
            收录求职过程中完成的笔试设计题，覆盖 AI 体验设计、商品详情页改版、IP 角色系统等方向。每道题目从需求拆解出发，经过策略推导，落地为完整的设计方案。
          </p>
        </FadeInSection>
      </PageContainer>
    </section>
  );
}

/* ═══════════════════ Individual Project Section ═══════════════════ */

function ProjectSection({ project }: { project: TestProject }) {
  const [pdfError, setPdfError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const setRef = useCallback((node: HTMLElement | null) => {
    sectionRef.current = node;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(node);
  }, []);

  return (
    <section
      id={project.id}
      className="relative py-20 md:py-32"
      ref={setRef}
    >
      {/* Decorative top line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <PageContainer>
        <FadeInSection>
          {/* Label row */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#667078]">
            {project.company} · Written Test
          </p>

          {/* Title */}
          <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.5rem)] font-black leading-[1.08] tracking-tight text-[#F4F7F8]">
            {project.title}
          </h2>

          {/* Subtitle */}
          <p className="mt-4 max-w-3xl text-[15px] font-light leading-[1.7] text-[#A8B1B8]">
            {project.subtitle}
          </p>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.12] px-3 py-1.5 text-[12px] font-medium text-[#A8B1B8]"
              >
                {tag}
              </span>
            ))}
          </div>
        </FadeInSection>

        {/* PDF Viewer */}
        <FadeInSection className="mt-10">
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 shadow-2xl">
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-5 py-3">
              <div className="flex items-center gap-2.5">
                <FileText className="h-4 w-4 text-[#667078]" />
                <span className="text-sm font-medium text-[#A8B1B8]">
                  {project.title}.pdf
                </span>
              </div>
              <a
                href={project.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-[#667078] transition-colors hover:bg-white/[0.06] hover:text-[#F4F7F8]"
              >
                新窗口打开
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* PDF embed — lazy loaded */}
            {!pdfError ? (
              <div className="relative w-full" style={{ height: "clamp(500px, 75vh, 900px)" }}>
                {isVisible ? (
                  <iframe
                    src={`${project.pdfPath}#toolbar=0&navpanes=0`}
                    className="h-full w-full"
                    title={project.englishTitle}
                    onError={() => setPdfError(true)}
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-20">
                <FileText className="h-12 w-12 text-[#667078]/50" />
                <p className="text-sm text-[#667078]">
                  PDF 预览不可用，请点击上方按钮在新窗口打开
                </p>
              </div>
            )}
          </div>
        </FadeInSection>
      </PageContainer>
    </section>
  );
}

import { useEffect, lazy, Suspense } from "react";
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

const Lanyard = lazy(() => import("./lanyard/Lanyard"));
const yearlyAsset = (filename: string) => assetPath(`assets/yearly-recap-2023/${filename}`);

const projectMeta: [string, string][] = [
  ["Timeline", "2023.10 — 2024.01"],
  ["Role", "盘点页视觉风格定义"],
  ["Scope", "情感化数据叙事 / 视觉系统 / AIGC SOP / 分享传播"],
];

const pillNavItems: PillNavItem[] = [
  { label: "概览", href: "#overview" },
  { label: "调研", href: "#research" },
  { label: "探索", href: "#explore" },
  { label: "视觉", href: "#visual" },
  { label: "AIGC", href: "#aigc" },
  { label: "成果", href: "#result" },
  { label: "回顾", href: "#reflection" },
];

export default function YearlyRecapCaseDetail() {
  useEffect(() => {
    document.title = "美团外卖年度账单 2023 — Neeko Wu";
  }, []);

  return (
    <main className="relative isolate min-h-screen overflow-x-clip bg-[#050505] pb-28 text-[#F4F7F8]">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,221,0,0.08),transparent_28%),radial-gradient(circle_at_80%_12%,rgba(255,221,0,0.06),transparent_30%),linear-gradient(180deg,#050505_0%,#090807_48%,#050505_100%)]" />
      <div className="relative z-10">
        <HeroSection />
        <OverviewSection />
        <ResearchSection />
        <ExploreSection />
        <VisualSection />
        <AigcSection />
        <ResultSection />
        <ReflectionSection />
        <BackToProjects />
        <PillNav items={pillNavItems} projectSlug="yearly-recap-2023" />
      </div>
    </main>
  );
}

/* ─── Hero ─── */
function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0804] via-60% to-[#3d3000]" />
      <div className="pointer-events-auto absolute inset-y-0 right-0 z-20 hidden w-[55%] lg:block">
        <Suspense fallback={null}>
          <Lanyard position={[0, 0, 8.5]} gravity={[0, -40, 0]} fov={30} />
        </Suspense>
      </div>
      <PageContainer className="relative flex min-h-[85vh] flex-col justify-center py-20" wide>
        <FadeInSection className="mb-10">
          <a
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#A8B1B8] transition-colors duration-300 hover:text-[#FFDD00]"
            href={appPath("/#projects")}
          >
            <ArrowLeft size={14} />
            返回所有项目
          </a>
        </FadeInSection>
        <FadeInSection>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FFDD00]">
            FOUR · Yearly recap
          </p>
          <h1 className="mt-5 max-w-[640px] text-[clamp(3rem,7vw,6.2rem)] font-black leading-[1.02] tracking-normal text-[#F4F7F8]">
            美团外卖
            <br />
            年度账单 2023
          </h1>
          <p className="mt-6 max-w-[560px] text-[clamp(1rem,1.45vw,1.22rem)] font-light leading-[1.75] text-[#c8c0ad]">
            以「我的外卖记忆」为核心叙事，把用户一年里的消费数据转译成可分享的个人标签，并用 AIGC 场景生成与品牌元素合成完成多主题盘点页与分享页视觉方案。
          </p>
          <dl className="mt-8 grid max-w-[600px] gap-5 border-t border-[#FFDD00]/10 pt-7 text-sm text-[#c8c0ad] sm:grid-cols-3">
            {projectMeta.map(([label, value]) => (
              <div key={label}>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a7d5a]">{label}</dt>
                <dd className="mt-2 leading-relaxed">{value}</dd>
              </div>
            ))}
          </dl>
        </FadeInSection>
      </PageContainer>
    </section>
  );
}

/* ─── 概览：设计目标总览 ─── */
function OverviewSection() {
  return (
    <section id="overview">
      {/* 主视觉大图 */}
      <div className="w-full">
        <img alt="美团外卖年度账单 2023 主视觉" className="block w-full" src={assetPath("yearly-recap-hero.webp")} />
      </div>

      <PageContainer className="py-16" wide>
        <FadeInSection>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FFDD00]">
            Design objective
          </p>
          <h2 className="mt-4 text-[28px] font-black text-[#F4F7F8]">
            设计目标
          </h2>
          <p className="mt-4 max-w-[720px] text-[15px] leading-relaxed text-[#A8B1B8]">
            在存量竞争下，年度账单不只是资产盘点——它需要强化用户与美团外卖的情感连接，并激发分享传播。
          </p>
        </FadeInSection>

        {/* 设计目标&思路 — 结构化表格 */}
        <FadeInSection>
          <div className="mt-10 space-y-6">
            {/* 设计目标 */}
            <div className="rounded-2xl border border-[#FFDD00]/[0.08] bg-gradient-to-r from-[#FFDD00]/[0.08] to-[#FFDD00]/[0.02] px-6 py-4">
              <p className="text-[12px] font-medium text-[#A8B1B8]">设计目标</p>
              <p className="mt-1 text-[16px] font-semibold text-[#F4F7F8]">促成分享传播，提高美团外卖影响力</p>
            </div>

            {/* 关键策略 + 关键动作 */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* 左列：挖掘用户关键时刻 */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <p className="text-[12px] font-medium text-[#A8B1B8]">关键策略</p>
                <p className="mt-2 text-[15px] font-semibold leading-snug text-[#F4F7F8]">挖掘用户关键时刻 & 引起传播度</p>
                <div className="mt-5 border-t border-white/[0.06] pt-4">
                  <p className="text-[12px] font-medium text-[#A8B1B8]">关键动作</p>
                  <div className="mt-3 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFDD00]/20 text-[11px] font-bold text-[#FFDD00]">1</span>
                      <p className="text-[14px] leading-relaxed text-[#c8c0ad]">玩法方式调研 & 思考，挖掘用户关键时刻</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFDD00]/20 text-[11px] font-bold text-[#FFDD00]">2</span>
                      <p className="text-[14px] leading-relaxed text-[#c8c0ad]">分享形式调研 & 思考，引起传播</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右列：有创新度的视觉方案设计 */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <p className="text-[12px] font-medium text-[#A8B1B8]">关键策略</p>
                <p className="mt-2 text-[15px] font-semibold leading-snug text-[#F4F7F8]">有创新度的视觉方案设计</p>
                <div className="mt-5 border-t border-white/[0.06] pt-4">
                  <p className="text-[12px] font-medium text-[#A8B1B8]">关键动作</p>
                  <div className="mt-3 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFDD00]/20 text-[11px] font-bold text-[#FFDD00]">1</span>
                      <p className="text-[14px] leading-relaxed text-[#c8c0ad]">视觉风格调研</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFDD00]/20 text-[11px] font-bold text-[#FFDD00]">2</span>
                      <p className="text-[14px] leading-relaxed text-[#c8c0ad]">方案探索 & 沟通</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFDD00]/20 text-[11px] font-bold text-[#FFDD00]">3</span>
                      <p className="text-[14px] leading-relaxed text-[#c8c0ad]">视觉语言统一</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFDD00]/20 text-[11px] font-bold text-[#FFDD00]">4</span>
                      <p className="text-[14px] leading-relaxed text-[#c8c0ad]">AIGC 应用</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFDD00]/20 text-[11px] font-bold text-[#FFDD00]">5</span>
                      <p className="text-[14px] leading-relaxed text-[#c8c0ad]">方案设计</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </PageContainer>
    </section>
  );
}

/* ─── 调研：玩法调研 + 分享形式调研 ─── */
function ResearchSection() {
  return (
    <CaseSection
      accentColor="text-[#FFDD00]"
      eyebrow="01 洞察调研"
      id="research"
      intro="通过对年度盘点产品的玩法调研和分享形式分析，明确用户真正愿意传播的核心：被精准说中的生活瞬间和可被朋友接住的人格标签。"
      title="用户愿意分享的是「被说中」的瞬间"
    >
      <MediaSlot
        kind="wide"
        src={yearlyAsset("research-play.webp")}
        title="玩法调研"
      />
      <MediaSlot
        kind="wide"
        src={yearlyAsset("research-share.webp")}
        title="分享形式调研"
      />
    </CaseSection>
  );
}

/* ─── 探索：照片风格难点 + 方案方向 ─── */
function ExploreSection() {
  return (
    <CaseSection
      accentColor="text-[#FFDD00]"
      eyebrow="02 方案探索"
      id="explore"
      intro="确定照片风格后面临质量要求高、时间紧张、需要避免像广告等挑战，最终选择 AIGC 微缩摄影方向作为解决方案。"
      title="从照片难点到 AIGC 微缩摄影"
    >
      {/* 照片风格设计难点 → 解决思路（代码绘制） */}
      <FadeInSection>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
          <p className="text-[13px] font-semibold text-[#F4F7F8]">照片风格设计难点</p>
          <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-stretch">
            {/* 左侧：三个难点 */}
            <div className="flex flex-1 flex-col gap-3">
              {[
                { title: "质量要求较高", desc: "照片要表达出文案的内容，且有代入感、且好看" },
                { title: "时间紧张", desc: "照片需拍摄+找素材结合的方式，前期等素材会消耗大部分时间" },
                { title: "需要避免像广告", desc: "照片通常在广告场景应用较多" },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-4 backdrop-blur-sm">
                  <p className="text-[14px] font-semibold text-[#F4F7F8]">{item.title}</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#A8B1B8]">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* 中间：箭头 */}
            <div className="flex shrink-0 items-center justify-center px-2">
              <div className="flex flex-col items-center gap-2 sm:flex-col">
                <p className="text-[11px] font-medium text-[#A8B1B8]">解决思路</p>
                <svg className="h-5 w-8 text-[#A8B1B8] sm:h-5 sm:w-8" fill="currentColor" viewBox="0 0 32 20"><path d="M20 0l12 10-12 10V14H0V6h20V0z"/></svg>
              </div>
            </div>

            {/* 右侧：两个解决方案 */}
            <div className="flex flex-1 flex-col gap-3">
              <div className="flex-1 rounded-xl border border-[#FFDD00]/20 bg-gradient-to-br from-[#FFDD00]/[0.12] to-[#FFDD00]/[0.03] p-4">
                <p className="text-[14px] font-bold text-[#FFDD00]">AIGC</p>
                <p className="mt-1 text-[12px] leading-relaxed text-[#c8c0ad]">利用 AIGC 工具生成图片，节省时间，且效果好</p>
              </div>
              <div className="flex-1 rounded-xl border border-[#FFDD00]/20 bg-gradient-to-br from-[#FFDD00]/[0.12] to-[#FFDD00]/[0.03] p-4">
                <p className="text-[14px] font-bold text-[#FFDD00]">视觉创意</p>
                <p className="mt-1 text-[12px] leading-relaxed text-[#c8c0ad]">通过有创意的视觉表现形式，做到有趣、有代入感，避免像广告</p>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      <MediaSlot
        kind="wide"
        src={yearlyAsset("aigc-exploration.webp")}
        title="三个方案方向对比"
      />
    </CaseSection>
  );
}

/* ─── 视觉：风格调研 + 语言统一 ─── */
function VisualSection() {
  return (
    <CaseSection
      accentColor="text-[#FFDD00]"
      eyebrow="03 视觉系统"
      id="visual"
      intro="从手绘、矢量、3D、大卡大字、照片五大风格方向收敛，确定温暖光感微缩摄影方向，并建立品牌元素、美食时光、万物到家的统一视觉语言。"
      title="从风格调研到视觉语言统一"
    >
      <MediaSlot
        kind="wide"
        src={yearlyAsset("visual-style-research.webp")}
        title="视觉风格调研"
      />
      <MediaSlot
        kind="wide"
        src={yearlyAsset("visual-language-system.webp")}
        title="视觉语言统一"
      />
    </CaseSection>
  );
}

/* ─── AIGC 应用：模块拆解 + 风格定义 + 设计流程 + 完整流程 ─── */
function AigcSection() {
  return (
    <CaseSection
      accentColor="text-[#FFDD00]"
      eyebrow="04 AIGC 应用"
      id="aigc"
      intro="AIGC 负责生成氛围和场景，品牌符号、数据小票和阅读层级由设计侧合成校准。通过模块拆解、Prompt 定义和流程规范，实现可控的品牌化批量生成。"
      title="可控的品牌化 AIGC 生成流程"
    >
      <MediaSlot
        kind="wide"
        src={yearlyAsset("aigc-layer-breakdown.webp")}
        title="画面模块拆解"
      />
      <MediaSlot
        kind="wide"
        src={yearlyAsset("aigc-prompt-style.webp")}
        title="Prompt 风格定义"
      />
      <MediaSlot
        kind="wide"
        src={yearlyAsset("aigc-design-process.webp")}
        title="设计流程"
      />
      <MediaSlot
        kind="wide"
        src={yearlyAsset("aigc-full-process.jpg")}
        title="AIGC 完整流程展示"
      />
    </CaseSection>
  );
}

/* ─── 成果：分享页 + 动效 + 全部页面 ─── */
function ResultSection() {
  return (
    <CaseSection
      accentColor="text-[#FFDD00]"
      eyebrow="05 设计成果"
      id="result"
      intro="最终产出包括全部分享页矩阵、分享页明信片样式拆解、产品页面总览以及各页面动效。"
      title="从分享页到全流程产出"
    >
      <MediaSlot
        kind="wide"
        src={yearlyAsset("share-page-matrix.webp")}
        title="全部分享页方案"
      />
      <MediaSlot
        kind="wide"
        src={yearlyAsset("other-recap-pages.webp")}
        title="分享页明信片样式"
      />
      <MediaSlot
        kind="wide"
        src={yearlyAsset("recap-screens-overview.jpg")}
        title="产品页面总览"
      />

      {/* 动效展示 — 放大为 3 列 */}
      <FadeInSection>
        <div className="mt-2">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FFDD00]">
            Motion showcase
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="overflow-hidden rounded-2xl bg-black/40 ring-1 ring-white/[0.06]">
                <video
                  autoPlay
                  className="block w-full"
                  loop
                  muted
                  playsInline preload="metadata"
                  src={yearlyAsset(`motion-scene-0${n}.mp4`)}
                />
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      <MediaSlot
        kind="wide"
        src={yearlyAsset("all-pages-showcase.jpg")}
        title="All Design"
      />
    </CaseSection>
  );
}

/* ─── 回顾 ─── */
function ReflectionSection() {
  return (
    <CaseSection
      accentColor="text-[#FFDD00]"
      eyebrow="06 项目回顾"
      id="reflection"
      intro="项目沉淀的不只是一次年度账单视觉，而是一套可迁移到其他用户盘点类项目的方法。"
      title="沉淀可复用的方法"
    >
      {/* 方法论卡片 */}
      <FadeInSection>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: "🎭",
              label: "数据人格化",
              desc: "年度账单的主角不是数据，而是用户的一年生活。数据只有被翻译成用户愿意认领的时刻，才会变成分享动机。",
            },
            {
              icon: "🤖",
              label: "AIGC 定位",
              desc: "AIGC 不是替代设计判断，而是放大可控生产能力。场景生产交给工具，风格判断和品牌一致性交回设计系统。",
            },
            {
              icon: "📤",
              label: "分享页设计",
              desc: "分享页要同时承担情绪、阅读和品牌识别。用户转发因为它像自己，品牌被看见靠稳定的符号和信息层级。",
            },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-[#FFDD00]/[0.08] bg-gradient-to-br from-[#FFDD00]/[0.04] to-transparent p-6">
              <span className="text-2xl">{item.icon}</span>
              <p className="mt-4 text-[14px] font-semibold text-[#F4F7F8]">{item.label}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#A8B1B8]">{item.desc}</p>
            </div>
          ))}
        </div>
      </FadeInSection>

      {/* 个人收获 */}
      <FadeInSection>
        <div className="mt-8 rounded-2xl border border-[#FFDD00]/[0.08] bg-[#FFDD00]/[0.02] p-6 sm:p-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#FFDD00]/80">个人收获</p>
          <p className="mt-4 text-[15px] leading-[1.8] text-[#c8c0ad]">
            这是我实习期间参与的第一个完整大型项目。作为辅助设计师，我负责盘点页面的视觉风格探索，从前期 moodboard 收集到微缩景观方向的提案都有深度参与。过程中学到了如何在品牌约束下做风格发散，也第一次体验了 AIGC 融入设计流程的真实协作模式——工具负责产出效率，设计师负责品质判断和品牌一致性把控。
          </p>
        </div>
      </FadeInSection>
    </CaseSection>
  );
}

/* ─── Utilities ─── */
function BackToProjects() {
  return (
    <FadeInSection>
      <div className="mx-auto flex max-w-6xl justify-center px-6 py-24 md:px-16">
        <a
          className="group inline-flex items-center gap-3 rounded-full border border-white/[0.12] px-8 py-4 text-[14px] font-medium text-[#A8B1B8] transition-colors duration-300 hover:border-[#FFDD00]/50 hover:text-[#F4F7F8]"
          href={appPath("/#projects")}
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          返回所有项目
        </a>
      </div>
    </FadeInSection>
  );
}

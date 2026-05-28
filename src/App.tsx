import React, { lazy, Suspense, useEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import PortfolioLanding, {
  getProjectCoverImages,
  getProjectEnglishCategory,
  getProjectEnglishTitle,
  getProjectLink,
  getProjectName,
  getProjectTitleLines,
  projectCards,
} from "./components/PortfolioLanding";
import { appPath, stripBasePath } from "./utils/assetPath";

const InstantRetailCaseDetail = lazy(() => import("./components/InstantRetailCaseDetail"));
const DailyLowPriceCaseDetail = lazy(() => import("./components/DailyLowPriceCaseDetail"));
const EmotionalDesignCaseDetail = lazy(() => import("./components/EmotionalDesignCaseDetail"));
const PinhaofanGrowthCaseDetail = lazy(() => import("./components/PinhaofanGrowthCaseDetail"));
const YearlyRecapCaseDetail = lazy(() => import("./components/YearlyRecapCaseDetail"));
type ProjectCard = (typeof projectCards)[number];

const projectRoutePrefix = "/project/";
const instantRetailPath = "/project/instant-retail-redesign";
const dailyLowPricePath = "/project/daily-low-price";
const emotionalDesignPath = "/project/emotional-design";
const pinhaofanGrowthPath = "/project/pinhaofan-growth";
const yearlyRecapPath = "/project/yearly-recap-2023";
export default function App() {
  const pathname = stripBasePath(window.location.pathname);

  if (pathname.startsWith(projectRoutePrefix)) {
    const project = projectCards.find((item) => getProjectLink(item) === pathname);

    if (!project) {
      return <ProjectNotFoundPage />;
    }

    const caseComponents: Record<string, React.ReactNode> = {
      [instantRetailPath]: <InstantRetailCaseDetail />,
      [dailyLowPricePath]: <DailyLowPriceCaseDetail />,
      [emotionalDesignPath]: <EmotionalDesignCaseDetail />,
      [pinhaofanGrowthPath]: <PinhaofanGrowthCaseDetail />,
      [yearlyRecapPath]: <YearlyRecapCaseDetail />,
    };

    const caseComponent = caseComponents[getProjectLink(project)];
    if (caseComponent) {
      return <Suspense fallback={<CaseLoadingFallback />}>{caseComponent}</Suspense>;
    }

    return (
      <ProjectPlaceholderPage
        index={projectCards.indexOf(project)}
        project={project}
      />
    );
  }

  return <PortfolioLanding />;
}

function ProjectPlaceholderPage({
  project,
  index,
}: {
  project: ProjectCard;
  index: number;
}) {
  const projectImages = getProjectCoverImages(project);
  const projectName = getProjectName(project);
  const projectTitleLines = getProjectTitleLines(project);

  useEffect(() => {
    document.title = `${projectName} -- Neeko Wu`;
  }, [projectName]);

  return (
    <main className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8 md:px-10">
        <a
          className="inline-flex items-center gap-2 text-sm font-medium tracking-[0.2em] text-[#D7E2EA]/75 transition-colors duration-200 hover:text-[#D7E2EA]"
          href={appPath("/#projects")}
        >
          <ArrowLeft className="h-4 w-4" />
          返回项目
        </a>
        <a
          className="hidden text-sm font-medium uppercase tracking-[0.28em] text-[#D7E2EA]/55 transition-colors duration-200 hover:text-[#D7E2EA] sm:inline"
          href={appPath("/")}
        >
          Neeko Wu
        </a>
      </nav>

      <section className="mx-auto grid min-h-[calc(var(--vh)*100-88px)] max-w-7xl gap-10 px-5 pb-16 pt-8 sm:px-8 md:px-10 lg:grid-cols-[minmax(0,0.94fr)_minmax(360px,0.56fr)] lg:items-center lg:gap-14">
        <div className="min-w-0">
          <p className="text-sm font-medium uppercase tracking-[0.32em] text-[#D7E2EA]/55">
            {String(index + 1).padStart(2, "0")} / 05
            <span className="ml-3">{getProjectEnglishCategory(project)}</span>
          </p>
          <h1 className="hero-heading text-keep mt-6 text-[clamp(3.25rem,10vw,8.5rem)] font-black uppercase leading-[0.95] tracking-tight">
            {projectTitleLines.map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-5 max-w-2xl text-sm font-medium uppercase tracking-[0.24em] text-[#D7E2EA]/55 sm:text-base">
            {getProjectEnglishTitle(project)}
          </p>
          <div className="mt-10 max-w-2xl border-t border-[#D7E2EA]/20 pt-8">
            <h2 className="text-[clamp(1.8rem,3.6vw,3.25rem)] font-black leading-tight">
              案例详情页正在整理中
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-[#D7E2EA]/68 sm:text-lg">
              后续会补充项目背景、设计策略、关键页面和结果复盘。当前先保留独立入口，确保作品结构完整、链接路径清晰。
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex min-w-[168px] items-center justify-center gap-3 whitespace-nowrap rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10"
              href={appPath("/#projects")}
            >
              返回作品
            </a>
            <a
              className="inline-flex min-w-[168px] items-center justify-center gap-3 whitespace-nowrap rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10"
              href={appPath("/#contact")}
            >
              联系沟通
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid gap-4">
          <img
            alt={`${projectName} 详情页视觉占位`}
            className="aspect-[4/5] w-full rounded-[36px] border-2 border-[#D7E2EA] object-cover sm:rounded-[48px]"
            src={projectImages[2]}
          />
          <div className="grid grid-cols-2 gap-4">
            {projectImages.slice(0, 2).map((image, imageIndex) => (
              <img
                alt={`${projectName} 预览 ${imageIndex + 1}`}
                className="aspect-[4/3] w-full rounded-[28px] border border-[#D7E2EA]/45 object-cover sm:rounded-[36px]"
                key={image}
                src={image}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function CaseLoadingFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0C0C0C]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D7E2EA]/20 border-t-[#D7E2EA]/70" />
        <span className="text-sm font-light tracking-widest text-[#D7E2EA]/50">
          加载中...
        </span>
      </div>
    </main>
  );
}

function ProjectNotFoundPage() {
  useEffect(() => {
    document.title = "项目未找到 -- Neeko Wu";
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0C0C0C] px-5 text-center text-[#D7E2EA]">
      <section className="max-w-xl">
        <p className="text-sm font-medium uppercase tracking-[0.32em] text-[#D7E2EA]/55">
          Project Not Found
        </p>
        <h1 className="mt-5 text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-none">
          项目暂未找到
        </h1>
        <a
          className="mt-10 inline-flex items-center justify-center gap-3 rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium tracking-widest transition-colors duration-200 hover:bg-[#D7E2EA]/10"
          href={appPath("/#projects")}
        >
          <ArrowLeft className="h-4 w-4" />
          返回项目
        </a>
      </section>
    </main>
  );
}

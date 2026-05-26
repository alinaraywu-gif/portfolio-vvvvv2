import {
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowLeft } from "lucide-react";
import { flashsaleProjectImages } from "../data/flashsaleProjectImages";
import {
  FadeInSection,
  PageContainer,
  CaseSection,
  PillNav,
  PhoneMockup,
  ImagePlaceholder,
  type PillNavItem,
} from "./shared";
import LiquidEther from "./LiquidEther";
import FallingText from "./FallingText";
import { appPath, assetPath } from "../utils/assetPath";

/* ═══════════════════ Types ═══════════════════ */

type ResultMetric = { bar?: number; detail?: string; label: string; tone?: "neutral" | "stable" | "up"; value: string };
type ResultReviewItem = { action: string; meaning: string; metrics: ResultMetric[]; result: string; title: string };
type ProblemInsight = { body: string; evidence: string; opportunity?: string; title: string };

/* ═══════════════════ Asset paths ═══════════════════ */

const A = assetPath("assets/instant-retail/");
const imageAsset = (path: string) => assetPath(`images/${path}`);
const assets = {
  before: { home: `${A}before-home.webp`, supermarket: `${A}before-supermarket.webp`, merchant: `${A}before-merchant.webp`, produce: `${A}before-produce.webp`, digital: `${A}before-digital.webp`, flower: `${A}before-flower.webp` },
  v2: { couponGuide: `${A}v2-coupon-guide.mp4`, flower: `${A}v2-flower.webp`, home: `${A}v2-home.webp`, ipCouponGuide: `${A}v2-ip-coupon-guide.mp4`, ipFreeGift: `${A}v2-ip-free-gift.mp4`, ipGreetingCard: `${A}v2-ip-greeting-card.webp`, ipNegativeFeedback: `${A}v2-ip-negative-feedback.mp4`, ipNewuserBarrage: `${A}v2-ip-newuser-barrage.mp4`, ipNewuserGuide: `${A}v2-ip-newuser-guide.mp4`, ipOlduserGuide: `${A}v2-ip-olduser-guide.mp4`, ipOlduserMigrate: `${A}v2-ip-olduser-migrate.mp4`, ipOrderMind: `${A}v2-ip-order-mind.mp4`, ipProcess: `${A}v2-ip-process.webp`, ipPullrefresh: `${A}v2-ip-pullrefresh.mp4`, ipRushPopup: `${A}v2-ip-rush-popup.mp4`, ipSubnav: `${A}v2-ip-subnav.mp4`, mall: `${A}v2-mall.webp`, merchant: `${A}v2-merchant.webp`, resultReview: `${A}v2-result-review.jpg`, supermarket: `${A}v2-supermarket.webp` },
  v3: { doubleProductCard: `${A}v3-double-product-card.webp`, homeCoupon: `${A}v3-home-coupon.webp`, homeLowPrice: `${A}v3-home-low-price.webp`, homeSubsidy: `${A}v3-home-subsidy.webp`, iconBeauty: `${A}v3-icon-beauty.webp`, iconDigital: `${A}v3-icon-digital.webp`, iconExploreGlass: `${A}v3-icon-explore-glass-1.webp`, iconExploreJelly: `${A}v3-icon-explore-jelly-1.webp`, iconFlower: `${A}v3-icon-flower.webp`, iconMerchant: `${A}v3-icon-merchant.webp`, iconProduce: `${A}v3-icon-produce.webp`, iconSupermarket: `${A}v3-icon-supermarket.webp`, merchantCard: `${A}v3-merchant-card.webp`, resultReview: `${A}v3-result-review.jpg`, singleProductCard: `${A}v3-single-product-card.webp` },
};

/* ═══════════════════ Data ═══════════════════ */

const heroVersions = [
  { image: assets.before.home, subtitle: "用户对闪购认知有限", version: "1.0" },
  { image: assets.v2.home, subtitle: "让用户认识闪购", version: "2.0" },
  { image: assets.v3.homeCoupon, subtitle: "帮用户高效购买", version: "3.0" },
];

const projectMeta: [string, string][] = [
  ["Timeline", "2024 — 2025"],
  ["Role", "UI/UX Designer"],
  ["Scope", "首页改版 / 用户认知 / 信息架构 / 购买效率"],
];

const heroSignals = [
  { label: "迭代阶段", value: "1.0 → 3.0", note: "认知建立到效率提升" },
  { label: "履约心智", value: "30min", note: "即时零售核心承诺" },
  { label: "交易结果", value: "+2.7%", note: "3.0 整体订单量" },
];

const bgKeywords: { label: string; value: string }[] = [
  { label: "业务定位", value: "闪购是美团旗下的即时零售平台，承诺 30 分钟送达，覆盖超市便利、鲜花绿植、数码美妆、宠物母婴等多品类。" },
  { label: "用户来源", value: "大部分用户从美团外卖进入闪购首页，日常购物需求主要集中在食品和日用品补货。" },
  { label: "当前阶段", value: "闪购正在从外卖的子频道向独立即时零售入口升级，首页需要承接品类拓展和心智建设的战略目标。" },
];

const businessOverviewItems = [
  { label: "即时零售", value: "30min", note: "履约心智" },
  { label: "入口来源", value: "外卖", note: "高频流量" },
  { label: "品类拓展", value: "多品类", note: "非食品增长" },
];

const caseFlowSteps = [
  { body: "业务要拓宽即时零售心智，用户当前认知集中在食品日百的应急补货。", label: "1.0", title: "业务冲突" },
  { body: "2.0 的核心任务是让用户知道闪购能买什么、从哪里逛、为什么可信，用信息架构和视觉系统重建认知。", label: "2.0", title: "认知重建" },
  { body: "复盘验证认知方向有效，同时指向新的效率课题：用户认识了闪购，浏览和购买判断还需要进一步提速。", label: "Review", title: "数据转折" },
  { body: "3.0 聚焦转化效率，把优惠、价格、商品卡和差异化动线前置到用户更容易行动的位置。", label: "3.0", title: "效率提升" },
];

/* --- 2.0 Problem --- */

const originalProblems: ProblemInsight[] = [
  {
    title: "品类认知窄",
    evidence: "首页首屏的金刚位全部给了食品日百，导航栏缺少非食品品类入口，页面结构强化了单一品类印象。",
    body: "用户不知道闪购还能买鲜花、数码、美妆、母婴——这是认知层面的缺失，需要在首页第一屏就建立完整的品类心智。",
  },
  {
    title: "场景表达弱",
    evidence: "非食品品类虽然有入口，但视觉权重低、场景感弱，用户看到了也联想不到「现在就能买到」。",
    body: "平台已有的供给能力没有被转译成用户能理解的购买场景——页面在「说」，但用户没「听懂」。",
  },
  {
    title: "独立心智缺失",
    evidence: "首页视觉风格与外卖频道高度雷同，缺少独立的品牌色彩、图标和语言体系，用户无法形成差异化记忆。",
    body: "用户用完即走、下次不会主动回来——首页缺少让人「记住闪购」的品牌化表达和独立识别。",
  },
];

/* --- 2.0 Goal --- */

const v2BusinessGoals = [
  { label: "业务目标", value: "首页改版后，用户能在首屏感知到完整的品类服务范围，并形成独立的即时零售心智。" },
  { label: "用户目标", value: "进入首页后快速回答三个问题：能买什么、从哪里开始逛、为什么可以放心买。" },
];

const v2DesignGoals = [
  { response: "强化品类和频道入口，让多品类能力在首屏附近被看见。", title: "看得懂", userNeed: "用户需要快速知道闪购能买什么。" },
  { response: "重构首页浏览路径，让品类、商家、商品形成从认知到决策的顺序。", title: "找得到", userNeed: "用户需要知道从哪里开始逛。" },
  { response: "强化品牌好店、商家识别和品质感表达，让非熟悉品类也有可信入口。", title: "愿意信", userNeed: "用户需要判断在哪买更可靠。" },
];

const v3IconShowcase = [
  { src: assets.v3.iconSupermarket, title: "超市便利" },
  { src: assets.v3.iconDigital, title: "数码电器" },
  { src: assets.v3.iconBeauty, title: "美妆个护" },
  { src: assets.v3.iconFlower, title: "鲜花绿植" },
  { src: assets.v3.iconProduce, title: "生鲜果蔬" },
  { src: assets.v3.iconMerchant, title: "品质商家" },
];

/* --- IP 品牌体系 --- */

const IP = `${A}ip-scenes/`;
const ipAssets = {
  scenes: {
    supermarket: `${IP}scene-01-supermarket.webp`,
    digital: `${IP}scene-02-digital.webp`,
    flowers: `${IP}scene-03-flowers.webp`,
    baby: `${IP}scene-baby.webp`,
    beauty: `${IP}scene-beauty.webp`,
    companion: `${IP}scene-companion.webp`,
    cool: `${IP}scene-cool.webp`,
    produce: `${IP}scene-produce.webp`,
    quality: `${IP}scene-quality.webp`,
    romance: `${IP}scene-romance.webp`,
    smartLife: `${IP}scene-smart-life.webp`,
    supermarketAlt: `${IP}scene-supermarket.webp`,
  },
};

const ipDesignActions = [
  {
    title: "角色形象设计",
    desc: "以闪购购物袋为原型，经过剪影筛选、3D 建模和 200+ 轮表情迭代，确立「小闪」的标志性特征：大眼睛、微笑、购物袋耳朵——圆润、温暖、活力。",
    detail: "",
    images: [
      { src: `${A}v2-mascot-keywords.webp`, label: "关键词定义" },
      { src: `${A}v2-mascot-style-research.webp`, label: "风格调研" },
      { src: `${A}v2-mascot-iterations.webp`, label: "过程方案" },
      { src: `${A}v2-mascot-candidates.webp`, label: "典型方案" },
    ],
  },
  {
    title: "表情与动作库",
    desc: "覆盖正向、中性、负向情绪的 60+ 基础表情和 20+ 全身动作，按情绪维度分类归档，配合动效参数标注。",
    detail: "用 IP 表情替代系统弹窗和冷冰冰的加载状态，在新人引导、优惠提醒、异常反馈等关键触点注入温度。",
    imageSrc: `${A}v2-expression-library.webp`,
  },
  {
    title: "品类场景延展",
    desc: "让「小闪」进入超市、鲜花、数码、美妆等不同品类场景，为每个品类定制专属的场景插画和内容资产。",
    detail: "统一 3D 风格和配色体系，通过道具、服装和环境差异建立品类区分度，最终输出 12 套品类场景资产，把品类认知串成整体品牌记忆。",
    imageSrc: `${A}v2-scene-showcase.webp`,
  },
];

const ipSystemSpecs = [
  { label: "造型规范", desc: "购物袋轮廓比例、耳朵角度、眼睛间距、微笑弧度等基础结构定义。" },
  { label: "色彩规范", desc: "主体黄 #FFD700、高光白、阴影暖灰，不同场景下的色彩适配规则。" },
  { label: "表情规范", desc: "按情绪维度（正向 / 中性 / 负向）分类，每个表情标注适用场景和情绪强度。" },
  { label: "动效规范", desc: "入场、待机、交互反馈三类动效，统一缓动曲线和时长参数。" },
  { label: "尺寸适配", desc: "从 24px 图标到全屏 Banner 的多尺寸输出规范，确保各尺寸下可识别。" },
  { label: "场景延展", desc: "品类场景的构图模板、道具库和配色映射规则，支持快速生产新品类资产。" },
];

const ipSpecImages = [
  imageAsset("ip-specs/spec-1.webp"),
  imageAsset("ip-specs/spec-2.webp"),
  imageAsset("ip-specs/spec-3.webp"),
  imageAsset("ip-specs/spec-4.webp"),
  imageAsset("ip-specs/spec-5.webp"),
  imageAsset("ip-specs/spec-6.webp"),
];

const ipAppScenes = {
  brandMind: {
    title: "品牌心智建立",
    desc: "通过首页金刚区、频道入口和活动 Banner，让「小闪」成为闪购的视觉代言。",
    items: [
      { src: imageAsset("ip-brand-mind-gif-small.mp4"), title: "IP 通用展示", type: "video" as const },
      { src: imageAsset("ip-brand-mind-video.mp4"), title: "超级品牌动效", type: "video" as const },
      { src: imageAsset("ip-brand-mind-video2.mp4"), title: "商家频道 IP 露出", type: "video" as const },
      { src: imageAsset("ip-brand-mind-1.webp"), title: "品类频道 IP 场景", type: "image" as const },
      { src: imageAsset("ip-brand-mind-2.webp"), title: "品类频道 IP 延展", type: "image" as const },
    ],
  },
  emotionalTouch: {
    title: "情感链接触点",
    desc: "在用户旅程的关键时刻——新人引导、下单成功、优惠提醒、异常反馈——用 IP 动效替代系统弹窗，建立情感连接。",
    /* 按用户旅程路径排列：首次进入 → 日常使用 → 转化促进 → 异常安抚 → 沉默召回 */
    items: [
      { src: assets.v2.ipNewuserGuide, title: "新用户引导", type: "video" as const },
      { src: assets.v2.ipOlduserGuide, title: "老用户引导", type: "video" as const },
      { src: assets.v2.ipPullrefresh, title: "下拉刷新", type: "video" as const },
      { src: assets.v2.ipNewuserBarrage, title: "新用户弹幕", type: "video" as const },
      { src: assets.v2.ipCouponGuide, title: "优惠券引导", type: "video" as const },
      { src: assets.v2.ipRushPopup, title: "抢购弹窗", type: "video" as const },
      { src: assets.v2.ipOrderMind, title: "订单心智", type: "video" as const },
      { src: assets.v2.ipFreeGift, title: "免费领", type: "video" as const },
      { src: assets.v2.ipOlduserMigrate, title: "老用户迁移", type: "video" as const },
      { src: assets.v2.ipNegativeFeedback, title: "负反馈安抚", type: "video" as const },
    ],
  },
};

/* --- 2.0 Design Actions — 按问题/目标分组 --- */

type V2ActionGroup = {
  problem: string;
  goal: string;
  goalKeyword: string;
  strategy: string;
  actions: { title: string; body: string; detail?: string; imageSrc?: string; imageExtra?: string; images?: { src: string; label: string }[]; imagePlaceholder?: string; navScrollImage?: string; imageGroup?: { label: string; before?: { src?: string; label: string }[]; after?: { src?: string; label: string }[] }[] }[];
  beforeScreens: { src?: string; label: string }[];
  afterScreens: { src?: string; label: string }[];
  flowScreens?: { src?: string; label: string }[];
};

const v2ActionGroups: V2ActionGroup[] = [
  {
    problem: "品类认知窄",
    goal: "看得懂",
    goalKeyword: "用户需要快速知道闪购能买什么",
    strategy: "通过信息架构重组和金刚入口重设计，把多品类能力前置到首屏第一层认知。",
    actions: [
      { title: "首页信息架构重组", body: "将默认心智 Banner、品类导航、主题商家区按用户认知路径重新排布，首屏优先回答「闪购能买什么」。", detail: "品类导航和主题商家区优先承担心智建立，先展示服务范围，再进入商品浏览和转化。", imageSrc: `${A}v2-home-architecture.webp` },
      { title: "品类金刚入口重设计", body: "重绘 3D 风格品类金刚 icon，从食品日百扩展到鲜花、数码、美妆、母婴等全品类入口，视觉权重均等化。", detail: "用真实材质、体积感和统一风格提升入口辨识度，让每个品类都有平等的被发现机会。", imageSrc: `${A}v2-category-icons.webp` },
    ],
    beforeScreens: [
      { src: `${A}v2-before-home.webp`, label: "改版前 · 首页首屏（金刚位以食品日百为主）" },
    ],
    afterScreens: [
      { src: `${A}v2-after-home.webp`, label: "改版后 · 首页首屏（多品类金刚入口）" },
    ],
    flowScreens: [
      { src: `${A}v2-flow-tab-selected.mp4`, label: "选中精选 Tab" },
      { src: `${A}v2-flow-tab-unselected.mp4`, label: "未选中状态浏览" },
      { src: `${A}v2-flow-tab-switch.mp4`, label: "其他楼层点击精选" },
    ],
  },
  {
    problem: "场景表达弱",
    goal: "找得到",
    goalKeyword: "用户需要知道从哪里开始逛",
    strategy: "按品类决策方式设计差异化动线，让不同品类的用户都能找到匹配自己决策习惯的浏览路径。",
    actions: [
      { title: "分品类差异化决策动线", body: "超市果蔬看商家、数码美妆看品牌、鲜花看商品——按用户真正比较的维度拆分浏览路径。", detail: "重商家决策以商家信任驱动，重品牌决策以品牌墙驱动，重商品决策以商品视觉驱动。", imageGroup: [
        { label: "重商家动线（超市便利频道）", before: [
          { src: `${A}v2-merchant-vegfruit-before.webp`, label: "蔬菜水果 · 改版前" },
          { src: `${A}v2-merchant-supermarket-before.webp`, label: "大型超市 · 改版前" },
        ], after: [
          { src: `${A}v2-merchant-vegfruit-after.webp`, label: "蔬菜水果 · 改版后" },
          { src: `${A}v2-merchant-supermarket-after.webp`, label: "大型超市 · 改版后" },
        ] },
        { label: "重品牌动线（数码美妆频道）", before: [
          { src: `${A}v2-brand-before.webp`, label: "品质百货 · 改版前" },
        ], after: [
          { src: `${A}v2-brand-digital-after.webp`, label: "手机数码 · 改版后" },
          { src: `${A}v2-brand-beauty-after.webp`, label: "美妆个护 · 改版后" },
        ] },
        { label: "重商品动线（鲜花频道）", before: [
          { src: `${A}v2-flower-before.webp`, label: "鲜花频道 · 改版前" },
        ], after: [
          { src: `${A}v2-flower-after-1.webp`, label: "鲜花频道 · 改版后（首屏）" },
          { src: `${A}v2-flower-after-2.webp`, label: "鲜花频道 · 改版后（列表）" },
        ] },
      ] },
      { title: "商家频道场景化改造", body: "将纯列表式商家展示改为场景化入口，融入直梯概念做品类跳转，传递即时感。", detail: "用户像逛商场楼层一样快速定位目标品类商家。", navScrollImage: `${A}v2-merchant-nav.webp`, imageGroup: [
        { label: "附近商家", before: [
          { src: `${A}v2-merchant-nearby-before.webp`, label: "附近商家 · 改版前" },
        ], after: [
          { src: `${A}v2-merchant-nearby-after.webp`, label: "附近商家 · 改版后" },
        ] },
      ] },
      { title: "品类特色子导航，贴近品类心智", body: "用品类对应的视觉容器与心智颜色结合，提升品类频道个性。", detail: "将襁褓作为容器强化母婴品类特征，用品类专属色彩和图形元素让用户一眼识别频道属性。", images: [
        { src: `${A}v2-subnav-baby-screen.webp`, label: "母婴用品 · 品类页" },
        { src: `${A}v2-subnav-baby-ip.webp`, label: "母婴用品 · 襁褓容器强化品类特征" },
        { src: `${A}v2-subnav-beauty-screen.webp`, label: "美妆个护 · 品类页" },
        { src: `${A}v2-subnav-beauty-ip.webp`, label: "美妆个护 · 镜子与美妆台强化品类特征" },
        { src: `${A}v2-subnav-flower-screen.webp`, label: "鲜花 · 品类页" },
        { src: `${A}v2-subnav-flower-ip.webp`, label: "鲜花 · 花束容器强化品类特征" },
        { src: `${A}v2-subnav-switch-demo.mp4`, label: "子导航切换效果" },
      ] },
    ],
    beforeScreens: [],
    afterScreens: [],
  },
  {
    problem: "独立心智缺失",
    goal: "愿意信",
    goalKeyword: "用户需要判断在哪买更可靠",
    strategy: "建立统一的品牌视觉语言和品质感表达，让闪购从「外卖子频道」升级为独立可信的即时零售品牌。",
    actions: [
      { title: "闪购品牌色彩体系", body: "在美团黄基础上偏移 5° 提炼闪购黄 #FFE000，为不同品类建立专属心智色。", detail: "闪购黄、品质金、浪漫粉、科技紫、生活蓝、新鲜绿——加上营销色彩治理规则。", images: [
        { src: `${A}v2-color-category-minds.webp`, label: "品类心智色" },
        { src: `${A}v2-color-marketing-governance.webp`, label: "营销色彩治理" },
        { src: `${A}v2-color-spec-detail.webp`, label: "取色范围 · 配色参考 · 背景图形" },
      ] },
      { title: "页面品质感重塑", body: "引入流光渐变、玻璃质感和 3D icon，脱离旧版超市氛围，让用户联想到商场而非超市。", detail: "经历冷色方案和强渐变方案的尝试后，确立「精细、自然流转、品牌活动感」方向。", imageSrc: `${A}v2-quality-redesign.webp` },
      { title: "商场化品牌信任体系", body: "融入品牌墙概念，让品牌 logo 阵列和品牌好店入口成为用户信任锚点。", detail: "将线下商场的空间逻辑（品牌墙、橱窗、楼层导航）映射到线上信息架构。", imageSrc: `${A}v2-brand-trust-system.webp`, imageExtra: `${A}v2-pages-overview.webp` },
    ],
    beforeScreens: [],
    afterScreens: [],
    flowScreens: [],
  },
];

/* --- 2.0 Result --- */

const v2ResultItems: ResultReviewItem[] = [
  { action: "2.0 对首页结构、金刚入口、频道视觉和多品类表达进行了系统升级，保留核心购买路径。", meaning: "改版延续了用户原有购买习惯。", metrics: [{ label: "DAU", value: "稳定", detail: "护栏指标稳定", tone: "stable" }, { label: "CXR", value: "稳定", detail: "护栏指标稳定", tone: "stable" }, { label: "订单 / GMV", value: "稳定", detail: "护栏指标稳定", tone: "stable" }], result: "DAU、CXR、订单量以及支付 GMV 保持稳定。", title: "大盘交易保持稳定" },
  { action: "强化业务名称、金刚入口和多品类露出。", meaning: "用户开始从应急入口，转向理解闪购的服务价值。", metrics: [{ label: "品牌认知", value: "送得快", detail: "服务心智建立", tone: "up", bar: 70 }], result: "用户初步认知闪购是送得快的服务。", title: "品牌认知初步建立" },
  { action: "通过频道视觉和首页内容结构，强化多品类感知。", meaning: "用户开始把闪购理解为食品日百之外的多品类即时零售入口。", metrics: [{ label: "非食品订单占比", value: "有提升", detail: "多品类心智增强", tone: "up", bar: 68 }, { label: "团搜进首页 DAU", value: "显著提升", detail: "活动期间", tone: "up", bar: 82 }], result: "非食品订单占比有提升；团搜进首页 DAU 显著提升。", title: "品类心智开始建立" },
  { action: "重构金刚入口展示方式，承担品类理解和购买记忆。", meaning: "金刚入口开始承担用户对品类和服务的记忆。", metrics: [{ label: "次日复访", value: "有提升", detail: "较原渠道", tone: "up", bar: 62 }, { label: "复购率", value: "持续提升", detail: "趋势向上", tone: "up", bar: 74 }], result: "金刚渠道复访率提升；复购率持续提升。", title: "金刚入口心智建立" },
];

const v2KeyMetrics: ResultMetric[] = [
  { label: "大盘护栏", value: "稳定", detail: "DAU / CXR / GMV 无异动", tone: "stable" },
  { label: "非食品订单", value: "有提升", detail: "多品类心智建立", tone: "up", bar: 68 },
  { label: "金刚复购", value: "持续提升", detail: "入口购买记忆增强", tone: "up", bar: 74 },
];

const v2ReviewSummary = {
  positive: "2.0 的核心验证是：DAU、CXR、订单和 GMV 护栏保持稳定，用户对闪购的服务认知、多品类理解和金刚入口记忆开始增强。",
  remaining: "新的问题也变清楚了：用户已经开始认识闪购，部分楼层 CTR、横向导航使用率、二屏浏览占比和人均楼层数说明购买判断还需要提速，下一阶段应从「认知建立」转向「效率提升」。",
};

const v2RemainingMetrics: ResultMetric[] = [
  { label: "楼层 CTR", value: "9.5%", tone: "neutral", bar: 36 },
  { label: "横向导航", value: "30.1%", tone: "neutral", bar: 58 },
  { label: "二屏浏览", value: "50%", tone: "neutral", bar: 72 },
  { label: "人均楼层", value: "1.68", tone: "neutral", bar: 42 },
];

/* --- 3.0 Problem (from v2 remaining) --- */

const v3Problems: ProblemInsight[] = [
  {
    title: "优惠感知不够确定",
    evidence: "弹窗、频道、商品标签、商家卡片各自承接，用户需要主动找券和可用商家。",
    body: "优惠入口分散，用户从看到优惠到用上优惠之间缺少连续路径。",
    opportunity: "把每日神价、神券商家、国家补贴收敛成首页锚点，并由 Tab、提示条、商家卡连续承接。",
  },
  {
    title: "商品判断成本偏高",
    evidence: "选店、找券、比价之间产生多次跳转，价格、优惠、履约信息不够集中。",
    body: "首页仍偏向先选店，用户很难直接判断哪个商品值得点。",
    opportunity: "重排商品卡层级，把图、价、利、送、买变成扫读时的主要判断线索。",
  },
  {
    title: "品类容器不够匹配",
    evidence: "高客单、凑单、逛感品类需要看的信息不同，单一容器难以同时承接。",
    body: "不同品类的决策方式不同，统一商品流降低了每一屏的信息效率。",
    opportunity: "按品类匹配单列商品卡、商家卡、双列商品卡，让每类商品用更适合的方式被比较。",
  },
  {
    title: "金刚区识别效率低",
    evidence: "入口数量多、面积小，统一性和点击吸引力有限，用户第一眼判断成本偏高。",
    body: "金刚区要同时承担品类识别、视觉吸引和导流入口，但旧图标不够清晰。",
    opportunity: "重绘品类金刚，强化材质、体积和品类符号，提升入口辨识度与点击意愿。",
  },
];

/* --- 3.0 Goal --- */

const v3BusinessGoals = [
  { label: "业务目标", value: "突出优惠活动感知，让找优惠路径更短；优化首页选购动线，提升首页转化与订单增长。" },
  { label: "用户目标", value: "让用户快速买到多品类、看到很多优惠，并轻松完成找优惠、用优惠、下单购买。" },
];

const v3DesignGoals = ["建立确定优惠感知", "提升商品决策效率", "适配品类决策容器", "强化金刚区导流"];

/* --- 3.0 Strategy --- */

const v3StrategyItems = [
  {
    body: "将每日神价、神券商家、国家补贴收敛到首页第一层，形成明确的优惠入口。",
    caption: "看到优惠",
    eyebrow: "01",
    title: "先让优惠被看见",
  },
  {
    body: "把价格、利益点、履约和购买按钮前置到商品卡，让用户直接判断值不值得点。",
    caption: "判断商品",
    eyebrow: "02",
    title: "用商品信息驱动点击",
  },
  {
    body: "数码美妆需要看清参数和价格，超市果蔬更适合先看店和凑单，鲜花潮玩更适合双列浏览比较。",
    caption: "匹配品类",
    eyebrow: "03",
    title: "不同品类，用不同展示方式",
  },
  {
    body: "重绘品类金刚，用材质、体积和统一风格强化第一眼识别，提升入口点击意愿。",
    caption: "快速进入",
    eyebrow: "04",
    title: "用金刚视觉强化导流",
  },
];

/* --- 3.0 Design Actions --- */

type V3ActionVisualSlot = {
  eyebrow?: string;
  label: string;
  note?: string;
  src?: string;
};

type V3ActionMediaItem = { src: string; label: string; type?: "image" | "video" };
type V3ActionSection = {
  body: string;
  eyebrow: string;
  images?: V3ActionMediaItem[];
  mediaLayout?: "phone-row" | "video-row" | "board";
  title: string;
};

type V3Action = {
  action: string;
  change: string;
  points?: { body: string; eyebrow: string; title: string }[];
  problem: string;
  sections?: V3ActionSection[];
  strategy: string;
  title: string;
  visual: {
    hint: string;
    slots: V3ActionVisualSlot[];
    title: string;
    type: "flow" | "beforeAfter" | "matrix";
    images?: V3ActionMediaItem[];
  };
};

const v3Actions: V3Action[] = [
  {
    action: "把三类优惠收敛到首屏附近，并用频道 Tab、提示条、弹窗回流和商家列表连续承接。",
    change: "首页先回答「哪里有优惠」，再把用户带到可用商品和可用商家。",
    sections: [
      {
        body: "把每日神价、神券商家、国家补贴集中到首页首屏附近，让用户进入首页先看到优惠，再判断要不要继续逛。",
        eyebrow: "A",
        mediaLayout: "phone-row",
        title: "优惠在首屏露出",
        images: [
          { src: imageAsset("v3-coupon-tab1.webp"), label: "每日神价", type: "image" },
          { src: imageAsset("v3-coupon-tab2.webp"), label: "神券商家", type: "image" },
          { src: imageAsset("v3-coupon-tab3.webp"), label: "国家补贴", type: "image" },
        ],
      },
      {
        body: "用户点击弹窗、关闭弹窗或直接进入首页后，都能回到明确的优惠入口，并继续进入神券商家和可用券商家列表。",
        eyebrow: "B",
        mediaLayout: "video-row",
        title: "优惠入口继续承接",
        images: [
          { src: imageAsset("v3-coupon-use.mp4"), label: "点击红包去使用", type: "video" },
          { src: imageAsset("v3-coupon-close.mp4"), label: "点击关闭弹窗", type: "video" },
        ],
      },
    ],
    problem: "优惠散在不同触点里，用户进首页后不确定从哪里开始找优惠。",
    strategy: "策略 01 · 先让优惠被看见",
    title: "首屏露出优惠，让用户知道从哪找",
    visual: {
      hint: "",
      slots: [],
      title: "优惠动线",
      type: "flow",
      images: [
        { src: imageAsset("v3-coupon-tab1.webp"), label: "每日神价", type: "image" },
        { src: imageAsset("v3-coupon-tab2.webp"), label: "神券商家", type: "image" },
        { src: imageAsset("v3-coupon-tab3.webp"), label: "国家补贴", type: "image" },
        { src: imageAsset("v3-coupon-use.mp4"), label: "点击红包去使用", type: "video" },
        { src: imageAsset("v3-coupon-close.mp4"), label: "点击关闭弹窗", type: "video" },
      ],
    },
  },
  {
    action: "把商品图、到手价、优惠标签、履约信息和购买按钮前置，弱化无关跳转。",
    change: "商品卡从“展示信息”变成“给出点击理由”，用户扫一张卡就能判断值不值得点。",
    problem: "商品卡里的价格、优惠、配送和按钮不够集中，用户需要反复比较。",
    strategy: "策略 02 · 用商品信息驱动点击",
    title: "商品卡从展示卡变成判断卡",
    visual: {
      hint: "",
      slots: [],
      title: "商家模块迁移与商品卡强化",
      type: "beforeAfter",
      images: [
        { src: imageAsset("v3-product-card-migrate.webp"), label: "商家模块迁移方案", type: "image" },
        { src: imageAsset("v3-product-card-before-after.webp"), label: "商品卡信息层级优化", type: "image" },
      ],
    },
  },
  {
    action: "把数码美妆、超市果蔬、鲜花潮玩分别放进更合适的展示样式：单列商品卡、商家卡和双列商品卡。",
    change: "用户看到的信息更贴近当前品类的购买方式，比较和下单都更直接。",
    problem: "不同品类要看的信息不同，用同一种商品流展示会让重点变模糊。",
    strategy: "策略 03 · 不同品类，用不同展示方式",
    title: "按商品类型换展示方式",
    visual: {
      hint: "",
      slots: [],
      title: "品类容器矩阵",
      type: "matrix",
      images: [
        { src: imageAsset("v3-category-containers.webp"), label: "单列商品卡 / 商家卡片 / 双列商品卡", type: "image" },
      ],
    },
  },
  {
    action: "重绘品类金刚，用真实材质、体积感、统一光影和明确品类符号强化入口识别。",
    change: "金刚区从功能入口升级为品类识别入口，帮助用户更快决定点哪里。",
    problem: "金刚入口数量多、面积小，旧图标辨识度和点击吸引力都有限。",
    strategy: "策略 04 · 用金刚视觉强化导流",
    title: "金刚区从入口变成品类识别",
    visual: {
      hint: "",
      slots: [],
      title: "金刚区视觉对比",
      type: "beforeAfter",
      images: [
        { src: imageAsset("v3-jingang-overview.webp"), label: "新金刚视觉整体展示", type: "image" },
        { src: imageAsset("v3-jingang-before-after.webp"), label: "Before / After 对比", type: "image" },
      ],
    },
  },
];

/* --- 3.0 Result --- */

const v3ResultItems: ResultReviewItem[] = [
  { action: "将每日神价、神券商家、国家补贴聚合成首页高权重优惠入口，并用频道 Tab 和提示条连续承接。", meaning: "用户更早看到优惠，更顺畅地进入优惠转化路径。", metrics: [{ label: "神价曝光→进店", value: "提升", detail: "优惠入口承接增强", tone: "up", bar: 74 }, { label: "神价订单占比", value: "提升", detail: "优惠成交增强", tone: "up", bar: 68 }], result: "神价曝光到进店转化率提升，神价订单占比提升。", title: "优惠感知闭环被验证" },
  { action: "重排商品卡信息层级，强化商品图、到手价、优惠标签、履约信息和购买按钮。", meaning: "商品从信息展示单元升级为购买判断单元。", metrics: [{ label: "商品判断", value: "更直接", detail: "图价利送买前置", tone: "up", bar: 70 }, { label: "商品转化", value: "提升", detail: "浏览到点击更顺", tone: "up", bar: 66 }], result: "用户判断成本降低，商品转化提升。", title: "商品信息驱动点击" },
  { action: "按品类心智匹配单列商品卡、商家卡和双列商品卡，承接高客单、凑单和逛感需求。", meaning: "不同品类进入更匹配的浏览和决策容器。", metrics: [{ label: "非食品订单", value: "显著提升", detail: "容器适配承接新品类", tone: "up", bar: 84 }, { label: "中低频用户订单", value: "增长", detail: "长尾人群被激活", tone: "up", bar: 72 }], result: "中低频用户订单增长，非食品订单显著提升。", title: "品类容器提升承接效率" },
  { action: "重绘品类金刚，统一风格、材质纹理和体积感，提升入口识别和品类第一眼判断。", meaning: "视觉升级开始承担品类导流和品牌资产沉淀。", metrics: [{ label: "金刚入口", value: "强化", detail: "品类识别和点击意愿提升", tone: "up", bar: 62 }, { label: "视觉资产", value: "沉淀", detail: "多品类金刚统一输出", tone: "stable" }], result: "金刚区从功能入口升级为品类心智入口，为后续多品类扩展提供统一视觉资产。", title: "金刚区视觉导流强化" },
  { action: "优惠、商品、品类容器和视觉入口共同收敛到首页选购动线。", meaning: "3.0 把首页从认知展示推进到高效购买。", metrics: [{ label: "整体订单量", value: "+2.7%", detail: "核心交易结果", tone: "up", bar: 80 }, { label: "未下单用户订单", value: "增长", detail: "新转化被激活", tone: "up", bar: 66 }], result: "整体订单量提升 +2.7%，未下单用户订单增长。", title: "整体效率提升，订单增长" },
];

const v3KeyMetrics: ResultMetric[] = [
  { label: "整体订单量", value: "+2.7%", detail: "核心交易指标正向增长", tone: "up", bar: 80 },
  { label: "神价曝光→进店", value: "提升", detail: "优惠前置缩短转化路径", tone: "up", bar: 74 },
  { label: "中低频用户订单", value: "增长", detail: "沉默用户被重新激活", tone: "up", bar: 72 },
  { label: "非食品商品订单", value: "显著提升", detail: "品类宽度心智持续增强", tone: "up", bar: 84 },
  { label: "找店用户承接", value: "待优化", detail: "国庆高峰期商家路径不足", tone: "neutral", bar: 38 },
];

const v3ReviewSummary = {
  positive: "整体订单量 +2.7%，神价转化提升，中低频和未下单用户被激活，非食品订单显著增长；优惠、商品卡、品类容器和金刚视觉共同证明首页选购效率提升。",
  nextSteps: "国庆期间找店意图用户大幅增加，但首页以商品维度为主，商家路径承接不足。后续将强化商家维度的个性化承接，同时继续探索新品类增长策略，让首页适配不同阶段、不同意图用户的购买路径。",
};

/* --- Reflection --- */

const reflectionPoints = [
  { title: "首页设计要跟着业务阶段变化", body: "2.0 重点是让用户知道闪购能买什么，3.0 重点变成让用户更快下单。同一个首页在不同阶段承担的任务不同，设计判断也要从「讲清楚」逐步推进到「促成行动」。" },
  { title: "购买路径比单个模块更重要", body: "优惠、商品卡、品类入口都不是孤立模块。这个项目让我更明确地用「看见优惠 → 判断商品 → 进入匹配品类 → 下单」来组织页面，而不是只优化某一个局部组件。" },
  { title: "视觉可以承担决策效率", body: "金刚图标、商品图、价格条和优惠标签不只是风格表达，它们会影响用户第一眼识别和比较速度。即时零售的视觉需要同时服务吸引力、品类判断和购买决策。" },
  { title: "数据复盘是下一轮设计的入口", body: "复盘不只是验证方案有效与否，更重要的是发现新的用户意图。2.0 的数据证明认知有效，也指向 3.0 的效率问题；结果数据本身会成为下一轮设计命题。" },
];

/* --- PillNav --- */

const detailNavItems: PillNavItem[] = [
  { label: "背景", href: "#background" },
  { label: "2.0 问题", href: "#v2-problem" },
  { label: "2.0 设计", href: "#v2-actions" },
  { label: "品牌化", href: "#ip-showcase" },
  { label: "2.0 复盘", href: "#v2-review" },
  { label: "3.0 问题", href: "#v3-problem" },
  { label: "3.0 设计", href: "#v3-strategy" },
  { label: "3.0 复盘", href: "#v3-review" },
  { label: "回顾", href: "#reflection" },
];

/* ═══════════════════ Helpers ═══════════════════ */

/** Intersection-observed counter that animates value in once visible. */
function AnimateOnView({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
        filter: vis ? "blur(0)" : "blur(10px)",
        transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/** Metric bar row with animated bar */
function MetricBarRow({ m, delay = 0 }: { m: ResultMetric; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const barColor = m.tone === "up" ? "#FFDD00" : m.tone === "stable" ? "#667078" : "#A8B1B8";
  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[13px] text-[#A8B1B8]">{m.label}</span>
        <span className="font-mono-data text-[15px] font-semibold text-[#F4F7F8]">{m.value}</span>
      </div>
      {m.bar != null && (
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full"
            style={{
              width: `${m.bar}%`,
              background: barColor,
              transform: vis ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: `transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
            }}
          />
        </div>
      )}
      {m.detail && <p className="text-[11px] text-[#667078]">{m.detail}</p>}
    </div>
  );
}

/** Big highlight number */
function BigNumber({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  return (
    <AnimateOnView delay={delay} className="text-center">
      <p className="font-mono-data text-[clamp(3rem,8vw,5.5rem)] font-black leading-none tracking-tight text-[#FFDD00]">
        {value}
      </p>
      <p className="mt-3 text-[13px] font-medium text-[#A8B1B8]">{label}</p>
    </AnimateOnView>
  );
}

/** Surface card wrapper */
function SurfaceCard({ children, className = "", glow = false }: { children: ReactNode; className?: string; glow?: boolean }) {
  return (
    <div className={`${glow ? "glow-card" : "surface-card"} rounded-[24px] p-8 md:p-10 ${className}`}>
      {children}
    </div>
  );
}

/** Media wrapper with image-reveal animation */
function RevealImage({ src, alt = "", className = "" }: { src: string; alt?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`overflow-hidden rounded-[20px] ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="block w-full"
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "scale(1)" : "scale(0.96)",
          filter: vis ? "blur(0)" : "blur(18px)",
          transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </div>
  );
}

/** Video with reveal */
function RevealVideo({ src, className = "" }: { src: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`overflow-hidden rounded-[20px] ${className}`}>
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline preload="metadata"
        className="block w-full"
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "scale(1)" : "scale(0.96)",
          filter: vis ? "blur(0)" : "blur(18px)",
          transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </div>
  );
}

/* ═══════════════════ Main Export ═══════════════════ */

export default function InstantRetailCaseDetail() {
  useEffect(() => { document.title = "美团闪购改版 — Neeko Wu"; }, []);
  return (
    <main className="relative isolate min-h-screen overflow-x-clip bg-[#050608] pb-28 text-[#F4F7F8]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0 h-screen w-screen opacity-[0.18]">
        <LiquidEther
          colors={["#FFDD00", "#FFE8A0", "#FFDD00"]}
          style={{ width: '100%', height: '100%' }}
          mouseForce={12}
          cursorSize={80}
          isViscous={true}
          viscous={30}
          iterationsViscous={16}
          iterationsPoisson={16}
          resolution={0.3}
          isBounce={false}
          dt={0.014}
          BFECC={true}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={1.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      <div className="relative z-10">
        <ProjectHero />
        <CaseFlowSection />
        <BackgroundSection />
        <V2ProblemSection />
        <V2GoalSection />
        <V2ActionsSection />
        <IPShowcaseSection />
        <V2ResultSection />
        <V2ReviewSection />
        <TransitionSection />
        <V3ProblemSection />
        <V3GoalSection />
        <V3StrategySection />
        <V3ActionsSection />
        <V3ShowcaseSection />
        <V3ResultSection />
        <V3ReviewSection />
        <ReflectionSection />
        {/* Easter egg — Falling Text */}
        <section className="bg-[#050608] pb-[clamp(80px,12vw,160px)]">
          <PageContainer>
            <FadeInSection delay={200}>
              <div className="h-[400px] rounded-2xl border border-white/[0.06] bg-[#0A0C10]/60 backdrop-blur-sm overflow-hidden">
                <FallingText
                  text="🚀 闪购改版 从1.0到3.0 📦 经历了用户认知重建 🧠 信息架构优化 📐 购买效率提升 ⚡ 三个阶段 设计不只是视觉 🎨 更是对用户行为的深度理解 💡 感谢阅读 🙌 hope you enjoyed it ✨"
                  highlightWords={["闪购改版", "认知重建", "信息架构", "购买效率", "设计", "用户行为", "enjoyed"]}
                  highlightClass="highlighted"
                  trigger="scroll"
                  backgroundColor="transparent"
                  wireframes={false}
                  gravity={0.56}
                  fontSize="1.5rem"
                  mouseConstraintStiffness={0.9}
                />
              </div>
              <p className="mt-6 text-center text-[11px] text-[#667078]/60">
                ↑ 试试用鼠标拖拽文字
              </p>
              <div className="mt-8 text-center">
                <a
                  href={appPath("/")}
                  className="inline-flex items-center gap-2 text-[14px] font-medium text-[#FFDD00] transition-opacity duration-300 hover:opacity-70"
                >
                  <ArrowLeft size={14} />
                  返回作品集
                </a>
              </div>
            </FadeInSection>
          </PageContainer>
        </section>
        <PillNav items={detailNavItems} projectSlug="instant-retail-redesign" />
      </div>
    </main>
  );
}

/* ═══════════════════ 00 HERO — Strong Visual Cover ═══════════════════ */

function ProjectHero() {
  const [activeIdx, setActiveIdx] = useState(1);

  return (
    <section className="relative min-h-screen overflow-hidden" id="project-top">
      {/* Top glow line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFDD00]/40 to-transparent" />
      {/* Radial glow behind hero */}
      <div className="pointer-events-none absolute left-1/2 top-[30%] h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFDD00]/[0.04] blur-[120px]" />

      <PageContainer className="relative flex min-h-screen flex-col justify-center pt-20 pb-24">
        {/* Back link */}
        <FadeInSection className="mb-12">
          <a
            href={appPath("/")}
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#667078] transition-colors duration-300 hover:text-[#FFDD00]"
          >
            <ArrowLeft size={14} />
            Back to projects
          </a>
        </FadeInSection>

        {/* Hero title */}
        <FadeInSection>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FFDD00]">
            Meituan Instant Retail
          </p>
          <h1 className="mt-5 max-w-[900px] text-[clamp(3rem,7.5vw,6rem)] font-black leading-[1.02] tracking-tight text-[#F4F7F8]">
            美团闪购
            <br />
            <span className="text-[#A8B1B8]">首页改版</span>
          </h1>
          <p className="mt-6 max-w-[600px] text-[clamp(1rem,1.5vw,1.25rem)] font-light leading-[1.7] text-[#A8B1B8]">
            从用户认知建立到购买效率提升——跨三个版本的闪购首页体验迭代。
          </p>
        </FadeInSection>

        {/* Signal metrics row */}
        <FadeInSection delay={200} className="mt-14">
          <div className="flex flex-wrap gap-10 md:gap-16">
            {heroSignals.map((s) => (
              <div key={s.label}>
                <p className="font-mono-data text-[clamp(2rem,4vw,3rem)] font-black tracking-tight text-[#FFDD00]">
                  {s.value}
                </p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">
                  {s.label}
                </p>
                <p className="mt-1 text-[13px] text-[#A8B1B8]">{s.note}</p>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* Project meta */}
        <FadeInSection delay={350} className="mt-12">
          <div className="flex flex-wrap gap-8">
            {projectMeta.map(([k, v]) => (
              <div key={k}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">
                  {k}
                </p>
                <p className="mt-1 text-[15px] text-[#A8B1B8]">{v}</p>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* Version phones row */}
        <FadeInSection delay={500} className="mt-20">
          <div className="grid grid-cols-3 gap-6 md:gap-10">
            {heroVersions.map((v, i) => (
              <button
                key={v.version}
                onClick={() => setActiveIdx(i)}
                className={`group relative text-left transition-opacity duration-500 ${i === activeIdx ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
              >
                <PhoneMockup src={v.image} alt={v.subtitle} size="sm" />
                <div className="mt-4 text-center">
                  <p className="font-mono-data text-[13px] font-bold text-[#FFDD00]">{v.version}</p>
                  <p className="mt-1 text-[12px] text-[#667078]">{v.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </FadeInSection>
      </PageContainer>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050608] to-transparent" />
    </section>
  );
}

/* ═══════════════════ 01 Case Flow — Sticky Scroll Storytelling ═══════════════════ */

function CaseFlowSection() {
  return (
    <section className="bg-[#080A0D] py-[clamp(80px,12vw,180px)]">
      <PageContainer>
        <FadeInSection>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">Case Flow</p>
          <h2 className="mt-5 text-[clamp(1.875rem,4.2vw,3.25rem)] font-black leading-[1.08] tracking-tight text-[#F4F7F8]">
            项目脉络
          </h2>
        </FadeInSection>
        <div className="mt-16 grid gap-6 md:grid-cols-4">
          {caseFlowSteps.map((s, i) => (
            <FadeInSection key={s.label} delay={i * 120}>
              <SurfaceCard className="h-full">
                <p className="font-mono-data text-[28px] font-black text-[#FFDD00]">{s.label}</p>
                <h3 className="mt-3 text-[18px] font-bold text-[#F4F7F8]">{s.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[#A8B1B8]">{s.body}</p>
              </SurfaceCard>
            </FadeInSection>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

/* ═══════════════════ 02 Background ═══════════════════ */

function BackgroundSection() {
  return (
    <CaseSection id="background" eyebrow="Background" title="业务背景" intro="闪购的业务定位、用户来源和当前所处的发展阶段。">
      {/* Business overview metrics */}
      <FadeInSection>
        <div className="grid gap-6 md:grid-cols-3">
          {businessOverviewItems.map((item, i) => (
            <SurfaceCard key={item.label}>
              <p className="font-mono-data text-[clamp(2rem,4vw,2.75rem)] font-black text-[#FFDD00]">{item.value}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">{item.label}</p>
              <p className="mt-1 text-[13px] text-[#A8B1B8]">{item.note}</p>
            </SurfaceCard>
          ))}
        </div>
      </FadeInSection>

      {/* Background keywords */}
      <FadeInSection delay={150}>
        <div className="mt-10 space-y-6">
          {bgKeywords.map((kw) => (
            <SurfaceCard key={kw.label}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FFDD00]">{kw.label}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#A8B1B8]">{kw.value}</p>
            </SurfaceCard>
          ))}
        </div>
      </FadeInSection>

      {/* 1.0 Before screens — 6 images in a single row */}
      <FadeInSection delay={250}>
        <p className="mt-16 mb-8 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">
          1.0 现状截图
        </p>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-4">
          {Object.entries(assets.before).map(([key, src]) => (
            <div key={key} className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#0D1117]" style={{ aspectRatio: "750 / 1624" }}>
              <img src={src} alt={key} className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </FadeInSection>
    </CaseSection>
  );
}

/* ═══════════════════ 03 V2 Problem ═══════════════════ */

function V2ProblemSection() {
  return (
    <CaseSection id="v2-problem" eyebrow="2.0 · Problem" title="2.0 问题诊断" intro="基于上述业务现状，我们对首页进行了体验诊断，发现三个核心问题。" accentColor="text-[#FFDD00]">
      <div className="grid gap-6 md:grid-cols-3">
        {originalProblems.map((p, i) => (
          <FadeInSection key={p.title} delay={i * 100}>
            <SurfaceCard className="h-full">
              <p className="font-mono-data text-[13px] font-bold text-[#FFDD00]">
                0{i + 1}
              </p>
              <h3 className="mt-2 text-[18px] font-bold text-[#F4F7F8]">{p.title}</h3>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">观察证据</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#A8B1B8]">{p.evidence}</p>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">问题本质</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#A8B1B8]">{p.body}</p>
            </SurfaceCard>
          </FadeInSection>
        ))}
      </div>
    </CaseSection>
  );
}

/* ═══════════════════ 04 V2 Goal ═══════════════════ */

function V2GoalSection() {
  return (
    <CaseSection id="v2-goal" eyebrow="2.0 · Goal" title="2.0 设计目标" compact accentColor="text-[#FFDD00]">
      {/* Business & User goals */}
      <FadeInSection>
        <div className="grid gap-6 md:grid-cols-2">
          {v2BusinessGoals.map((g) => (
            <SurfaceCard key={g.label} glow>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FFDD00]">{g.label}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-[#A8B1B8]">{g.value}</p>
            </SurfaceCard>
          ))}
        </div>
      </FadeInSection>

      {/* Design goal cards */}
      <FadeInSection delay={150}>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {v2DesignGoals.map((g, i) => (
            <SurfaceCard key={g.title}>
              <p className="font-mono-data text-[32px] font-black text-[#FFDD00]">0{i + 1}</p>
              <h3 className="mt-2 text-[18px] font-bold text-[#F4F7F8]">{g.title}</h3>
              <p className="mt-2 text-[13px] text-[#667078]">{g.userNeed}</p>
              <div className="mt-4 h-px w-full bg-white/[0.06]" />
              <p className="mt-4 text-[14px] leading-relaxed text-[#A8B1B8]">{g.response}</p>
            </SurfaceCard>
          ))}
        </div>
      </FadeInSection>
    </CaseSection>
  );
}

/* ═══════════════════ 05 V2 Actions — Problem-Goal Grouped Layout ═══════════════════ */

/** Renders a single action group (one problem → one goal → actions + before/after) */
function V2ActionGroupBlock({ group, index }: { group: V2ActionGroup; index: number }) {
  return (
    <div className="mt-24 first:mt-0">
      <div className="relative pl-8 md:pl-12" style={{ borderLeft: "2px solid #FFDD0030" }}>
        {/* Accent dot */}
        <div className="absolute left-[-5px] top-0 h-[8px] w-[8px] rounded-full bg-[#FFDD00]" />

        {/* Group header: problem → goal */}
        <FadeInSection>
          <div className="relative">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#FFDD00]/10 px-3 py-1 text-[11px] font-semibold text-[#FFDD00]">
                问题 0{index + 1}
              </span>
              <span className="text-[13px] text-[#667078]">→</span>
              <span className="rounded-full bg-[#FFDD00]/10 px-3 py-1 text-[11px] font-semibold text-[#FFDD00]">
                目标：{group.goal}
              </span>
            </div>
            <h3 className="mt-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-black tracking-tight text-[#F4F7F8]">
              {group.problem}
            </h3>
            <p className="mt-2 text-[15px] font-medium text-[#A8B1B8]">{group.goalKeyword}</p>
            <p className="mt-4 max-w-[680px] text-[14px] leading-relaxed text-[#667078]">{group.strategy}</p>
          </div>
        </FadeInSection>

        {/* Divider */}
        <div className="mt-10 mb-10 h-px bg-white/[0.06]" />

        {/* Design actions */}
        <div className="space-y-16">
          {group.actions.map((action, ai) => (
            <FadeInSection key={action.title} delay={ai * 80}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#FFDD00] text-[13px] font-bold text-[#050608]">
                    {String.fromCharCode(65 + ai)}
                  </span>
                  <h4 className="text-[clamp(1.25rem,2.5vw,1.5rem)] font-bold text-[#F4F7F8]">
                    {action.title}
                  </h4>
                </div>
                <p className="max-w-[720px] text-[15px] leading-relaxed text-[#A8B1B8]">{action.body}</p>
                {action.detail && (
                  <p className="max-w-[720px] text-[13px] leading-relaxed text-[#667078]">{action.detail}</p>
                )}
                {action.imageGroup ? (
                  <div className="mt-6 space-y-10">
                    {action.imageGroup.map((subGroup) => {
                      const allImages = [...(subGroup.before || []), ...(subGroup.after || [])];
                      const hasImages = allImages.length > 0;
                      const hasNav = !!action.navScrollImage;
                      return (
                        <div key={subGroup.label} className="space-y-4">
                          <p className="text-[13px] font-semibold text-[#F4F7F8]">{subGroup.label}</p>
                          {hasImages ? (
                            <div className={`${hasNav ? "mx-auto grid max-w-[480px] grid-cols-[1fr_1fr_80px] gap-3" : `grid gap-3 ${allImages.length >= 4 ? "grid-cols-2 md:grid-cols-4" : allImages.length === 3 ? "grid-cols-3" : "grid-cols-2"} ${allImages.length <= 2 ? "mx-auto max-w-[480px]" : ""}`}`}>
                              {allImages.map((img) => (
                                <div key={img.label}>
                                  <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
                                    <img src={img.src} alt={img.label} className="aspect-[740/1602] w-full object-cover" loading="lazy" />
                                  </div>
                                  <p className="mt-2 text-center text-[11px] text-[#667078]">{img.label}</p>
                                </div>
                              ))}
                              {hasNav && (
                                <div className="hidden md:block">
                                  <div className="aspect-[740/1602] overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                                    <img
                                      src={action.navScrollImage}
                                      alt="品类导航"
                                      className="w-full animate-[navScroll_8s_ease-in-out_infinite]"
                                    />
                                  </div>
                                  <p className="mt-2 text-center text-[11px] text-[#667078]">品类导航</p>
                                </div>
                              )}
                            </div>
                          ) : (
                            <ImagePlaceholder label={subGroup.label} height="h-[280px]" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : action.images ? (
                  action.images.length > 3 ? (
                  <div className="mt-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      {action.images.filter(img => !img.src.endsWith(".mp4")).map((img, imgIdx) => (
                        <div key={imgIdx} className="space-y-2">
                          <div className="overflow-hidden rounded-xl">
                            <img src={img.src} alt={img.label} className="w-full object-cover" loading="lazy" />
                          </div>
                          <p className="text-center text-[11px] text-[#667078]">{img.label}</p>
                        </div>
                      ))}
                    </div>
                    {action.images.filter(img => img.src.endsWith(".mp4")).map((img, imgIdx) => (
                      <div key={`vid-${imgIdx}`} className="mx-auto max-w-[360px] space-y-2">
                        <div className="relative mx-auto overflow-hidden rounded-[2.5rem] border-[8px] border-[#2A2A2A] bg-[#2A2A2A] shadow-2xl">
                          <div className="absolute left-1/2 top-0 z-10 h-[24px] w-[100px] -translate-x-1/2 rounded-b-2xl bg-[#2A2A2A]" />
                          <div className="max-h-[480px] overflow-hidden rounded-[2rem]">
                            <video src={img.src} autoPlay loop muted playsInline className="w-full" />
                          </div>
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 rounded-b-[2rem] bg-gradient-to-t from-[#2A2A2A] to-transparent" />
                        </div>
                        <p className="text-center text-[11px] text-[#667078]">{img.label}</p>
                      </div>
                    ))}
                  </div>
                  ) : (
                  <div className="mt-6 space-y-8">
                    {action.images.map((img, imgIdx) => (
                      <div key={imgIdx} className="space-y-2">
                        <p className="text-sm font-medium text-slate-500">{img.label}</p>
                        <div className="overflow-hidden rounded-xl">
                          <img src={img.src} alt={img.label} className="w-full object-cover" loading="lazy" />
                        </div>
                      </div>
                    ))}
                  </div>
                  )
                ) : action.imageSrc ? (
                  <div className="mt-6 space-y-4">
                    <div className="overflow-hidden rounded-xl">
                      <img src={action.imageSrc} alt={action.title} className="w-full object-cover" loading="lazy" />
                    </div>
                    {action.imageExtra && (
                      <div className="overflow-hidden rounded-xl">
                        <img src={action.imageExtra} alt={`${action.title} 详情`} className="w-full object-cover" loading="lazy" />
                      </div>
                    )}
                  </div>
                ) : action.imagePlaceholder ? (
                  <div className="mt-6">
                    <ImagePlaceholder label={action.imagePlaceholder} height="h-[280px]" />
                  </div>
                ) : null}
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Before / After comparison */}
        {(group.beforeScreens.length > 0 || group.afterScreens.length > 0) && (
        <div className="mt-16 space-y-10">
          {group.beforeScreens.length === 1 && group.afterScreens.length === 1 ? (
            /* 单张对比：左 Before / 右 After */
            <FadeInSection delay={100}>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">Before</p>
                  {group.beforeScreens[0].src ? (
                    <div className="relative h-[520px] overflow-hidden rounded-xl border border-white/[0.06]">
                      <img src={group.beforeScreens[0].src} alt={group.beforeScreens[0].label} className="w-full object-cover object-top" loading="lazy" />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#080A0D] to-transparent" />
                    </div>
                  ) : (
                    <ImagePlaceholder label={group.beforeScreens[0].label} height="h-[520px]" />
                  )}
                </div>
                <div>
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FFDD00]">After</p>
                  {group.afterScreens[0].src ? (
                    <div className="relative h-[520px] overflow-hidden rounded-xl border border-white/[0.06]">
                      <img src={group.afterScreens[0].src} alt={group.afterScreens[0].label} className="w-full object-cover object-top" loading="lazy" />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#080A0D] to-transparent" />
                    </div>
                  ) : (
                    <ImagePlaceholder label={group.afterScreens[0].label} height="h-[520px]" />
                  )}
                </div>
              </div>
            </FadeInSection>
          ) : (
            /* 多张：分行展示 */
            <>
              <FadeInSection delay={100}>
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">Before</p>
                <div className="grid gap-4 md:grid-cols-2">
                  {group.beforeScreens.map((screen) => (
                    <div key={screen.label}>
                      {screen.src ? (
                        <div className="overflow-hidden rounded-xl border border-white/[0.06]">
                          <img src={screen.src} alt={screen.label} className="w-full" loading="lazy" />
                        </div>
                      ) : (
                        <ImagePlaceholder label={screen.label} height="h-[320px]" />
                      )}
                    </div>
                  ))}
                </div>
              </FadeInSection>

              <FadeInSection delay={200}>
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FFDD00]">After</p>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {group.afterScreens.map((screen) => (
                    <div key={screen.label}>
                      {screen.src ? (
                        <div className="overflow-hidden rounded-xl border border-white/[0.06]">
                          <img src={screen.src} alt={screen.label} className="w-full" loading="lazy" />
                        </div>
                      ) : (
                        <ImagePlaceholder label={screen.label} height="h-[320px]" />
                      )}
                    </div>
                  ))}
                </div>
              </FadeInSection>
            </>
          )}

          {/* Flow / Journey */}
          {group.flowScreens && group.flowScreens.length > 0 && (
            <FadeInSection delay={300}>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">链路体验</p>
              <div className={`grid gap-4 ${group.flowScreens.length >= 3 ? "md:grid-cols-3" : group.flowScreens.length === 2 ? "md:grid-cols-2" : ""}`}>
                {group.flowScreens.map((screen) => (
                  <div key={screen.label}>
                    {screen.src ? (
                      <div className="overflow-hidden rounded-xl border border-white/[0.06]">
                        <video src={screen.src} autoPlay loop muted playsInline className="w-full" />
                      </div>
                    ) : (
                      <ImagePlaceholder label={screen.label} height="h-[200px]" />
                    )}
                    <p className="mt-2 text-center text-[11px] text-[#667078]">{screen.label}</p>
                  </div>
                ))}
              </div>
            </FadeInSection>
          )}
        </div>
        )}
      </div>
    </div>
  );
}

function V2ActionsSection() {
  return (
    <CaseSection id="v2-actions" eyebrow="2.0 · Design Actions" title="2.0 设计落地" intro="针对上述三个问题，我们分别从信息架构、浏览动线和品牌视觉三个层面进行了重设计。" accentColor="text-[#FFDD00]">
      {v2ActionGroups.map((group, i) => (
        <V2ActionGroupBlock key={group.problem} group={group} index={i} />
      ))}
    </CaseSection>
  );
}

/* ═══════════════════ IP Spec Carousel ═══════════════════ */

function IpSpecCarousel() {
  const [current, setCurrent] = useState(0);
  const total = ipSpecImages.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <div className="relative mt-8 overflow-hidden rounded-[20px] bg-white/[0.02] border border-white/[0.06]">
      {/* Image display */}
      <div className="relative w-full">
        <img
          src={ipSpecImages[current]}
          alt={`IP 规范 ${current + 1}`}
          className="block w-full object-contain"
        />
      </div>

      {/* Navigation controls */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-4">
        <button
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white/80 backdrop-blur-sm transition hover:bg-black/80 hover:text-white"
          aria-label="上一张"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
        <button
          onClick={next}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white/80 backdrop-blur-sm transition hover:bg-black/80 hover:text-white"
          aria-label="下一张"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Indicator dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {ipSpecImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-6 bg-[#FFDD00]" : "w-2 bg-white/30"
            }`}
            aria-label={`第 ${i + 1} 张`}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════ 08 IP — Brand IP System ═══════════════════ */

function IPShowcaseSection() {
  const sceneImages = Object.entries(ipAssets.scenes).map(([key, src]) => ({
    src,
    title: key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
  }));

  return (
    <section className="bg-[#080A0D] py-[clamp(80px,12vw,180px)]" id="ip-showcase">
      <PageContainer>
        {/* ── Section header ── */}
        <FadeInSection>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FFDD00]">
            2.0 · Brand IP
          </p>
          <h2 className="mt-5 max-w-[720px] text-[clamp(1.875rem,4.2vw,3.25rem)] font-black leading-[1.08] tracking-tight text-[#F4F7F8]">
            品牌化表达：让认知被记住
          </h2>
          <p className="mt-6 max-w-[720px] text-[clamp(1rem,1.4vw,1.25rem)] font-light leading-[1.7] text-[#A8B1B8]">
            首页改版解决了「看得见」，但品牌需要让用户在离开首页后也能「记得住」。我们设计了 IP 角色「小闪」，作为品类场景、功能触点和品牌记忆的统一载体。
          </p>
        </FadeInSection>

        {/* ── 01 设计落地 ── */}
        <div className="mt-20">
          <FadeInSection>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">
              01 · Design — 设计落地
            </p>
          </FadeInSection>
          <div className="mt-8 space-y-20">
            {ipDesignActions.map((action, i) => (
              <FadeInSection key={action.title} delay={i * 80}>
                {action.images ? (
                  /* 有图片：文字在上，图片全宽展示 */
                  <div>
                    <div className="space-y-4">
                      <h3 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold text-[#F4F7F8]">{action.title}</h3>
                      <p className="text-[15px] leading-relaxed text-[#A8B1B8]">{action.desc}</p>
                      <p className="text-[13px] leading-relaxed text-[#667078]">{action.detail}</p>
                    </div>
                    <div className="mt-[120px] space-y-16">
                      {action.images.map((img, imgIdx) => (
                        <div key={imgIdx} className={`space-y-2 ${imgIdx === 0 ? "mx-auto max-w-[70%]" : ""}`}>
                          <div className="overflow-hidden rounded-xl">
                            <img src={img.src} alt={img.label} className="w-full object-cover" loading="lazy" />
                          </div>
                          <p className="text-center text-[11px] text-[#667078]">{img.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : action.imageSrc ? (
                  /* 有单图：上下布局 */
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold text-[#F4F7F8]">{action.title}</h3>
                      <p className="text-[15px] leading-relaxed text-[#A8B1B8]">{action.desc}</p>
                      <p className="text-[13px] leading-relaxed text-[#667078]">{action.detail}</p>
                    </div>
                    <div className="overflow-hidden rounded-xl">
                      <img src={action.imageSrc} alt={action.title} className="w-full object-cover" loading="lazy" />
                    </div>
                  </div>
                ) : (
                  /* 占位图：上下布局 */
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold text-[#F4F7F8]">{action.title}</h3>
                      <p className="text-[15px] leading-relaxed text-[#A8B1B8]">{action.desc}</p>
                      <p className="text-[13px] leading-relaxed text-[#667078]">{action.detail}</p>
                    </div>
                    <ImagePlaceholder label={action.title} height="h-[320px]" />
                  </div>
                )}
              </FadeInSection>
            ))}
          </div>
        </div>

        {/* ── 02 规范体系 ── */}
        <div className="mt-24">
          <FadeInSection>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">
              02 · System — 可复用的品牌资产规范
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-[#A8B1B8]">
              为保证「小闪」在首页、频道、弹窗和运营触点里稳定复用，建立覆盖造型、色彩、表情、动效、尺寸和场景的规范。
            </p>
          </FadeInSection>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {ipSystemSpecs.map((spec, i) => (
              <FadeInSection key={spec.label} delay={i * 60}>
                <SurfaceCard className="h-full">
                  <p className="font-mono-data text-[13px] font-bold text-[#FFDD00]">{spec.label}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#A8B1B8]">{spec.desc}</p>
                </SurfaceCard>
              </FadeInSection>
            ))}
          </div>
          {/* IP 规范体系轮播 */}
          <FadeInSection delay={200}>
            <IpSpecCarousel />
          </FadeInSection>
        </div>

        {/* ── 05 产品应用场景 ── */}
        <div className="mt-24">
          <FadeInSection>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">
              03 · Application — 产品中的 IP 应用
            </p>
          </FadeInSection>

          {/* 5a. 品牌心智 */}
          <div className="mt-10">
            <FadeInSection>
              <h3 className="text-[20px] font-bold text-[#F4F7F8]">{ipAppScenes.brandMind.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#A8B1B8]">{ipAppScenes.brandMind.desc}</p>
            </FadeInSection>
            <div className="mt-8 grid gap-4 md:grid-cols-5">
              {ipAppScenes.brandMind.items.map((item, i) => (
                <FadeInSection key={item.title} delay={i * 100}>
                  <div className="overflow-hidden rounded-[20px] bg-white/[0.03]">
                    {item.type === "video" ? (
                      <video
                        src={item.src}
                        autoPlay
                        loop
                        muted
                        playsInline preload="metadata"
                        className="block w-full object-cover object-top"
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={item.title}
                        loading="lazy"
                        className="block w-full object-cover object-top"
                      />
                    )}
                  </div>
                  <p className="mt-3 text-center text-[11px] text-[#667078]">{item.title}</p>
                </FadeInSection>
              ))}
            </div>
          </div>

          {/* 5b. 情感链接触点 */}
          <div className="mt-16">
            <FadeInSection>
              <h3 className="text-[20px] font-bold text-[#F4F7F8]">{ipAppScenes.emotionalTouch.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#A8B1B8]">{ipAppScenes.emotionalTouch.desc}</p>
            </FadeInSection>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
              {ipAppScenes.emotionalTouch.items.map((item, i) => (
                <FadeInSection key={item.title} delay={i * 50}>
                  <div className="group">
                    <div className="overflow-hidden rounded-[16px] bg-white/[0.03]">
                      {item.type === "video" ? (
                        <video
                          src={item.src}
                          autoPlay
                          loop
                          muted
                          playsInline preload="metadata"
                          className="block aspect-[750/1624] w-full object-cover object-top"
                        />
                      ) : (
                        <img
                          src={item.src}
                          alt={item.title}
                          loading="lazy"
                          className="block aspect-[750/1624] w-full object-cover object-top"
                        />
                      )}
                    </div>
                    <p className="mt-2 text-center text-[11px] text-[#667078]">{item.title}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

/* ═══════════════════ 09 V2 Result — Big Numbers + Bars ═══════════════════ */

function V2ResultSection() {
  return (
    <section className="bg-[#0A0D10] py-[clamp(80px,12vw,180px)]" id="v2-result">
      <PageContainer>
        <FadeInSection>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">2.0 · Result</p>
          <h2 className="mt-5 text-[clamp(1.875rem,4.2vw,3.25rem)] font-black leading-[1.08] tracking-tight text-[#F4F7F8]">
            2.0 结果：认知方向被验证
          </h2>
        </FadeInSection>

        {/* Key metrics — big numbers */}
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {v2KeyMetrics.map((m, i) => (
            <AnimateOnView key={m.label} delay={i * 150}>
              <SurfaceCard glow={m.tone === "up"}>
                <p className="font-mono-data text-[clamp(2rem,4vw,3rem)] font-black text-[#FFDD00]">{m.value}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">{m.label}</p>
                {m.detail && <p className="mt-1 text-[13px] text-[#A8B1B8]">{m.detail}</p>}
                {m.bar != null && (
                  <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full animate-bar-grow rounded-full bg-[#FFDD00]" style={{ width: `${m.bar}%` } as CSSProperties} />
                  </div>
                )}
              </SurfaceCard>
            </AnimateOnView>
          ))}
        </div>

        {/* Detailed result items */}
        <div className="mt-16 space-y-8">
          {v2ResultItems.map((item, i) => (
            <FadeInSection key={item.title} delay={i * 100}>
              <SurfaceCard>
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  <div className="flex-1 space-y-2">
                    <h3 className="text-[17px] font-bold text-[#F4F7F8]">{item.title}</h3>
                    <p className="text-[14px] text-[#A8B1B8]">{item.action}</p>
                    <p className="text-[13px] text-[#667078]">{item.meaning}</p>
                  </div>
                  <div className="w-full space-y-4 md:w-[280px]">
                    {item.metrics.map((m, mi) => (
                      <MetricBarRow key={m.label} m={m} delay={mi * 100} />
                    ))}
                  </div>
                </div>
              </SurfaceCard>
            </FadeInSection>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

/* ═══════════════════ 10 V2 Review ═══════════════════ */

function V2ReviewSection() {
  return (
    <CaseSection id="v2-review" eyebrow="2.0 · Review" title="复盘转折：从认知建立走向效率提升" accentColor="text-[#FFDD00]">
      {/* Positive summary */}
      <FadeInSection>
        <SurfaceCard glow>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FFDD00]">验证有效</p>
          <p className="mt-4 text-[15px] leading-relaxed text-[#A8B1B8]">{v2ReviewSummary.positive}</p>
        </SurfaceCard>
      </FadeInSection>

      {/* Remaining issues */}
      <FadeInSection delay={150}>
        <SurfaceCard className="mt-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FFDD00]">仍需提升</p>
          <p className="mt-4 text-[15px] leading-relaxed text-[#A8B1B8]">{v2ReviewSummary.remaining}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {v2RemainingMetrics.map((m, i) => (
              <MetricBarRow key={m.label} m={m} delay={i * 80} />
            ))}
          </div>
        </SurfaceCard>
      </FadeInSection>

    </CaseSection>
  );
}

/* ═══════════════════ 11 Transition — Large Title + Mask Reveal ═══════════════════ */

function TransitionSection() {
  return (
    <section className="relative overflow-hidden bg-[#050608] py-[clamp(120px,20vw,280px)]">
      {/* Subtle gradient mask */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0A0D10] via-[#050608] to-[#080A0D]" />

      <PageContainer className="relative">
        <FadeInSection>
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#667078]">
              From cognition to efficiency
            </p>
            <h2 className="mt-6 text-[clamp(2.5rem,8vw,6rem)] font-black leading-[1.02] tracking-tight text-[#F4F7F8]">
              从「认识闪购」
              <br />
              到「高效购买」
            </h2>
            <p className="mx-auto mt-6 max-w-[600px] text-[clamp(1rem,1.5vw,1.25rem)] font-light leading-[1.7] text-[#667078]">
              2.0 确立了首页的多品类认知框架；3.0 的任务变成减少犹豫、缩短判断，让用户更快完成从看到到下单。
            </p>
          </div>
        </FadeInSection>

        {/* Decorative accent line */}
        <FadeInSection delay={300}>
          <div className="mx-auto mt-16 h-px w-40 bg-gradient-to-r from-transparent via-[#FFDD00]/40 to-transparent" />
        </FadeInSection>
      </PageContainer>
    </section>
  );
}

/* ═══════════════════ 12 V3 Problem ═══════════════════ */

function V3ProblemSection() {
  return (
    <CaseSection id="v3-problem" eyebrow="3.0 · Problem" title="3.0 问题：用户购买判断仍需提速" intro="基于 2.0 复盘，3.0 聚焦首页转化效率：优惠是否被看见、商品是否好判断、路径是否匹配不同意图。" accentColor="text-[#FFDD00]">
      <div className="border-y border-white/[0.07]">
        {v3Problems.map((p, i) => (
          <FadeInSection key={p.title} delay={i * 100}>
            <article className="border-b border-white/[0.07] py-7 last:border-b-0 md:py-8">
              <div className="grid gap-4 md:grid-cols-[156px_minmax(0,1fr)] md:gap-10">
                <div>
                  <p className="font-mono-data text-[12px] font-bold text-[#FFDD00]">
                    0{i + 1}
                  </p>
                  <h3 className="text-balance mt-2.5 text-[clamp(1.125rem,1.5vw,1.375rem)] font-black leading-[1.22] tracking-normal text-[#F4F7F8]">
                    {p.title}
                  </h3>
                </div>

                <div className="max-w-[680px]">
                  <p className="text-pretty text-[15px] font-medium leading-[1.68] text-[#DCE3E7]">
                    {p.body}
                  </p>

                  <div className="mt-4 space-y-3">
                    <div className="grid gap-1.5 sm:grid-cols-[82px_minmax(0,1fr)] sm:items-baseline sm:gap-5">
                      <p className="whitespace-nowrap text-[13px] font-semibold leading-[1.66] text-[#667078]">复盘信号</p>
                      <p className="text-pretty text-[13px] leading-[1.66] text-[#98A2AA]">{p.evidence}</p>
                    </div>
                    <div className="grid gap-1.5 sm:grid-cols-[82px_minmax(0,1fr)] sm:items-baseline sm:gap-5">
                      <p className="whitespace-nowrap text-[13px] font-semibold leading-[1.66] text-[#B6A600]">设计机会</p>
                      <p className="text-pretty text-[13px] leading-[1.66] text-[#BFB45D]">{p.opportunity}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </FadeInSection>
        ))}
      </div>
    </CaseSection>
  );
}

/* ═══════════════════ 13 V3 Goal ═══════════════════ */

function V3GoalSection() {
  return (
    <CaseSection id="v3-goal" eyebrow="3.0 · Goal" title="3.0 目标：缩短从浏览到下单" compact accentColor="text-[#FFDD00]">
      <FadeInSection>
        <div className="grid gap-6 md:grid-cols-2">
          {v3BusinessGoals.map((g) => (
            <SurfaceCard key={g.label} glow>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FFDD00]">{g.label}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-[#A8B1B8]">{g.value}</p>
            </SurfaceCard>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection delay={150}>
        <div className="mt-10 flex flex-wrap gap-4">
          {v3DesignGoals.map((g, i) => (
            <SurfaceCard key={g} className="flex-1 min-w-[200px]">
              <p className="font-mono-data text-[28px] font-black text-[#FFDD00]">0{i + 1}</p>
              <p className="mt-3 text-[15px] font-medium text-[#F4F7F8]">{g}</p>
            </SurfaceCard>
          ))}
        </div>
      </FadeInSection>
    </CaseSection>
  );
}

/* ═══════════════════ 14 V3 Strategy ═══════════════════ */

function V3StrategySection() {
  return (
    <CaseSection
      id="v3-strategy"
      eyebrow="3.0 · Strategy"
      title={(
        <>
          <span className="phrase-nowrap">以优惠牵引，</span>
          <span className="phrase-nowrap">缩短选购路径</span>
        </>
      )}
      intro="3.0 不再继续堆入口，而是把首页重组为一条从优惠感知到商品下单的路径：先吸引、再判断、再承接。"
      accentColor="text-[#FFDD00]"
    >
      <div className="overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025]">
        {v3StrategyItems.map((s, i) => (
          <FadeInSection key={s.title} delay={i * 100}>
            <article className="grid gap-4 border-b border-white/[0.07] px-6 py-6 last:border-b-0 md:grid-cols-[88px_minmax(0,1fr)_150px] md:items-center md:px-8">
              <p className="font-mono-data text-[14px] font-bold text-[#FFDD00]">{s.eyebrow}</p>
              <div className="max-w-[640px]">
                <h3 className="text-balance text-[18px] font-bold leading-[1.28] tracking-normal text-[#F4F7F8]">{s.title}</h3>
                <p className="text-pretty mt-2 text-[14px] leading-[1.68] text-[#98A2AA]">{s.body}</p>
              </div>
              <p className="w-fit rounded-full border border-[#FFDD00]/15 bg-[#FFDD00]/[0.06] px-3 py-1.5 text-[12px] font-semibold text-[#D6C62A] md:justify-self-end">
                {s.caption}
              </p>
            </article>
          </FadeInSection>
        ))}
      </div>
    </CaseSection>
  );
}

/* ═══════════════════ 15 V3 Actions ═══════════════════ */

function V3ActionMedia({ item, variant = "board" }: { item: V3ActionMediaItem; variant?: "board" | "phone" }) {
  return (
    <figure className={variant === "phone" ? "mx-auto w-full max-w-[230px]" : "w-full"}>
      <div className={`overflow-hidden bg-white/[0.035] ring-1 ring-white/[0.08] ${variant === "phone" ? "rounded-[28px]" : "rounded-[24px] p-2"}`}>
        {item.type === "video" ? (
          <video src={item.src} autoPlay loop muted playsInline preload="metadata" className={variant === "phone" ? "block w-full object-cover" : "block w-full object-contain"} />
        ) : (
          <img src={item.src} alt={item.label} loading="lazy" className={variant === "phone" ? "block w-full object-cover" : "block w-full object-contain"} />
        )}
      </div>
      <figcaption className={`mt-2 text-[11px] leading-snug text-[#667078] ${variant === "phone" ? "text-center" : "text-left"}`}>{item.label}</figcaption>
    </figure>
  );
}

function V3ActionMediaGroup({
  items,
  layout = "board",
  topSpacing = true,
}: {
  items: V3ActionMediaItem[];
  layout?: V3ActionSection["mediaLayout"];
  topSpacing?: boolean;
}) {
  if (layout === "phone-row" || layout === "video-row") {
    const cols = items.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3";
    return (
      <div className={`${topSpacing ? "mt-6" : ""} grid gap-5 ${cols} md:max-w-[760px]`}>
        {items.map((img) => (
          <V3ActionMedia key={img.label} item={img} variant="phone" />
        ))}
      </div>
    );
  }

  return (
    <div className={`${topSpacing ? "mt-7" : ""} space-y-7`}>
      {items.map((img) => (
        <V3ActionMedia key={img.label} item={img} />
      ))}
    </div>
  );
}

function V3ActionSections({ sections }: { sections: V3ActionSection[] }) {
  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <section key={section.title} className="border-t border-white/[0.07] pt-7">
          <div className="grid gap-4 sm:grid-cols-[48px_minmax(0,680px)]">
            <p className="font-mono-data text-[22px] font-black leading-none text-[#FFDD00]">{section.eyebrow}</p>
            <div>
              <h4 className="text-balance text-[20px] font-black leading-[1.18] tracking-normal text-[#F4F7F8]">{section.title}</h4>
              <p className="text-pretty mt-3 text-[14px] leading-[1.72] text-[#A8B1B8]">{section.body}</p>
            </div>
          </div>
          {section.images && <V3ActionMediaGroup items={section.images} layout={section.mediaLayout} />}
        </section>
      ))}
    </div>
  );
}

function V3ActionVisual({ visual }: { visual: V3Action["visual"] }) {
  const gridClass =
    visual.type === "flow"
      ? "md:grid-cols-3"
      : visual.type === "matrix"
        ? "sm:grid-cols-3"
        : "sm:grid-cols-2";
  const stageHeight =
    visual.type === "beforeAfter"
      ? "min-h-[340px]"
      : visual.type === "matrix"
        ? "min-h-[300px]"
        : "min-h-[320px]";

  if (visual.images && visual.images.length > 0) {
    return (
      <V3ActionMediaGroup items={visual.images} layout="board" topSpacing={false} />
    );
  }

  return (
    <figure>
      <div className={`relative overflow-hidden rounded-[22px] border-y border-white/[0.09] bg-white/[0.018] ${stageHeight}`}>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.07),transparent_38%),radial-gradient(circle_at_82%_18%,rgba(255,221,0,0.1),transparent_30%)]" />
        {visual.type === "beforeAfter" && <div className="absolute inset-y-6 left-1/2 hidden w-px bg-white/[0.1] sm:block" />}
        <div className="absolute left-5 top-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">图位预留</p>
          <h4 className="mt-2 text-[15px] font-bold leading-snug text-[#F4F7F8]">{visual.title}</h4>
        </div>
        <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
          <p className="text-[13px] font-medium text-[#667078]">待补充方案切图</p>
        </div>
        <div className={`absolute inset-x-5 bottom-5 grid gap-3 ${gridClass}`}>
          {visual.slots.map((slot) => (
            <div key={`${visual.title}-${slot.label}`} className="border-t border-white/[0.1] pt-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#D6C62A]">{slot.eyebrow || "待补图"}</p>
              <p className="mt-1 text-[13px] font-bold leading-snug text-[#F4F7F8]">{slot.label}</p>
              {slot.note && <p className="text-pretty mt-1 text-[12px] leading-[1.45] text-[#667078]">{slot.note}</p>}
            </div>
          ))}
        </div>
      </div>
      {visual.hint && <figcaption className="mt-3 text-[12px] leading-[1.6] text-[#667078]">{visual.hint}</figcaption>}
    </figure>
  );
}

function V3ActionPoints({ points }: { points?: V3Action["points"] }) {
  if (!points?.length) return null;

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {points.map((point) => (
        <div key={point.title} className="border-l border-[#FFDD00]/35 pl-4">
          <p className="font-mono-data text-[13px] font-black text-[#FFDD00]">{point.eyebrow}</p>
          <p className="mt-2 text-[14px] font-bold leading-snug text-[#F4F7F8]">{point.title}</p>
          <p className="text-pretty mt-2 text-[13px] leading-[1.6] text-[#98A2AA]">{point.body}</p>
        </div>
      ))}
    </div>
  );
}

function V3ActionsSection() {
  return (
    <CaseSection
      id="v3-actions"
      eyebrow="3.0 · Design Actions"
      title="3.0 设计动作：把首页变成购买路径"
      intro="按用户下单前的判断顺序展开：先看到优惠，再判断商品，然后进入匹配的品类容器和入口。"
      accentColor="text-[#FFDD00]"
      compact
    >
      <div className="border-y border-white/[0.07]">
        {v3Actions.map((a, i) => (
          <FadeInSection key={a.title} delay={i * 80}>
            <article className="border-b border-white/[0.07] py-10 last:border-b-0 md:py-12">
              <div className="grid gap-7 lg:grid-cols-[72px_minmax(0,1fr)] lg:gap-9">
                <div className="flex items-center gap-4 lg:block">
                <p className="font-mono-data text-[22px] font-black leading-none text-[#FFDD00]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div className="h-px flex-1 bg-white/[0.08] lg:mt-5 lg:h-[calc(100%-44px)] lg:w-px" />
              </div>

              <div className="max-w-[820px]">
                <p className="text-[12px] font-semibold leading-none text-[#D6C62A]">{a.strategy}</p>
                <h3 className="text-balance mt-4 text-[clamp(1.375rem,2vw,1.75rem)] font-black leading-[1.18] tracking-normal text-[#F4F7F8]">
                  {a.title}
                </h3>
                <dl className="mt-6 space-y-3.5">
                  <div className="grid gap-2 sm:grid-cols-[64px_minmax(0,1fr)] sm:items-baseline">
                    <dt className="whitespace-nowrap text-[13px] font-semibold leading-[1.65] text-[#667078]">问题</dt>
                    <dd className="text-pretty text-[14px] leading-[1.68] text-[#A8B1B8]">{a.problem}</dd>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-[64px_minmax(0,1fr)] sm:items-baseline">
                    <dt className="whitespace-nowrap text-[13px] font-semibold leading-[1.65] text-[#667078]">动作</dt>
                    <dd className="text-pretty text-[14px] leading-[1.68] text-[#F4F7F8]">{a.action}</dd>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-[64px_minmax(0,1fr)] sm:items-baseline">
                    <dt className="whitespace-nowrap text-[13px] font-semibold leading-[1.65] text-[#667078]">变化</dt>
                    <dd className="text-pretty text-[14px] leading-[1.68] text-[#A8B1B8]">{a.change}</dd>
                  </div>
                </dl>
                {!a.sections && <V3ActionPoints points={a.points} />}
              </div>
              </div>

              <div className="mt-8 lg:ml-[108px]">
                {a.sections ? <V3ActionSections sections={a.sections} /> : <V3ActionVisual visual={a.visual} />}
              </div>
            </article>
          </FadeInSection>
        ))}
      </div>
    </CaseSection>
  );
}

/* ═══════════════════ 16 V3 Showcase ═══════════════════ */

function V3ShowcaseSection() {
  return (
    <section className="bg-[#080A0D] py-[clamp(80px,12vw,180px)]">
      <PageContainer>
        <FadeInSection>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">3.0 · Showcase</p>
          <h2 className="mt-5 text-[clamp(1.875rem,4.2vw,3.25rem)] font-black leading-[1.08] tracking-tight text-[#F4F7F8]">
            3.0 关键方案串联
          </h2>
        </FadeInSection>

        {/* Phone showcase */}
        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-5">
          {[assets.v3.homeCoupon, assets.v3.merchantCard, assets.v3.doubleProductCard, assets.v3.singleProductCard, assets.v3.homeLowPrice].map((src, i) => (
            <FadeInSection key={src} delay={i * 100}>
              <PhoneMockup src={src} size="sm" />
            </FadeInSection>
          ))}
        </div>

        {/* Icon showcase */}
        <FadeInSection delay={300}>
          <p className="mt-20 mb-8 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">
            品类图标升级
          </p>
          <div className="grid grid-cols-3 gap-6 md:grid-cols-6">
            {v3IconShowcase.map((icon) => (
              <div key={icon.title} className="group text-center">
                <div className="mx-auto w-[72px] h-[72px] overflow-hidden rounded-[20px] bg-white/[0.04] p-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
                  <img src={icon.src} alt={icon.title} className="block w-full h-full object-contain" loading="lazy" />
                </div>
                <p className="mt-3 text-[11px] text-[#667078]">{icon.title}</p>
              </div>
            ))}
          </div>
        </FadeInSection>
      </PageContainer>
    </section>
  );
}

/* ═══════════════════ 17 V3 Result — Data Comparison ═══════════════════ */

function V3ResultSection() {
  return (
    <section className="bg-[#0A0D10] py-[clamp(80px,12vw,180px)]" id="v3-result">
      <PageContainer>
        <FadeInSection>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">3.0 · Result</p>
          <h2 className="mt-5 text-[clamp(1.875rem,4.2vw,3.25rem)] font-black leading-[1.08] tracking-tight text-[#F4F7F8]">
            3.0 结果：效率优化带来订单增长
          </h2>
        </FadeInSection>

        {/* Big hero number */}
        <FadeInSection delay={100} className="mt-16 text-center">
          <BigNumber value="+2.7%" label="整体订单量提升" />
        </FadeInSection>

        {/* Key metrics grid */}
        <div className="mt-16 grid grid-cols-2 items-stretch gap-6 md:grid-cols-3 lg:grid-cols-5">
          {v3KeyMetrics.map((m, i) => (
            <AnimateOnView key={m.label} delay={i * 120} className="flex">
              <SurfaceCard glow={m.tone === "up"} className="flex h-full w-full flex-col items-center justify-center text-center">
                <p className="font-mono-data text-[clamp(1.5rem,3vw,2rem)] font-black leading-tight text-[#FFDD00] whitespace-nowrap">{m.value}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667078]">{m.label}</p>
                {m.bar != null && (
                  <div className="mx-auto mt-4 h-[3px] w-full max-w-[100px] overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-[#FFDD00]"
                      style={{ width: `${m.bar}%`, animation: "barGrow 1s cubic-bezier(0.16,1,0.3,1) forwards", transformOrigin: "left" }}
                    />
                  </div>
                )}
              </SurfaceCard>
            </AnimateOnView>
          ))}
        </div>

        {/* Detailed result items */}
        <div className="mt-16 space-y-8">
          {v3ResultItems.map((item, i) => (
            <FadeInSection key={item.title} delay={i * 100}>
              <SurfaceCard>
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  <div className="flex-1 space-y-2">
                    <h3 className="text-[17px] font-bold text-[#F4F7F8]">{item.title}</h3>
                    <p className="text-[14px] text-[#A8B1B8]">{item.action}</p>
                    <p className="text-[13px] text-[#667078]">{item.meaning}</p>
                  </div>
                  <div className="w-full space-y-4 md:w-[280px]">
                    {item.metrics.map((m, mi) => (
                      <MetricBarRow key={m.label} m={m} delay={mi * 100} />
                    ))}
                  </div>
                </div>
              </SurfaceCard>
            </FadeInSection>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

/* ═══════════════════ 18 V3 Review ═══════════════════ */

function V3ReviewSection() {
  return (
    <CaseSection id="v3-review" eyebrow="3.0 · Review" title="结果复盘：增长之后继续找下一层问题" accentColor="text-[#FFDD00]">
      <FadeInSection>
        <SurfaceCard glow>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FFDD00]">核心结果</p>
          <p className="mt-4 text-[15px] leading-relaxed text-[#A8B1B8]">{v3ReviewSummary.positive}</p>
        </SurfaceCard>
      </FadeInSection>

      <FadeInSection delay={150}>
        <SurfaceCard className="mt-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FFDD00]">后续方向</p>
          <p className="mt-4 text-[15px] leading-relaxed text-[#A8B1B8]">{v3ReviewSummary.nextSteps}</p>
        </SurfaceCard>
      </FadeInSection>

    </CaseSection>
  );
}

/* ═══════════════════ 19 Reflection ═══════════════════ */

function ReflectionSection() {
  return (
    <CaseSection
      id="reflection"
      eyebrow="Reflection"
      title="项目思考：首页改版不只是重排模块"
      intro="做完 2.0 到 3.0，我更明确的一点是：首页不是模块合集，而是把业务阶段、用户意图和购买判断串起来的路径。"
      accentColor="text-[#FFDD00]"
    >
      <div className="border-y border-white/[0.07]">
        {reflectionPoints.map((r, i) => (
          <FadeInSection key={r.title} delay={i * 100}>
            <article className="grid gap-5 border-b border-white/[0.07] py-7 last:border-b-0 md:grid-cols-[96px_minmax(0,760px)] md:py-8">
              <p className="font-mono-data text-[20px] font-black leading-none text-[#FFDD00]">0{i + 1}</p>
              <div>
                <h3 className="text-balance text-[18px] font-bold leading-snug tracking-normal text-[#F4F7F8]">{r.title}</h3>
                <p className="text-pretty mt-3 text-[14px] leading-[1.72] text-[#A8B1B8]">{r.body}</p>
              </div>
            </article>
          </FadeInSection>
        ))}
      </div>
    </CaseSection>
  );
}

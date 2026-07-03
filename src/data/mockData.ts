export type RiskLevel = "low" | "medium" | "high";
export type SourceType = "announcement" | "news" | "policy" | "research" | "community";

export interface Evidence {
  id: string;
  title: string;
  source: string;
  sourceType: SourceType;
  publishedAt: string;
  credibilityScore: number;
  excerpt: string;
}

export interface RelatedCompany {
  symbol: string;
  name: string;
  market: string;
  industryRole: string;
  relevanceScore: number;
  evidenceCount: number;
  riskLevel: RiskLevel;
  reason: string;
}

export interface RiskSignal {
  id: string;
  level: RiskLevel;
  title: string;
  description: string;
  verifyAction: string;
}

export interface Hotspot {
  id: string;
  title: string;
  category: string;
  summary: string;
  beginnerBrief: string;
  heatScore: number;
  heatChange: number;
  credibilityScore: number;
  riskLevel: RiskLevel;
  sourceCount: number;
  companyCount: number;
  tags: string[];
  updatedAt: string;
  timeline: Array<{ time: string; title: string; detail: string }>;
  companies: RelatedCompany[];
  evidence: Evidence[];
  risks: RiskSignal[];
  graphNodes: Array<{ id: string; label: string; type: "event" | "chain" | "stock" | "evidence" }>;
}

export interface StockProfile {
  symbol: string;
  name: string;
  market: string;
  sector: string;
  summary: string;
  revenueClue: string;
  relatedHotspots: string[];
  evidence: Evidence[];
  risks: RiskSignal[];
  aiBrief: string;
}

export const hotspots: Hotspot[] = [
  {
    id: "ai-compute-order",
    title: "AI 算力订单密集落地",
    category: "AI 算力",
    summary: "云厂商和服务器产业链出现多条算力采购、扩容和交付信息，市场关注 GPU 服务器、液冷和高速连接环节。",
    beginnerBrief: "这类热点真正需要验证的是订单是否进入上市公司收入，而不是只看公司名字里有没有 AI。",
    heatScore: 94,
    heatChange: 18,
    credibilityScore: 82,
    riskLevel: "medium",
    sourceCount: 21,
    companyCount: 8,
    tags: ["GPU 服务器", "液冷", "高速连接", "云厂商"],
    updatedAt: "09:42",
    timeline: [
      { time: "08:10", title: "海外云厂商扩容传闻发酵", detail: "多家媒体提到新一轮 AI 基建资本开支上修。" },
      { time: "09:35", title: "A 股算力链异动", detail: "服务器、液冷、光模块方向出现同步放量。" },
      { time: "11:20", title: "机构观点扩散", detail: "研究观点开始聚焦订单兑现和供货节奏。" },
    ],
    companies: [
      {
        symbol: "601138",
        name: "工业富联",
        market: "沪市",
        industryRole: "AI 服务器制造",
        relevanceScore: 91,
        evidenceCount: 5,
        riskLevel: "medium",
        reason: "服务器制造和云客户供货链条清晰，但需要验证 AI 服务器收入占比和毛利变化。",
      },
      {
        symbol: "300308",
        name: "中际旭创",
        market: "创业板",
        industryRole: "高速光模块",
        relevanceScore: 88,
        evidenceCount: 4,
        riskLevel: "medium",
        reason: "光模块是算力集群连接核心环节，订单景气度较强，但估值和拥挤度需要关注。",
      },
      {
        symbol: "000977",
        name: "浪潮信息",
        market: "深市",
        industryRole: "服务器整机",
        relevanceScore: 84,
        evidenceCount: 3,
        riskLevel: "high",
        reason: "整机环节受益方向明确，但供应链、价格和利润率波动较大。",
      },
    ],
    evidence: [
      {
        id: "ev-ai-1",
        title: "多家云厂商上修 AI 基建资本开支",
        source: "财经媒体",
        sourceType: "news",
        publishedAt: "08:10",
        credibilityScore: 76,
        excerpt: "市场预期新一轮 AI 训练和推理需求推动服务器、网络和液冷设施扩容。",
      },
      {
        id: "ev-ai-2",
        title: "服务器厂商披露 AI 相关订单持续交付",
        source: "公司公告",
        sourceType: "announcement",
        publishedAt: "09:05",
        credibilityScore: 92,
        excerpt: "公告提到 AI 服务器业务保持增长，但未披露单一客户订单金额。",
      },
      {
        id: "ev-ai-3",
        title: "机构上调光模块产业链景气判断",
        source: "卖方研报摘要",
        sourceType: "research",
        publishedAt: "10:48",
        credibilityScore: 70,
        excerpt: "观点认为高速光模块需求由训练集群向推理集群扩散。",
      },
    ],
    risks: [
      {
        id: "risk-ai-1",
        level: "medium",
        title: "订单不等于利润",
        description: "服务器整机环节收入弹性大，但毛利率可能受到客户议价和零部件成本影响。",
        verifyAction: "查看季度毛利率和 AI 服务器业务拆分。",
      },
      {
        id: "risk-ai-2",
        level: "high",
        title: "高位拥挤交易",
        description: "部分光模块和算力龙头已经被反复交易，利好兑现时波动会放大。",
        verifyAction: "对比成交额、换手率和机构持仓变化。",
      },
    ],
    graphNodes: [
      { id: "event", label: "算力订单", type: "event" },
      { id: "server", label: "AI 服务器", type: "chain" },
      { id: "optical", label: "光模块", type: "chain" },
      { id: "cooling", label: "液冷", type: "chain" },
      { id: "601138", label: "工业富联", type: "stock" },
      { id: "300308", label: "中际旭创", type: "stock" },
      { id: "evidence", label: "公告/研报", type: "evidence" },
    ],
  },
  {
    id: "humanoid-robot-policy",
    title: "人形机器人政策与订单共振",
    category: "机器人",
    summary: "地方政策、产业基金和样机交付信息同步增多，市场关注减速器、丝杠、传感器和整机代工。",
    beginnerBrief: "机器人热点容易从真实订单扩散到泛概念，关键要看公司处于哪一环，以及是否已有客户验证。",
    heatScore: 87,
    heatChange: 14,
    credibilityScore: 78,
    riskLevel: "medium",
    sourceCount: 17,
    companyCount: 11,
    tags: ["减速器", "丝杠", "传感器", "整机"],
    updatedAt: "10:18",
    timeline: [
      { time: "07:50", title: "地方产业政策发布", detail: "政策强调机器人核心零部件自主化。" },
      { time: "09:48", title: "核心零部件走强", detail: "减速器、丝杠方向热度提升。" },
      { time: "13:12", title: "社区讨论扩散", detail: "市场开始寻找低位补涨标的。" },
    ],
    companies: [
      {
        symbol: "002747",
        name: "埃斯顿",
        market: "深市",
        industryRole: "机器人本体与控制",
        relevanceScore: 86,
        evidenceCount: 4,
        riskLevel: "medium",
        reason: "工业机器人基础较强，人形机器人相关业务仍需验证量产进度。",
      },
      {
        symbol: "688017",
        name: "绿的谐波",
        market: "科创板",
        industryRole: "精密减速器",
        relevanceScore: 89,
        evidenceCount: 4,
        riskLevel: "medium",
        reason: "减速器环节确定性较高，但收入弹性取决于人形机器人量产节奏。",
      },
      {
        symbol: "002050",
        name: "三花智控",
        market: "深市",
        industryRole: "热管理与机电执行",
        relevanceScore: 79,
        evidenceCount: 2,
        riskLevel: "low",
        reason: "具备汽车零部件客户基础，机器人执行器方向仍需跟踪公告验证。",
      },
    ],
    evidence: [
      {
        id: "ev-bot-1",
        title: "地方出台促进具身智能产业政策",
        source: "政府公开文件",
        sourceType: "policy",
        publishedAt: "07:50",
        credibilityScore: 95,
        excerpt: "政策提出围绕核心零部件、整机应用和场景示范形成产业集群。",
      },
      {
        id: "ev-bot-2",
        title: "机器人核心零部件订单预期升温",
        source: "财经媒体",
        sourceType: "news",
        publishedAt: "09:30",
        credibilityScore: 74,
        excerpt: "部分供应链公司被市场关注，但具体订单金额仍缺少统一披露。",
      },
    ],
    risks: [
      {
        id: "risk-bot-1",
        level: "medium",
        title: "量产节奏不确定",
        description: "人形机器人从样机到量产仍需要成本、可靠性和场景验证。",
        verifyAction: "跟踪客户定点、批量订单和收入确认节点。",
      },
    ],
    graphNodes: [
      { id: "event", label: "机器人政策", type: "event" },
      { id: "gear", label: "减速器", type: "chain" },
      { id: "sensor", label: "传感器", type: "chain" },
      { id: "body", label: "整机控制", type: "chain" },
      { id: "688017", label: "绿的谐波", type: "stock" },
      { id: "002747", label: "埃斯顿", type: "stock" },
      { id: "evidence", label: "政策/新闻", type: "evidence" },
    ],
  },
  {
    id: "advanced-packaging",
    title: "先进封装进入国产替代窗口",
    category: "半导体",
    summary: "AI 芯片带动先进封装需求，市场关注封测龙头、设备材料和国产供应链替代。",
    beginnerBrief: "先进封装不是普通封测的简单升级，要重点看公司是否具备高端封装客户和产线能力。",
    heatScore: 81,
    heatChange: 9,
    credibilityScore: 85,
    riskLevel: "low",
    sourceCount: 13,
    companyCount: 6,
    tags: ["Chiplet", "HBM", "封测", "设备材料"],
    updatedAt: "11:06",
    timeline: [
      { time: "08:35", title: "AI 芯片封装需求上修", detail: "产业链反馈高端封装产能成为供给约束。" },
      { time: "10:02", title: "封测板块走强", detail: "资金关注国产封测龙头和设备材料。" },
      { time: "14:15", title: "风险提示出现", detail: "部分公司先进封装收入占比仍低。" },
    ],
    companies: [
      {
        symbol: "600584",
        name: "长电科技",
        market: "沪市",
        industryRole: "封测龙头",
        relevanceScore: 87,
        evidenceCount: 4,
        riskLevel: "low",
        reason: "封测能力和客户基础较强，是先进封装国产替代的重要观察对象。",
      },
      {
        symbol: "002156",
        name: "通富微电",
        market: "深市",
        industryRole: "封测服务",
        relevanceScore: 83,
        evidenceCount: 3,
        riskLevel: "medium",
        reason: "与高性能计算客户相关度较高，但业绩弹性需要看产能利用率。",
      },
    ],
    evidence: [
      {
        id: "ev-pack-1",
        title: "AI 芯片推动先进封装产能紧张",
        source: "行业资讯",
        sourceType: "news",
        publishedAt: "08:35",
        credibilityScore: 78,
        excerpt: "高端封装产能成为 AI 芯片供应链的重要约束之一。",
      },
      {
        id: "ev-pack-2",
        title: "封测公司披露先进封装投入",
        source: "公司公告",
        sourceType: "announcement",
        publishedAt: "10:30",
        credibilityScore: 90,
        excerpt: "公告提到持续推进先进封装产线建设和客户导入。",
      },
    ],
    risks: [
      {
        id: "risk-pack-1",
        level: "low",
        title: "收入占比需要拆分",
        description: "封测公司业务结构复杂，先进封装收入未必已经成为主导。",
        verifyAction: "查看年报业务拆分和资本开支投向。",
      },
    ],
    graphNodes: [
      { id: "event", label: "先进封装", type: "event" },
      { id: "chiplet", label: "Chiplet", type: "chain" },
      { id: "hbm", label: "HBM 配套", type: "chain" },
      { id: "test", label: "封测产线", type: "chain" },
      { id: "600584", label: "长电科技", type: "stock" },
      { id: "002156", label: "通富微电", type: "stock" },
      { id: "evidence", label: "公告/行业资讯", type: "evidence" },
    ],
  },
];

export const stocks: StockProfile[] = [
  {
    symbol: "601138",
    name: "工业富联",
    market: "沪市",
    sector: "AI 服务器",
    summary: "公司处于服务器制造和云客户供应链环节，市场把它视为 AI 算力建设的重要硬件映射。",
    revenueClue: "重点验证 AI 服务器收入占比、客户集中度、毛利率和交付节奏。",
    relatedHotspots: ["ai-compute-order"],
    evidence: hotspots[0].evidence,
    risks: hotspots[0].risks,
    aiBrief: "它不是因为名字带 AI 被关注，而是因为处在服务器制造环节。新手要看订单是否能转成收入，以及收入增长是否带来利润增长。",
  },
  {
    symbol: "300308",
    name: "中际旭创",
    market: "创业板",
    sector: "高速光模块",
    summary: "高速光模块连接 AI 算力集群，需求与云厂商资本开支和网络架构升级高度相关。",
    revenueClue: "重点验证 800G/1.6T 产品进展、海外客户需求和估值拥挤度。",
    relatedHotspots: ["ai-compute-order"],
    evidence: hotspots[0].evidence.slice(0, 2),
    risks: [hotspots[0].risks[1]],
    aiBrief: "光模块是算力网络的关键零件，逻辑较硬，但股价往往提前反映预期，不能只看行业景气。",
  },
  {
    symbol: "688017",
    name: "绿的谐波",
    market: "科创板",
    sector: "机器人减速器",
    summary: "公司处于机器人核心零部件环节，市场关注其在人形机器人放量后的弹性。",
    revenueClue: "重点验证客户导入、批量交付、产品价格和产能利用率。",
    relatedHotspots: ["humanoid-robot-policy"],
    evidence: hotspots[1].evidence,
    risks: hotspots[1].risks,
    aiBrief: "减速器是机器人运动控制的关键部件，但人形机器人还在产业早期，相关性强不代表业绩马上兑现。",
  },
  {
    symbol: "600584",
    name: "长电科技",
    market: "沪市",
    sector: "先进封装",
    summary: "公司是封测龙头，先进封装能力让它成为 AI 芯片国产供应链的重要观察对象。",
    revenueClue: "重点验证先进封装产线、客户结构、资本开支和高端产品占比。",
    relatedHotspots: ["advanced-packaging"],
    evidence: hotspots[2].evidence,
    risks: hotspots[2].risks,
    aiBrief: "它的逻辑来自高端封装需求，而不是所有封测业务都受益。要拆开看高端产线和普通封测的差别。",
  },
];

export const learningCards = [
  {
    title: "AI 算力",
    text: "关注 GPU、服务器、光模块、液冷和电力配套。验证重点是订单、交付、毛利率。",
  },
  {
    title: "人形机器人",
    text: "关注减速器、丝杠、传感器、控制器和整机。验证重点是客户定点和量产节奏。",
  },
  {
    title: "先进封装",
    text: "关注 Chiplet、HBM 配套、封测产线和设备材料。验证重点是高端收入占比。",
  },
];

export function getHotspot(id: string) {
  return hotspots.find((hotspot) => hotspot.id === id);
}

export function getStock(symbol: string) {
  return stocks.find((stock) => stock.symbol === symbol);
}

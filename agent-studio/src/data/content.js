// 首版先把内容放在页面里，三小时内看到可售卖雏形；后续可整体搬到云端资料表。
export const siteConfig = {
  brandName: '智能助理实操资料站',
  subtitle: '中文大白话教程',
  demoKey: '20260428',
  userName: '学习者一号',
  offerLine: '卡密进入，教程、案例、模板都能看',
  searchPlaceholder: '搜索课程、项目、资料、模板...',
  loginTitle: '输入卡密，进入完整资料站',
  loginDescription:
    '这里先做最简单的通行方式。卡密通过后，教程、案例、资料和模板都能看。正式售卖时再接入云端卡密表。',
}

export const saleHighlights = [
  {
    title: '全是中文大白话',
    summary: '不堆难词，不讲玄学，每一步都告诉你怎么做。',
  },
  {
    title: '买完当天能用',
    summary: '每节课都有一个小产出，还有可复制的提问稿。',
  },
  {
    title: '先做出能卖的形状',
    summary: '卡密、教程、案例、模板、资料入口先跑通。',
  },
]

export const learningModules = [
  {
    id: 'start',
    title: '五分钟上手',
    kicker: '先跑通',
    summary: '先别学一堆概念，直接做出第一个能展示的小作品。',
    duration: '三节内容',
    status: '新手必看',
  },
  {
    id: 'talk',
    title: '把问题说清楚',
    kicker: '会提问',
    summary: '学会把目标、材料、限制和输出样子说清楚，让工具少猜错。',
    duration: '三节内容',
    status: '复制就用',
  },
  {
    id: 'tools',
    title: '让工具帮你干活',
    kicker: '会找工具',
    summary: '按任务找工具、筛工具、整理成自己的资料库。',
    duration: '三节内容',
    status: '做中学',
  },
  {
    id: 'sell',
    title: '做成能卖的资料站',
    kicker: '能交付',
    summary: '把教程、模板、案例和卡密入口整理成一个可以交给买家看的资料站。',
    duration: '三节内容',
    status: '最后收口',
  },
]

export const lessons = [
  {
    id: 'start-01',
    moduleId: 'start',
    title: '五分钟搞懂：智能助理能帮你省哪三类时间',
    summary: '不用背定义，只看三个场景：整理资料、写第一版、反复改稿。',
    duration: '十二分钟',
    difficulty: '很容易',
    outcome: '你能判断一个任务适不适合先交给工具做草稿。',
    steps: [
      '写下你最近最耗时间的三件事。',
      '把每件事拆成：有什么资料、要处理什么、最后要交什么。',
      '标出必须你亲自判断的部分。',
      '挑一个风险最低的小任务，作为今天的练习。',
    ],
    prompt:
      '请帮我判断下面这个任务是否适合先交给智能助理做草稿。我的目标是：填这里。已有资料是：填这里。最后想得到：填这里。请用中文大白话回答：适合交给工具做的部分、不适合的部分、我还需要补充的信息、第一步建议。',
    commonMistakes: [
      '一上来就把一个很大的愿望丢出去，结果很空。',
      '没有说清楚给谁看，语气容易跑偏。',
      '让工具替你做最终判断，而不是先帮你打草稿。',
    ],
    sources: [
      {
        title: '智能助理入门资料',
        publisher: '开放工具资料站',
        url: 'https://platform.openai.com/docs/guides/agents',
      },
    ],
  },
  {
    id: 'start-02',
    moduleId: 'start',
    title: '十分钟做出第一个资料整理页',
    summary: '把一堆笔记、链接和想法，整理成一页别人能看懂的清单。',
    duration: '二十分钟',
    difficulty: '容易',
    outcome: '你会得到一个可以放进资料站的内容页面草稿。',
    steps: [
      '准备一段聊天记录、文章摘录或自己的笔记。',
      '先让工具提取关键事实，不急着改写。',
      '再按“适合谁、能做什么、下一步怎么做”整理。',
      '最后让工具列出不确定的地方，你自己确认。',
    ],
    prompt:
      '请把下面资料整理成一页行动清单。先列关键事实，再分成“适合谁”“能做什么”“下一步怎么做”三栏。不要编造资料里没有的信息，不确定的地方单独列出来。资料如下：粘贴资料。',
    commonMistakes: [
      '一开始就要漂亮文章，忽略了事实整理。',
      '没有要求列出不确定信息，容易把猜测当结论。',
      '只看第一版，不继续追问缺口。',
    ],
    sources: [
      {
        title: '文字生成做法资料',
        publisher: '开放工具资料站',
        url: 'https://platform.openai.com/docs/guides/text',
      },
    ],
  },
  {
    id: 'start-03',
    moduleId: 'start',
    title: '把一节课写成小白能跟做的样子',
    summary: '一节课只解决一个问题，先写结果，再写步骤，最后给复制稿。',
    duration: '十五分钟',
    difficulty: '容易',
    outcome: '你会得到一节能放进资料站的中文教程。',
    steps: [
      '先写本节做完能得到什么。',
      '把步骤控制在三到五步。',
      '每一步都写动作，不写空话。',
      '最后补三个容易踩坑的地方。',
    ],
    prompt:
      '请把下面这段资料改成新手能跟着做的教程。要求：中文大白话，先写做完能得到什么，再列三到五步，最后写三个容易踩坑的地方。每一步都要能照着做。',
    commonMistakes: [
      '教程像说明书，读起来累。',
      '每节内容太大，看完还是不知道先做什么。',
      '只有解释，没有可以复制的提问稿。',
    ],
    sources: [
      {
        title: '提问写法资料',
        publisher: '开放工具资料站',
        url: 'https://platform.openai.com/docs/guides/prompt-engineering',
      },
    ],
  },
  {
    id: 'talk-01',
    moduleId: 'talk',
    title: '先说背景，工具才不会乱猜',
    summary: '把目标、读者、材料、口吻和限制说清楚，结果会稳定很多。',
    duration: '十八分钟',
    difficulty: '容易',
    outcome: '你会得到一份能反复套用的任务说明模板。',
    steps: [
      '先写目标：你要解决什么问题。',
      '再写读者：这份内容给谁看。',
      '补充材料：已有资料、截图、链接和限制。',
      '最后指定结果：清单、表格、短文、步骤或页面文案。',
    ],
    prompt:
      '请根据我的目标生成一份任务说明模板。模板要包含：目标、读者、已有材料、限制条件、希望得到什么结果。用中文，适合新手复制填写。',
    commonMistakes: [
      '只给一句话，期待工具猜完整背景。',
      '没有说读者是谁，内容容易不对味。',
      '没有说不要什么，结果多出很多没用内容。',
    ],
    sources: [
      {
        title: '工具办事说明',
        publisher: '开放工具资料站',
        url: 'https://platform.openai.com/docs/guides/function-calling',
      },
    ],
  },
  {
    id: 'talk-02',
    moduleId: 'talk',
    title: '想要什么样子，就提前说清楚',
    summary: '想要表格就说表格，想要清单就说清单，别让工具自由发挥。',
    duration: '十四分钟',
    difficulty: '容易',
    outcome: '你会得到一套稳定的输出格式写法。',
    steps: [
      '先选一种结果样子。',
      '告诉工具每一栏或每一段要包含什么。',
      '限制长度，避免一口气写太多。',
      '让它先给第一版，再根据你的意见修改。',
    ],
    prompt:
      '请按表格输出，列为：标题、给谁看、要解决的问题、具体步骤、最后产出。每一格都用短句，不要写长段落。',
    commonMistakes: [
      '没有指定样子，结果内容看起来很散。',
      '一次要求太多栏目，反而不好读。',
      '没有让它先出第一版，修改成本变高。',
    ],
    sources: [
      {
        title: '固定格式输出资料',
        publisher: '开放工具资料站',
        url: 'https://platform.openai.com/docs/guides/structured-outputs',
      },
    ],
  },
  {
    id: 'talk-03',
    moduleId: 'talk',
    title: '把难懂内容改成朋友能听懂的话',
    summary: '不是把内容变短，而是让普通人知道下一步怎么做。',
    duration: '十六分钟',
    difficulty: '容易',
    outcome: '你会得到一份适合售卖教程使用的改写模板。',
    steps: [
      '先找出原文里最难懂的词。',
      '把每个词换成生活化说法。',
      '把长段拆成短步骤。',
      '检查是否每一步都有动作。',
    ],
    prompt:
      '请把下面内容改成大白话。要求：不要出现生硬词；如果必须出现，请先用生活例子解释；每一步都要能让新手照着做。',
    commonMistakes: [
      '只是把词换简单，但步骤还是不清楚。',
      '为了显得厉害，保留太多难词。',
      '没有检查用户是否真的能照着做。',
    ],
    sources: [
      {
        title: '文字改写资料',
        publisher: '开放工具资料站',
        url: 'https://platform.openai.com/docs/guides/text',
      },
    ],
  },
  {
    id: 'tools-01',
    moduleId: 'tools',
    title: '不会找工具？先按任务分类',
    summary: '参考工具导航站的分类方法，先从任务出发，不从名字出发。',
    duration: '二十二分钟',
    difficulty: '容易',
    outcome: '你会做出一张自己的工具筛选表。',
    steps: [
      '先写清楚你要完成的任务：写字、做图、做视频、办公、搜索、编程或教育。',
      '到工具导航站按分类找三到五个候选工具。',
      '每个工具只看三点：能不能解决你的任务、上手难不难、是否适合中文。',
      '把最合适的一个放进自己的资料站，写一句推荐理由。',
    ],
    prompt:
      '请帮我整理一张工具筛选表。我的任务是：填这里。请按“候选工具、适合做什么、上手难不难、中文是否友好、我为什么选它”五栏输出。不要堆名词，用大白话。',
    commonMistakes: [
      '看到热门工具就收藏，最后一个也没用起来。',
      '只看功能很多，不看自己到底要完成什么任务。',
      '没有写推荐理由，过几天就忘了为什么收藏。',
    ],
    sources: [
      {
        title: '通往智能工具之路',
        publisher: '综合工具导航站',
        url: 'https://www.waytoagi.com/zh/sites',
      },
    ],
  },
  {
    id: 'tools-02',
    moduleId: 'tools',
    title: '别乱搬网上内容，要改成自己的教程',
    summary: '公开资料只能做参考，售卖内容要重新整理成自己的表达。',
    duration: '十八分钟',
    difficulty: '中等',
    outcome: '你会得到一份资料引用和改写规则。',
    steps: [
      '先找可信资料，不复制长文。',
      '只记录链接、主题和对你有用的点。',
      '用自己的话重写成步骤。',
      '在页面里放来源入口，方便用户继续查看。',
    ],
    prompt:
      '请根据我提供的公开资料入口，整理一份中文教程提纲。不要照搬原文，只提炼适合新手的步骤，并保留来源入口。',
    commonMistakes: [
      '把网上内容直接搬进来，容易有版权风险。',
      '来源太杂，用户不知道哪个可信。',
      '只堆链接，没有整理成自己的路径。',
    ],
    sources: [
      {
        title: '通往通用智能之路知识库',
        publisher: '公开知识库',
        url: 'https://waytoagi.feishu.cn/wiki/QPe5w5g7UisbEkkow8XcDmOpn8e',
      },
    ],
  },
  {
    id: 'tools-03',
    moduleId: 'tools',
    title: '让四个助手分别干四件事',
    summary: '一个负责找资料，一个负责写教程，一个负责改大白话，一个负责检查。',
    duration: '二十五分钟',
    difficulty: '中等',
    outcome: '你会得到一份四角色协作流程。',
    steps: [
      '先写出总目标。',
      '把任务拆成找资料、写教程、改口吻、做检查四块。',
      '给每一块写清楚输入材料和最后要交什么。',
      '最后让总负责人检查是否能拼成完整结果。',
    ],
    prompt:
      '请帮我把“制作一套可售卖教程资料站”拆给四个助手。每个助手只负责一件事，要写清楚输入材料、交付结果和检查标准。全部用中文大白话。',
    commonMistakes: [
      '所有事都丢给一个助手，结果输出很乱。',
      '没有规定每个助手的边界，内容容易重复。',
      '没有最后统一检查，拼起来会不顺。',
    ],
    sources: [
      {
        title: '多人协作工具资料',
        publisher: '开放工具资料站',
        url: 'https://openai.github.io/openai-agents-python/',
      },
    ],
  },
  {
    id: 'sell-01',
    moduleId: 'sell',
    title: '三小时做出能卖的第一版',
    summary: '第一版只保证三件事：能进入、能浏览、能复制。',
    duration: '二十分钟',
    difficulty: '容易',
    outcome: '你会得到正式售卖第一版的功能范围。',
    steps: [
      '保留卡密登录。',
      '登录后内容全部可看。',
      '教程详情里提供步骤和复制按钮。',
      '资料先放公开入口和占位文件，后续再做保护下载。',
    ],
    prompt:
      '请帮我收敛一个三小时内能看到效果的资料站版本。只保留卡密登录、内容浏览、教程详情、模板复制和资料入口。不要加入复杂后台。',
    commonMistakes: [
      '一开始就做支付、后台、文件权限，进度被拖住。',
      '没有真实教程内容，用户进来只看到空壳。',
      '首页看起来像管理系统，不像内容产品。',
    ],
    sources: [
      {
        title: '云端小入口说明',
        publisher: '腾讯云资料',
        url: 'https://docs.cloudbase.net/cbrf/intro',
      },
    ],
  },
  {
    id: 'sell-02',
    moduleId: 'sell',
    title: '把购买说明讲清楚',
    summary: '用户买到卡密以后，只需要知道去哪里输入、能看到什么、遇到问题找谁。',
    duration: '十五分钟',
    difficulty: '容易',
    outcome: '你会得到一段购买页和售后说明文案。',
    steps: [
      '写清楚购买后拿到什么。',
      '说明卡密怎么使用。',
      '说明当前版本包含哪些资料。',
      '写清楚售后联系和退款边界。',
    ],
    prompt:
      '请帮我写一段中文购买说明。要求：大白话，别夸大效果；说明购买后获得卡密，输入后可以查看资料站全部内容，并写清楚售后联系入口。',
    commonMistakes: [
      '承诺太满，容易引发售后问题。',
      '没有说交付形式，用户不知道买到什么。',
      '没有说明更新方式，用户会担心内容不够。',
    ],
    sources: [
      {
        title: '网页发布说明',
        publisher: '代码托管资料',
        url: 'https://docs.github.com/zh/pages',
      },
    ],
  },
  {
    id: 'sell-03',
    moduleId: 'sell',
    title: '上线前最后检查一遍',
    summary: '检查登录、内容、链接、复制按钮、手机显示和售后信息。',
    duration: '二十分钟',
    difficulty: '容易',
    outcome: '你会得到一张上线检查清单。',
    steps: [
      '用演示卡密登录一次。',
      '每个菜单都点一遍。',
      '复制每个模板，看是否能复制成功。',
      '打开资料入口，确认不会跳错。',
      '用手机尺寸看一遍有没有文字挤在一起。',
    ],
    prompt:
      '请帮我生成一份资料站上线前检查清单。要求：中文大白话，按登录、内容、资料、复制、手机显示、售后信息分组。',
    commonMistakes: [
      '只在自己电脑看，手机上可能不好用。',
      '资料入口没检查，用户点开后出错。',
      '没有准备售后说明，首批用户一问就慌。',
    ],
    sources: [
      {
        title: '发布流程说明',
        publisher: '代码托管资料',
        url: 'https://docs.github.com/zh/actions',
      },
    ],
  },
]

export const projectCases = [
  {
    id: 'case-01',
    title: '资料整理小站',
    summary: '把一堆教程、链接和模板整理成一个左侧菜单资料站。',
    deliverable: '页面雏形',
    steps: ['确定六个菜单入口', '整理四个内容模块', '补一节教程详情', '检查手机显示'],
    materials: ['教程标题', '资料入口', '模板文案'],
  },
  {
    id: 'case-02',
    title: '小白教程改写器',
    summary: '把生硬说明改成新手能看懂、能照做的步骤。',
    deliverable: '教程模板',
    steps: ['贴入原始资料', '提炼目标和步骤', '改成短句', '补上常见问题'],
    materials: ['原始资料', '读者画像', '语气要求'],
  },
  {
    id: 'case-03',
    title: '售卖页文案助手',
    summary: '把产品卖点、交付清单和常见问题整理成购买说明。',
    deliverable: '购买文案',
    steps: ['写清楚适合谁', '列出交付内容', '说明卡密使用', '补售后规则'],
    materials: ['价格规则', '交付清单', '客服方式'],
  },
  {
    id: 'case-04',
    title: '工具筛选清单',
    summary: '从综合工具导航站里挑出真正适合自己的工具，不乱收藏。',
    deliverable: '工具表',
    steps: ['写清任务', '按分类找工具', '试用三个候选', '写推荐理由'],
    materials: ['任务清单', '工具入口', '筛选表'],
  },
]

export const resourceLinks = [
  {
    id: 'res-01',
    title: '通往智能工具之路',
    description: '综合工具导航站，适合按文本、图像、视频、办公、教育等任务找工具。',
    type: '导航',
    publisher: '综合工具导航站',
    size: '外部入口',
    url: 'https://www.waytoagi.com/zh/sites',
  },
  {
    id: 'res-02',
    title: '通往通用智能之路知识库',
    description: '适合参考学习路径、工具分类和新手入门目录。',
    type: '知识',
    publisher: '公开知识库',
    size: '外部入口',
    url: 'https://waytoagi.feishu.cn/wiki/QPe5w5g7UisbEkkow8XcDmOpn8e',
  },
  {
    id: 'res-03',
    title: '现成助手导航',
    description: '适合找能直接办事的小助手，比如写标题、做海报、讲知识、整理内容。',
    type: '助手',
    publisher: '综合工具导航站',
    size: '外部入口',
    url: 'https://www.waytoagi.com/zh/agents',
  },
  {
    id: 'res-04',
    title: '提问稿导航',
    description: '适合参考别人怎么写提问稿，再改成自己的中文模板。',
    type: '提问',
    publisher: '综合工具导航站',
    size: '外部入口',
    url: 'https://www.waytoagi.com/zh/prompts',
  },
  {
    id: 'res-05',
    title: '智能助理入门资料',
    description: '适合了解智能助理能帮你做什么，以及如何把任务说清楚。',
    type: '资料',
    publisher: '开放工具资料站',
    size: '外部入口',
    url: 'https://platform.openai.com/docs/guides/agents',
  },
  {
    id: 'res-06',
    title: '工具办事说明',
    description: '适合理解工具什么时候开始办事，以及如何描述工具要做的事。',
    type: '资料',
    publisher: '开放工具资料站',
    size: '外部入口',
    url: 'https://platform.openai.com/docs/guides/function-calling',
  },
  {
    id: 'res-07',
    title: '云端小入口说明',
    description: '适合后续把卡密登录和资料保护放到云端。',
    type: '云端',
    publisher: '腾讯云资料',
    size: '外部入口',
    url: 'https://docs.cloudbase.net/cbrf/intro',
  },
  {
    id: 'res-08',
    title: '云端资料表说明',
    description: '适合后续存教程目录、章节、卡密、订单和资料索引。',
    type: '云端',
    publisher: '腾讯云资料',
    size: '外部入口',
    url: 'https://docs.cloudbase.net/database/introduce',
  },
  {
    id: 'res-09',
    title: '网页发布说明',
    description: '适合后续把页面发布到线上地址。',
    type: '发布',
    publisher: '代码托管资料',
    size: '外部入口',
    url: 'https://docs.github.com/zh/pages',
  },
]

export const promptTemplates = [
  {
    id: 'tpl-01',
    title: '教程改写模板',
    category: '教程',
    useFor: '把复杂内容讲简单',
    summary: '把原始资料改成新手能跟做的步骤。',
    copyText:
      '请把下面内容改成中文大白话教程。要求：先写做完能得到什么，再列三到五个步骤，最后写三个容易踩坑的地方。不要讲难词，每一步都要能照着做。',
  },
  {
    id: 'tpl-02',
    title: '小作品拆解模板',
    category: '项目',
    useFor: '把目标拆成步骤',
    summary: '把一个模糊想法拆成今天能完成的小作品。',
    copyText:
      '请把我的想法拆成一个今天能完成的小作品。输出包括：作品名称、适合谁、需要准备什么、四个步骤、最后能展示什么。全部用中文短句。',
  },
  {
    id: 'tpl-03',
    title: '工具筛选模板',
    category: '工具',
    useFor: '从导航站挑工具',
    summary: '按任务挑工具，不被热门名字带跑。',
    copyText:
      '请帮我整理一张工具筛选表。我的任务是：填这里。请按“候选工具、适合做什么、上手难不难、中文是否友好、我为什么选它”五栏输出。不要堆名词，用大白话。',
  },
  {
    id: 'tpl-04',
    title: '资料来源整理模板',
    category: '资料',
    useFor: '整理公开资料',
    summary: '把链接整理成主题、用途和改写方向。',
    copyText:
      '请根据这些公开资料入口，整理一份中文资料表。每条包含：资料名称、适合解决什么问题、我可以怎么改写成自己的教程、需要保留的来源入口。',
  },
  {
    id: 'tpl-05',
    title: '页面检查模板',
    category: '检查',
    useFor: '上线前自查',
    summary: '检查页面是否像一个能售卖的资料站。',
    copyText:
      '请帮我检查这个资料站页面。重点看：用户是否知道下一步点哪里、教程是否容易读、按钮是否能用、手机上是否拥挤、有没有学习压力感。用清单输出。',
  },
  {
    id: 'tpl-06',
    title: '购买说明模板',
    category: '售卖',
    useFor: '写购买页',
    summary: '把交付内容和卡密使用说清楚。',
    copyText:
      '请帮我写一段购买说明。要求：中文大白话，说明购买后得到卡密，输入后可查看资料站内容；列出包含的教程、模板、案例和资料入口；补充售后联系和退款边界。',
  },
  {
    id: 'tpl-07',
    title: '四个助手拆活模板',
    category: '协作',
    useFor: '把复杂任务分工',
    summary: '让不同助手分别找资料、写教程、改口吻、做检查。',
    copyText:
      '请把这个任务拆给四个助手：找资料、写教程、改成大白话、上线检查。每个助手都要写清楚输入、输出、不能做什么、完成标准。全部中文。',
  },
]

export const launchRoadmap = [
  { phase: '现在', title: '页面里先放真实教程内容' },
  { phase: '现在', title: '保留卡密进入和全站通行' },
  { phase: '下一步', title: '把卡密搬到云端资料表' },
  { phase: '下一步', title: '把大文件放到云端文件夹' },
  { phase: '后面', title: '补管理后台和自动发卡' },
]

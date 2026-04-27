<script setup>
import { computed, ref } from 'vue'
import {
  BookOpen,
  Box,
  Check,
  ChevronRight,
  Clock3,
  Code2,
  Copy,
  Download,
  FileText,
  FolderOpen,
  Home,
  Library,
  Play,
  Rocket,
  Search,
  Sparkles,
  User,
} from 'lucide-vue-next'

const activeMenu = ref('path')
const copiedPrompt = ref(false)
const toast = ref('')
const cardKey = ref('AGENT2026-ABC123')
const authToken = ref(window.localStorage.getItem('agent-studio-token') || '')
const isLoggingIn = ref(false)

const navItems = [
  { id: 'home', label: '首页', icon: Home },
  { id: 'path', label: '学习路径', icon: BookOpen },
  { id: 'resources', label: '资料库', icon: FolderOpen },
  { id: 'projects', label: '实战案例', icon: Code2 },
  { id: 'templates', label: '工具模板', icon: Library },
  { id: 'favorites', label: '收藏夹', icon: Box },
]

const sections = {
  home: {
    eyebrow: '自学入口',
    title: '今天继续做出一个小作品',
    subtitle: '快速找到下一篇教程、下一个项目和可复制资源，保持轻量节奏继续往前做。',
    action: '继续学习',
  },
  path: {
    eyebrow: '学习路径',
    title: '按顺序走，先做出来再理解',
    subtitle: '第一版先保留最短路径：入门、基础、实战、发布。每一步都用占位内容，后续替换真实资料。',
    action: '开始下一节',
  },
  projects: {
    eyebrow: '项目实战',
    title: '从一个小项目开始练手',
    subtitle: '这里没有提交和评分，你可以按示例拆解、复制素材、改成自己的版本。',
    action: '查看项目',
  },
  resources: {
    eyebrow: '资源库',
    title: '素材、源码和模板先放在这里',
    subtitle: '用统一卡片承载 PDF、源码、表格和资料包，后续替换成真实下载地址。',
    action: '浏览资源',
  },
  templates: {
    eyebrow: '工具模板',
    title: '从模板开始，不从空白页开始',
    subtitle: '这里放提示词、检查清单、项目结构和交付模板。第一版只做静态占位和复制入口。',
    action: '复制模板',
  },
  favorites: {
    eyebrow: '收藏夹',
    title: '把常用内容先收在一个地方',
    subtitle: '收藏夹只做个人资料整理，方便回到常用教程、模板和案例。',
    action: '查看收藏',
  },
}

const pathCards = [
  {
    title: '快速入门',
    desc: '了解界面、复制第一个提示词，跑通最小作品。',
    icon: Rocket,
    color: 'green',
    level: '新手友好',
    meta: '3 篇占位教程',
    state: '建议先看',
  },
  {
    title: 'Agent 基础',
    desc: '用通俗语言理解工具调用、上下文和执行步骤。',
    icon: Box,
    color: 'blue',
    level: '基础概念',
    meta: '5 篇占位教程',
    state: '适合第二步',
  },
  {
    title: '项目实战',
    desc: '用假数据做完整练习，后续替换真实项目案例。',
    icon: Code2,
    color: 'orange',
    level: '动手练习',
    meta: '4 个占位案例',
    state: '做中学',
  },
  {
    title: '发布上线',
    desc: '把作品整理、部署、分享，形成可复用流程。',
    icon: Sparkles,
    color: 'yellow',
    level: '交付流程',
    meta: '2 份检查清单',
    state: '最后再看',
  },
]

const suggestions = [
  { text: '先看「Agent 是什么？」这篇入门内容', state: '推荐' },
  { text: '复制一段提示词，生成一个小工具界面', state: '可复制' },
  { text: '打开项目实战示例，替换成自己的主题', state: '可跟做' },
  { text: '下载资源包，整理到本地文件夹', state: '稍后看' },
]

const resources = [
  { name: 'Agent 实操设计指南（入门版）', type: 'PDF', size: '1.2 MB', tone: 'red' },
  { name: '提示词与变量占位模板', type: 'DOC', size: '320 KB', tone: 'blue' },
  { name: '教程截图规范检查表', type: 'XLS', size: '560 KB', tone: 'green' },
  { name: '项目源码示例包（占位版）', type: 'ZIP', size: '8.6 MB', tone: 'purple' },
]

const recentItems = [
  { title: '课程：Agent 是什么？', meta: '今天 09:15', icon: Play },
  { title: '阅读：大模型输出结构', meta: '今天 10:02', icon: FileText },
  { title: '实战：做一个小工具', meta: '今天 11:40', icon: Code2 },
  { title: '笔记：今日学习结论', meta: '今天 12:10', icon: BookOpen },
]

const promptCards = [
  '帮我把这段教程改成小白能跟着做的步骤',
  '根据这个项目目标，列出 3 个可练习的小作品',
  '把下面的报错解释成人话，并告诉我下一步点哪里',
]

const current = computed(() => sections[activeMenu.value])
const isLoggedIn = computed(() => Boolean(authToken.value))

const mainCards = computed(() => {
  if (activeMenu.value === 'projects') {
    return [
      { ...pathCards[2], title: '网页小工具', meta: '案例占位 01', level: '跟做' },
      { ...pathCards[0], title: '自动周报助手', meta: '案例占位 02', level: '复制改造' },
      { ...pathCards[1], title: '资料整理 Agent', meta: '案例占位 03', level: '拆解' },
      { ...pathCards[3], title: '作品发布页', meta: '案例占位 04', level: '整理发布' },
    ]
  }

  if (activeMenu.value === 'resources') {
    return [
      { ...pathCards[0], title: '模板包', meta: '12 个占位文件', level: '可下载' },
      { ...pathCards[1], title: '源码包', meta: '6 个占位项目', level: '资料包' },
      { ...pathCards[2], title: '截图素材', meta: '18 张占位图', level: '可替换' },
      { ...pathCards[3], title: '检查清单', meta: '5 份表格', level: '表格' },
    ]
  }

  if (activeMenu.value === 'templates') {
    return [
      { ...pathCards[0], title: '写代码提示词', meta: '8 条占位模板', level: '复制' },
      { ...pathCards[1], title: '做设计提示词', meta: '6 条占位模板', level: '占位' },
      { ...pathCards[2], title: '排错提示词', meta: '9 条占位模板', level: '常用' },
      { ...pathCards[3], title: '发布提示词', meta: '4 条占位模板', level: '流程' },
    ]
  }

  if (activeMenu.value === 'favorites') {
    return [
      { ...pathCards[0], title: '常看教程', meta: '收藏占位', level: '教程' },
      { ...pathCards[1], title: '常用提示词', meta: '收藏占位', level: '模板' },
      { ...pathCards[2], title: '项目参考', meta: '收藏占位', level: '案例' },
      { ...pathCards[3], title: '交付清单', meta: '收藏占位', level: '清单' },
    ]
  }

  return pathCards
})

function showToast(message) {
  toast.value = message
  window.clearTimeout(showToast.timer)
  showToast.timer = window.setTimeout(() => {
    toast.value = ''
  }, 1800)
}

function copyPrompt() {
  copiedPrompt.value = true
  showToast('已复制一段占位提示词')
  window.setTimeout(() => {
    copiedPrompt.value = false
  }, 1500)
}

function downloadResource(name) {
  showToast(`已模拟下载：${name}`)
}

function getDeviceId() {
  const cached = window.localStorage.getItem('agent-studio-device-id')
  if (cached) return cached

  const deviceId = `web-${Math.random().toString(36).slice(2)}-${Date.now()}`
  window.localStorage.setItem('agent-studio-device-id', deviceId)
  return deviceId
}

async function loginWithCardKey() {
  isLoggingIn.value = true
  const endpoint = import.meta.env.VITE_AUTH_FUNCTION_URL

  try {
    let data

    if (endpoint) {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: cardKey.value,
          deviceId: getDeviceId(),
        }),
      })
      data = await response.json()
    } else {
      await new Promise((resolve) => window.setTimeout(resolve, 360))
      data = {
        success: cardKey.value.trim().toUpperCase() === 'AGENT2026-ABC123',
        token: 'local-demo-token',
        message: '本地演示登录成功',
      }
    }

    if (!data.success) {
      showToast(data.message || '卡密验证失败')
      return
    }

    authToken.value = data.token
    window.localStorage.setItem('agent-studio-token', data.token)
    showToast(data.message || '登录成功')
  } catch (error) {
    showToast('云函数调用失败，请检查 URL')
  } finally {
    isLoggingIn.value = false
  }
}

function logout() {
  authToken.value = ''
  window.localStorage.removeItem('agent-studio-token')
  showToast('已退出登录')
}
</script>

<template>
  <section v-if="!isLoggedIn" class="login-screen">
    <div class="login-shell">
      <div class="login-brand">
        <div class="brand-mark">
          <Sparkles :size="20" />
        </div>
        <div>
          <strong>Agent Studio</strong>
          <span>自学资料站</span>
        </div>
      </div>

      <div class="login-copy">
        <span class="eyebrow">卡密登录</span>
        <h1>输入卡密后，进入完整资料站</h1>
        <p>第一版先做最简单的访问控制：卡密验证通过后，站内教程、案例、资料和模板暂时全部可看。</p>
      </div>

      <form class="login-card" @submit.prevent="loginWithCardKey">
        <label>
          <span>卡密</span>
          <input v-model="cardKey" placeholder="AGENT2026-ABC123" autocomplete="one-time-code" />
        </label>
        <button type="submit" :disabled="isLoggingIn">
          {{ isLoggingIn ? '登录中...' : '进入学习工作台' }}
        </button>
        <p>本地演示卡密：AGENT2026-ABC123</p>
      </form>
    </div>

    <transition name="toast">
      <div v-if="toast" class="toast">{{ toast }}</div>
    </transition>
  </section>

  <div v-else class="app-shell">
    <aside class="sidebar" aria-label="主导航">
      <div class="brand">
        <div class="brand-mark">
          <Sparkles :size="19" />
        </div>
        <div>
          <strong>Agent Studio</strong>
          <span>自学资料站</span>
        </div>
      </div>

      <nav class="nav-list">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="nav-item"
          :class="{ active: activeMenu === item.id }"
          type="button"
          @click="activeMenu = item.id"
        >
          <component :is="item.icon" :size="17" />
          <span>{{ item.label }}</span>
        </button>
      </nav>

      <div class="sidebar-bottom">
        <div class="member-card">
          <div class="member-icon">
            <Sparkles :size="16" />
          </div>
          <strong>卡密已登录</strong>
          <span>第一版暂时开放全部占位内容</span>
          <button type="button" @click="logout">退出登录</button>
        </div>

        <div class="mini-note">
          <strong>最近打开</strong>
          <span>工具模板 / 项目模板</span>
        </div>
      </div>
    </aside>

    <main class="workspace">
      <header class="topbar">
        <label class="search">
          <Search :size="16" />
          <input placeholder="搜索课程、项目、资源、提示词..." />
          <kbd>⌘ K</kbd>
        </label>

        <div class="top-actions">
          <button class="user-chip" type="button">
            <span class="avatar"><User :size="16" /></span>
            <span>学习者_001</span>
            <ChevronRight :size="14" />
          </button>
          <button class="primary-button" type="button" @click="showToast('继续学习：打开占位章节')">
            继续学习
          </button>
        </div>
      </header>

      <section class="hero-panel">
        <div class="hero-copy">
          <span class="eyebrow">{{ current.eyebrow }}</span>
          <h1>{{ current.title }}</h1>
          <p>{{ current.subtitle }}</p>
        </div>

        <div class="continue-card">
          <div class="location-mark" aria-label="当前停留位置">
            <BookOpen :size="24" />
          </div>
          <div>
            <strong>最近停留：入门第 4 节</strong>
            <p>回到上次看到的位置，继续从一个可完成的小步骤开始。</p>
            <button type="button" @click="copyPrompt">
              {{ copiedPrompt ? '已复制' : current.action }}
            </button>
          </div>
        </div>
      </section>

      <section class="path-grid" aria-label="学习路径卡片">
        <article v-for="card in mainCards" :key="card.title" class="path-card">
          <div class="card-top">
            <div class="path-icon" :class="card.color">
              <component :is="card.icon" :size="21" />
            </div>
            <span class="level" :class="card.color">{{ card.level }}</span>
          </div>
          <h2>{{ card.title }}</h2>
          <p>{{ card.desc }}</p>
          <footer>
            <span>{{ card.state }}</span>
            <span><Clock3 :size="13" />{{ card.meta }}</span>
          </footer>
        </article>
      </section>

      <section class="content-grid">
        <article class="panel suggestions-panel">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">下一步建议</span>
              <h2>轻量提示，继续往前做</h2>
            </div>
            <button type="button">查看全部</button>
          </div>

          <div class="suggestion-list">
            <div v-for="item in suggestions" :key="item.text" class="suggestion-item">
              <span class="check" :class="{ muted: item.state === '稍后看' }">
                <Check :size="13" />
              </span>
              <p>{{ item.text }}</p>
              <em>{{ item.state }}</em>
            </div>
          </div>
        </article>

        <article class="panel resources-panel">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">推荐资源</span>
              <h2>下载占位资料</h2>
            </div>
            <button type="button" @click="activeMenu = 'resources'">资源库</button>
          </div>

          <div class="resource-list">
            <div v-for="item in resources" :key="item.name" class="resource-item">
              <span class="file-badge" :class="item.tone">{{ item.type }}</span>
              <p>{{ item.name }}</p>
              <small>{{ item.size }}</small>
              <button type="button" :aria-label="`下载${item.name}`" @click="downloadResource(item.name)">
                <Download :size="15" />
              </button>
            </div>
          </div>
        </article>
      </section>

      <section class="bottom-grid">
        <article class="panel prompt-panel">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">工具模板</span>
              <h2>随手复制的工作片段</h2>
            </div>
            <button type="button" @click="copyPrompt">
              <Copy :size="14" />
              复制
            </button>
          </div>

          <div class="prompt-list">
            <button v-for="prompt in promptCards" :key="prompt" type="button" @click="copyPrompt">
              {{ prompt }}
            </button>
          </div>
        </article>

        <article class="panel recent-panel">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">最近打开</span>
              <h2>回到上次位置</h2>
            </div>
          </div>

          <div class="timeline">
            <div v-for="item in recentItems" :key="item.title" class="timeline-item">
              <span><component :is="item.icon" :size="15" /></span>
              <div>
                <strong>{{ item.title }}</strong>
                <small>{{ item.meta }}</small>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>

    <transition name="toast">
      <div v-if="toast" class="toast">{{ toast }}</div>
    </transition>
  </div>
</template>

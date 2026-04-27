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
  ExternalLink,
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
import {
  launchRoadmap,
  learningModules,
  lessons,
  projectCases,
  promptTemplates,
  resourceLinks,
  saleHighlights,
  siteConfig,
} from './data/content'

const activeMenu = ref('path')
const copiedPrompt = ref(false)
const toast = ref('')
const cardKey = ref(siteConfig.demoKey)
const authToken = ref(window.localStorage.getItem('agent-studio-token') || '')
const isLoggingIn = ref(false)
const selectedModuleId = ref(learningModules[0]?.id || '')
const selectedLessonId = ref(lessons[0]?.id || '')

const navItems = [
  { id: 'home', label: '首页', icon: Home },
  { id: 'path', label: '学习路径', icon: BookOpen },
  { id: 'resources', label: '资料库', icon: FolderOpen },
  { id: 'projects', label: '实战案例', icon: Code2 },
  { id: 'templates', label: '工具模板', icon: Library },
  { id: 'favorites', label: '收藏夹', icon: Box },
]

const colorCycle = ['green', 'blue', 'orange', 'yellow']
const iconCycle = [Rocket, BookOpen, Code2, Sparkles]

const sections = {
  home: {
    eyebrow: '首版资料站',
    title: '先把教程做成可以买、能看、能复制的产品',
    subtitle: '当前版本把教程、模板、案例和资源先放在页面里，最快验证卡密售卖和内容交付体验。',
    action: '查看首节',
  },
  path: {
    eyebrow: '学习路径',
    title: '从第一个小作品走到上线交付',
    subtitle: '每一节都围绕一个可完成的小产出：看懂目标、照着做、复制模板、整理成自己的作品。',
    action: '复制本节提示词',
  },
  projects: {
    eyebrow: '实战案例',
    title: '用小项目撑起真实交付感',
    subtitle: '案例先用通用场景和公开资料搭骨架，后续替换成你的真实项目素材。',
    action: '查看案例',
  },
  resources: {
    eyebrow: '资料库',
    title: '资料入口、项目参考和交付材料集中放',
    subtitle: '外部资料只放入口，站内重点放你整理后的中文讲解和可复制步骤。',
    action: '打开资源',
  },
  templates: {
    eyebrow: '工具模板',
    title: '让用户从可复制模板开始',
    subtitle: '把常用提示词、检查清单和项目拆解模板做成按钮，降低第一次动手的阻力。',
    action: '复制模板',
  },
  favorites: {
    eyebrow: '收藏夹',
    title: '先把常用内容收在一起',
    subtitle: '第一版先展示推荐内容，正式版再记住每个用户自己收藏了什么。',
    action: '回到路径',
  },
}

const current = computed(() => sections[activeMenu.value])
const isLoggedIn = computed(() => Boolean(authToken.value))
const activeModule = computed(
  () => learningModules.find((module) => module.id === selectedModuleId.value) || learningModules[0],
)
const moduleLessons = computed(() =>
  lessons.filter((lesson) => lesson.moduleId === selectedModuleId.value),
)
const selectedLesson = computed(() => {
  const inModule = moduleLessons.value.find((lesson) => lesson.id === selectedLessonId.value)
  return inModule || moduleLessons.value[0] || lessons[0]
})
const nextLesson = computed(() => lessons[lessons.findIndex((item) => item.id === selectedLesson.value.id) + 1])

const mainCards = computed(() => {
  if (activeMenu.value === 'projects') {
    return projectCases.slice(0, 4).map((item, index) => ({
      id: item.id,
      title: item.title,
      desc: item.summary,
      icon: iconCycle[index % iconCycle.length],
      color: colorCycle[index % colorCycle.length],
      level: item.deliverable,
      meta: `${item.steps.length} 个步骤`,
      state: item.materials.slice(0, 2).join(' / '),
      type: 'project',
    }))
  }

  if (activeMenu.value === 'resources') {
    return resourceLinks.slice(0, 4).map((item, index) => ({
      id: item.id,
      title: item.title,
      desc: item.description,
      icon: index % 2 ? FileText : FolderOpen,
      color: colorCycle[index % colorCycle.length],
      level: item.type,
      meta: item.publisher,
      state: item.size || '外部链接',
      type: 'resource',
    }))
  }

  if (activeMenu.value === 'templates') {
    return promptTemplates.slice(0, 4).map((item, index) => ({
      id: item.id,
      title: item.title,
      desc: item.summary,
      icon: index % 2 ? Copy : Library,
      color: colorCycle[index % colorCycle.length],
      level: item.category,
      meta: item.useFor,
      state: '可复制',
      type: 'template',
    }))
  }

  if (activeMenu.value === 'favorites') {
    return [
      selectedLesson.value,
      promptTemplates[0],
      projectCases[0],
      resourceLinks[0],
    ].filter(Boolean).map((item, index) => ({
      id: item.id,
      title: item.title,
      desc: item.summary || item.description,
      icon: iconCycle[index % iconCycle.length],
      color: colorCycle[index % colorCycle.length],
      level: ['教程', '模板', '案例', '资源'][index],
      meta: index === 0 ? selectedLesson.value.duration : '推荐入口',
      state: '常用',
      type: ['lesson', 'template', 'project', 'resource'][index],
    }))
  }

  return learningModules.map((item, index) => ({
    id: item.id,
    title: item.title,
    desc: item.summary,
    icon: iconCycle[index % iconCycle.length],
    color: colorCycle[index % colorCycle.length],
    level: item.kicker,
    meta: item.duration,
    state: item.status,
    type: 'module',
  }))
})

const resourcePreview = computed(() => resourceLinks.slice(0, 4))
const templatePreview = computed(() => promptTemplates.slice(0, 3))
const heroHighlights = computed(() => saleHighlights.slice(0, 3))

function showToast(message) {
  toast.value = message
  window.clearTimeout(showToast.timer)
  showToast.timer = window.setTimeout(() => {
    toast.value = ''
  }, 1800)
}

function setActiveMenu(id) {
  activeMenu.value = id
}

function selectModule(moduleId) {
  selectedModuleId.value = moduleId
  selectedLessonId.value = lessons.find((lesson) => lesson.moduleId === moduleId)?.id || selectedLessonId.value
  activeMenu.value = 'path'
}

function selectLesson(lesson) {
  selectedModuleId.value = lesson.moduleId
  selectedLessonId.value = lesson.id
  activeMenu.value = 'path'
}

async function copyText(text, label = '内容') {
  copiedPrompt.value = true

  try {
    await navigator.clipboard?.writeText(text)
    showToast(`已复制${label}`)
  } catch (error) {
    showToast('浏览器暂不允许自动复制，请手动选中文本')
  }

  window.setTimeout(() => {
    copiedPrompt.value = false
  }, 1500)
}

function handleCardClick(card) {
  if (card.type === 'module') {
    selectModule(card.id)
    return
  }

  if (card.type === 'template') {
    const template = promptTemplates.find((item) => item.id === card.id)
    copyText(template?.copyText || card.title, '模板')
    return
  }

  showToast(`已打开：${card.title}`)
}

function downloadResource(name) {
  showToast(`已记录资源入口：${name}`)
}

function resourceTone(type) {
  const lower = type.toLowerCase()
  if (lower.includes('导航')) return 'yellow'
  if (lower.includes('知识') || lower.includes('助手')) return 'blue'
  if (lower.includes('提问') || lower.includes('发布')) return 'purple'
  if (lower.includes('云端')) return 'green'
  if (lower.includes('doc')) return 'blue'
  if (lower.includes('代码') || lower.includes('github')) return 'purple'
  if (lower.includes('清单') || lower.includes('guide')) return 'green'
  return 'red'
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
        success: cardKey.value.trim().toUpperCase() === siteConfig.demoKey,
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
    showToast('云端登录调用失败，请检查地址')
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
      <div>
        <div class="login-brand">
          <div class="brand-mark">
            <Sparkles :size="20" />
          </div>
          <div>
            <strong>{{ siteConfig.brandName }}</strong>
            <span>{{ siteConfig.subtitle }}</span>
          </div>
        </div>

        <div class="login-copy">
          <span class="eyebrow">卡密登录</span>
          <h1>{{ siteConfig.loginTitle }}</h1>
          <p>{{ siteConfig.loginDescription }}</p>
        </div>
      </div>

      <form class="login-card" @submit.prevent="loginWithCardKey">
        <label>
          <span>卡密</span>
          <input v-model="cardKey" :placeholder="siteConfig.demoKey" autocomplete="one-time-code" />
        </label>
        <button type="submit" :disabled="isLoggingIn">
          {{ isLoggingIn ? '登录中...' : '进入资料站' }}
        </button>
        <p>本地演示卡密：{{ siteConfig.demoKey }}</p>
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
          <strong>{{ siteConfig.brandName }}</strong>
          <span>{{ siteConfig.subtitle }}</span>
        </div>
      </div>

      <nav class="nav-list">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="nav-item"
          :class="{ active: activeMenu === item.id }"
          type="button"
          @click="setActiveMenu(item.id)"
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
          <span>首版全站通行，教程、案例、资料和模板都可查看。</span>
          <button type="button" @click="logout">退出登录</button>
        </div>

        <div class="mini-note">
          <strong>首版售卖</strong>
          <span>{{ siteConfig.offerLine }}</span>
        </div>
      </div>
    </aside>

    <main class="workspace">
      <header class="topbar">
        <label class="search">
          <Search :size="16" />
          <input :placeholder="siteConfig.searchPlaceholder" />
          <kbd>搜索</kbd>
        </label>

        <div class="top-actions">
          <button class="user-chip" type="button">
            <span class="avatar"><User :size="16" /></span>
            <span>{{ siteConfig.userName }}</span>
            <ChevronRight :size="14" />
          </button>
          <button class="primary-button" type="button" @click="selectLesson(selectedLesson)">
            继续阅读
          </button>
        </div>
      </header>

      <section class="hero-panel">
        <div class="hero-copy">
          <span class="eyebrow">{{ current.eyebrow }}</span>
          <h1>{{ current.title }}</h1>
          <p>{{ current.subtitle }}</p>
          <div class="hero-pills" aria-label="首版售卖亮点">
            <span v-for="item in heroHighlights" :key="item.title">{{ item.title }}</span>
          </div>
        </div>

        <div class="continue-card">
          <div class="location-mark" aria-label="当前推荐章节">
            <BookOpen :size="24" />
          </div>
          <div>
            <strong>{{ selectedLesson.title }}</strong>
            <p>{{ selectedLesson.outcome }}</p>
            <button type="button" @click="copyText(selectedLesson.prompt, '本节提示词')">
              {{ copiedPrompt ? '已复制' : current.action }}
            </button>
          </div>
        </div>
      </section>

      <section class="path-grid" aria-label="内容入口卡片">
        <article
          v-for="card in mainCards"
          :key="card.title"
          class="path-card"
          :class="{ selected: card.id === selectedModuleId }"
          @click="handleCardClick(card)"
        >
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

      <section class="lesson-section">
        <article class="panel lesson-list-panel">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">{{ activeModule.kicker }}</span>
              <h2>{{ activeModule.title }}</h2>
            </div>
            <button type="button" @click="setActiveMenu('path')">全部章节</button>
          </div>

          <div class="lesson-list">
            <button
              v-for="lesson in moduleLessons"
              :key="lesson.id"
              type="button"
              class="lesson-row"
              :class="{ active: selectedLesson.id === lesson.id }"
              @click="selectLesson(lesson)"
            >
              <span><Play :size="13" /></span>
              <strong>{{ lesson.title }}</strong>
              <small>{{ lesson.difficulty }} · {{ lesson.duration }}</small>
            </button>
          </div>
        </article>

        <article class="panel lesson-detail-panel">
          <div class="lesson-title-row">
            <div>
              <span class="panel-kicker">当前教程</span>
              <h2>{{ selectedLesson.title }}</h2>
              <p>{{ selectedLesson.summary }}</p>
            </div>
            <button type="button" @click="copyText(selectedLesson.prompt, '本节提示词')">
              <Copy :size="14" />
              复制
            </button>
          </div>

          <div class="outcome-card">
            <strong>本节做完得到什么</strong>
            <span>{{ selectedLesson.outcome }}</span>
          </div>

          <ol class="step-list">
            <li v-for="step in selectedLesson.steps" :key="step">{{ step }}</li>
          </ol>

          <div class="prompt-box">
            <div>
              <span>可复制提示词</span>
              <button type="button" @click="copyText(selectedLesson.prompt, '本节提示词')">
                <Copy :size="13" />
                复制文本
              </button>
            </div>
            <pre>{{ selectedLesson.prompt }}</pre>
          </div>

          <div class="lesson-meta-grid">
            <div>
              <strong>容易卡住的地方</strong>
              <p v-for="item in selectedLesson.commonMistakes" :key="item">{{ item }}</p>
            </div>
            <div>
              <strong>参考来源</strong>
              <a
                v-for="source in selectedLesson.sources"
                :key="source.url"
                :href="source.url"
                target="_blank"
                rel="noreferrer"
              >
                {{ source.title }}
                <ExternalLink :size="12" />
              </a>
            </div>
          </div>
        </article>
      </section>

      <section class="content-grid">
        <article class="panel suggestions-panel">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">上线节奏</span>
              <h2>先卖起来，再迁后台</h2>
            </div>
            <button type="button" @click="showToast('这部分后续可搬到云端资料表')">执行清单</button>
          </div>

          <div class="suggestion-list">
            <div v-for="item in launchRoadmap" :key="item.title" class="suggestion-item">
              <span class="check">
                <Check :size="13" />
              </span>
              <p>{{ item.title }}</p>
              <em>{{ item.phase }}</em>
            </div>
          </div>
        </article>

        <article class="panel resources-panel">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">推荐资源</span>
              <h2>可信资料入口</h2>
            </div>
            <button type="button" @click="activeMenu = 'resources'">资源库</button>
          </div>

          <div class="resource-list">
            <a
              v-for="item in resourcePreview"
              :key="item.title"
              class="resource-item"
              :href="item.url"
              target="_blank"
              rel="noreferrer"
              @click="downloadResource(item.title)"
            >
              <span class="file-badge" :class="resourceTone(item.type)">{{ item.type }}</span>
              <p>{{ item.title }}</p>
              <small>{{ item.publisher }}</small>
              <span class="resource-action" :aria-label="`打开${item.title}`">
                <Download :size="15" />
              </span>
            </a>
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
            <button type="button" @click="copyText(templatePreview[0].copyText, '模板')">
              <Copy :size="14" />
              复制
            </button>
          </div>

          <div class="prompt-list">
            <button
              v-for="template in templatePreview"
              :key="template.id"
              type="button"
              @click="copyText(template.copyText, '模板')"
            >
              <strong>{{ template.title }}</strong>
              <span>{{ template.summary }}</span>
            </button>
          </div>
        </article>

        <article class="panel recent-panel">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">内容路线</span>
              <h2>从入门到交付</h2>
            </div>
          </div>

          <div class="timeline">
            <div v-for="module in learningModules" :key="module.id" class="timeline-item">
              <span><BookOpen :size="15" /></span>
              <div>
                <strong>{{ module.title }}</strong>
                <small>{{ module.duration }}</small>
              </div>
            </div>
          </div>

          <div v-if="nextLesson" class="next-card">
            <FileText :size="16" />
            <span>下一节：{{ nextLesson.title }}</span>
          </div>
        </article>
      </section>
    </main>

    <transition name="toast">
      <div v-if="toast" class="toast">{{ toast }}</div>
    </transition>
  </div>
</template>

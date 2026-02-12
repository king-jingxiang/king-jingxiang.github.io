# Personal Website Design Document

## 1. 技能总结 (Skills Summary)

在开始设计之前，总结本项目将使用的三个核心前端技能：

*   **`web-artifacts-builder` (构建工具)**:
    *   **核心能力**: 提供了一套基于 React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui 的现代前端开发脚手架。
    *   **用途**: 用于快速搭建项目基础结构，提供高质量的 UI 组件库 (shadcn/ui)，并支持将项目打包为可以在浏览器中直接运行的产物（虽然本项目是 GitHub Pages，但其开发栈完全适用）。
    *   **关键词**: React, Tailwind, 组件化, 现代化构建。

*   **`frontend-design` (设计指导)**:
    *   **核心能力**: 提供高水准的 UI/UX 设计原则，拒绝平庸的 AI 生成感。强调排版（Typography）、色彩（Color）、动效（Motion）和空间布局（Spatial Composition）。
    *   **用途**: 指导本项目的视觉风格设计，确保网站具有独特的个人品牌调性，无论是极简主义还是大胆的视觉风格，都要求细节精致、交互流畅。
    *   **关键词**: 高级感, 独特审美, 动效, 视觉冲击力。

*   **`theme-factory` (主题定制)**:
    *   **核心能力**: 提供预设的专业配色方案和字体搭配（如 "Ocean Depths", "Modern Minimalist" 等），或生成自定义主题。
    *   **用途**: 为网站确立统一的视觉主色调和字体规范，确保全局样式的一致性和专业度。
    *   **关键词**: 配色方案, 字体搭配, 一致性。

---

## 2. 项目设计概览 (Project Overview)

本项目旨在构建一个展示个人技术实力、开源贡献和技术文章的现代化个人网站。网站将托管在 GitHub Pages 上，采用数据与视图分离的架构。

### 核心目标
1.  **动态化**: 拒绝硬编码，项目数据和文章内容均通过网络请求获取。
2.  **高颜值**: 利用 `frontend-design` 的原则，打造具有设计感的界面。
3.  **体验好**: 响应式布局，加载速度快，交互流畅。

## 3. 技术架构 (Technical Architecture)

### 技术栈
*   **Framework**: React 18 (通过 Vite 构建)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **UI Library**: shadcn/ui (Radix UI based)
*   **Routing**: React Router (用于页面/视图导航)
*   **Icons**: Lucide React
*   **Animations**: Framer Motion (用于页面切换和滚动动画)
*   **Markdown Rendering**: `react-markdown` + `rehype-highlight` (用于文章渲染)

### 数据源架构

#### 1. 开源项目展示 (Open Source Projects)
*   **数据来源**: GitHub REST API
*   **获取方式**: 客户端直接调用 `https://api.github.com/users/king-jingxiang/repos` 或特定 API。
*   **筛选策略**:
    *   优先展示 Pinned Repositories (由于 GitHub API 不直接返回 pinned 状态，优先展示star数高的项目)。
*   **展示内容**: 项目名称、描述、Star 数、Fork 数、主要语言、Demo 链接。

#### 2. 文章系统 (Blog System)
*   **数据来源**: AWS S3 (或兼容的对象存储，通过 HTTP 公开访问)。
*   **存储结构**:
    *   `https://{s3-url}/king-jingxiang/articles/index.json`: 文章索引文件，包含所有文章的元数据（标题、简介、分类、日期、Slug/文件名、封面图 URL）。
    *   `https://{s3-url}/king-jingxiang/articles/{category}/{slug}.md`: 具体的 Markdown 文章内容。
    *   **目前还没有数据，请你设计数据结构并mock数据**
*   **流程**:
    1.  网站加载时，异步请求 `index.json`。
    2.  前端渲染文章列表和分类筛选器。
    3.  用户点击文章，异步请求对应的 `.md` 文件并渲染。

## 4. 页面设计 (UI/UX Design)

基于 `frontend-design` 技能的指导，我们将采用 **"Modern Clean & Bold"** 风格。

### 视觉风格
*   **主题**: 默认支持深色/浅色模式切换（跟随系统或手动切换）。
*   **排版**: 使用大字号标题（Display Fonts）强调重点，正文使用高可读性无衬线字体。
*   **布局**: 适当的留白（Negative Space），避免拥挤。使用 Grid 布局展示卡片。
*   **动效**:
    *   Hero 区域文字渐入效果。
    *   项目/文章卡片 Hover 时的轻微上浮和阴影加深。
    *   页面切换时的淡入淡出。

### 页面结构

#### A. 首页 (Home / Landing)
1.  **Hero Section**:
    *   个人头像/Logo。
    *   一句话介绍（Tagline）。
    *   社交链接（GitHub, Twitter, LinkedIn, Email）。
    *   *设计点*: 可能包含一个微妙的动态背景或 3D 元素。
2.  **Featured Projects (热门项目)**:
    *   Grid 布局展示 Top 3-6 个开源项目。
    *   显示动态数据（Stars, Forks）。
3.  **Recent Articles (最新文章)**:
    *   列表或卡片形式展示最新发布的几篇文章。

#### B. 文章列表页 (Blog / Articles)
*   **Sidebar/Top Filter**: 文章分类筛选（如 Frontend, Backend, AI, Life）。
*   **Article List**: 带摘要的文章列表，支持分页或无限加载。

#### C. 文章详情页 (Article Detail)
*   **Header**: 大标题、发布时间、分类标签。
*   **Content**: Markdown 渲染区域。
    *   支持代码高亮。
    *   支持图片懒加载。
    *   支持各级标题的 Anchor 导航（目录）。
*   **Footer**: 评论系统 (Giscus) 和 RSS 订阅入口。

## 5. 开发路线图 (Roadmap)

1.  **初始化**: 使用 `web-artifacts-builder` 脚本初始化项目结构。
2.  **基础设施**: 配置 Tailwind, shadcn/ui, 路由。
3.  **核心组件开发**:
    *   Layout (Navbar, Footer).
    *   ProjectCard (API 数据对接).
    *   ArticleList & ArticleViewer (S3 数据对接 + Markdown 渲染).
4.  **页面组装**: 完成 Home, Blog, Article 页面。
5.  **设计打磨**: 应用 `theme-factory` 选定配色，添加 Framer Motion 动效。
6.  **部署**: 配置 GitHub Actions 自动部署到 GitHub Pages。
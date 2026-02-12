# 个人网站 (v2)

这是一个基于 React, TypeScript 和 Vite 构建的现代化个人作品集网站。本项目旨在展示个人技术研究、开源贡献和技术文章，注重设计感与用户体验。

## 🌟 项目概览

本项目采用数据与视图分离的架构，托管于 GitHub Pages。
*   **动态化**: 拒绝硬编码，项目数据和文章内容均通过网络请求获取。
*   **高颜值**: 遵循现代设计原则，强调排版、色彩、动效和空间布局。
*   **体验好**: 响应式布局，加载速度快，交互流畅。

## 🛠 技术栈

*   **框架**: React 18 (Vite)
*   **语言**: TypeScript
*   **样式**: Tailwind CSS
*   **UI 库**: shadcn/ui (基于 Radix UI)
*   **路由**: React Router
*   **图标**: Lucide React
*   **动效**: Framer Motion
*   **Markdown 渲染**: react-markdown + rehype-highlight

## 🏗 技术架构

### 开源项目展示
*   **数据来源**: GitHub REST API
*   **逻辑**: 动态获取仓库列表，优先展示 Pinned Repositories 或高 Star 项目。

### 文章系统
*   **数据来源**: AWS S3 (或兼容的对象存储)
*   **存储结构**:
    *   `index.json`: 包含所有文章元数据的索引文件。
    *   `{category}/{slug}.md`: 具体的 Markdown 文章内容。

## 🚀 快速开始

### 前置要求
*   Node.js (建议 v18 或更高版本)
*   pnpm (或 npm/yarn)

### 安装

```bash
# 克隆仓库
git clone https://github.com/king-jingxiang/king-jingxiang.github.io.git

# 进入目录
cd king-jingxiang.github.io

# 安装依赖
pnpm install
```

### 开发

```bash
pnpm dev
```

### 构建

```bash
pnpm build
```

## 📅 开发路线图

1.  **初始化**: 使用 `web-artifacts-builder` 脚本初始化项目结构。
2.  **基础设施**: 配置 Tailwind, shadcn/ui 和 路由。
3.  **核心组件开发**: Layout, ProjectCard, ArticleList, ArticleViewer。
4.  **页面组装**: 完成 首页 (Home), 博客列表 (Blog), 文章详情 (Article Detail)。
5.  **设计打磨**: 应用主题配色和 Framer Motion 动效。
6.  **部署**: 配置 GitHub Actions 自动部署到 GitHub Pages。

## 📄 许可证

MIT

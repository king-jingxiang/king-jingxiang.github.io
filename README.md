# Personal Website (v2)

A modern, dynamic personal portfolio website built with React, TypeScript, and Vite. This project showcases technical skills, open-source contributions, and technical articles with a high-quality, design-focused interface.

## 🌟 Project Overview

This project aims to build a personal website that separates data from views, hosted on GitHub Pages.
*   **Dynamic**: No hardcoded content. Data and articles are fetched via network requests.
*   **High Quality Design**: Follows modern design principles with a focus on typography, color, motion, and spatial composition.
*   **Great UX**: Responsive layout, fast loading, and smooth interactions.

## 🛠 Tech Stack

*   **Framework**: React 18 (Vite)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **UI Library**: shadcn/ui (Radix UI based)
*   **Routing**: React Router
*   **Icons**: Lucide React
*   **Animations**: Framer Motion
*   **Markdown**: react-markdown + rehype-highlight

## 🏗 Architecture

### Open Source Projects
*   **Source**: GitHub REST API
*   **Logic**: Fetches repositories dynamically, prioritizing pinned or high-star projects.

### Blog System
*   **Source**: AWS S3 (or compatible object storage)
*   **Structure**:
    *   `index.json`: Metadata for all articles.
    *   `{category}/{slug}.md`: Markdown content for individual articles.

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18 or later recommended)
*   pnpm (or npm/yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/king-jingxiang/king-jingxiang.github.io_v2.git

# Enter the directory
cd king-jingxiang.github.io_v2

# Install dependencies
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

## 📅 Roadmap

1.  **Initialization**: Project structure setup with `web-artifacts-builder`.
2.  **Infrastructure**: Tailwind, shadcn/ui, and Routing configuration.
3.  **Core Components**: Layout, ProjectCard, ArticleList, ArticleViewer.
4.  **Pages**: Home, Blog, Article Detail.
5.  **Design Polish**: Theming and Animations (`theme-factory`, Framer Motion).
6.  **Deployment**: GitHub Actions for automatic deployment.

## 📄 License

MIT

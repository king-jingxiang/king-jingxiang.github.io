export interface Project {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
}

export interface Article {
  title: string
  description: string
  category: string
  date: string
  slug: string
  cover?: string
}

const S3_BASE_URL = "https://pub-f31a5865021b44d0a2c4003b3da37f04.r2.dev"

export const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    name: "web-artifacts-builder",
    description: "A suite of tools for creating elaborate claude.ai artifacts.",
    html_url: "https://github.com/king-jingxiang/web-artifacts-builder",
    stargazers_count: 120,
    forks_count: 30,
    language: "TypeScript",
  },
  {
    id: 2,
    name: "theme-factory",
    description: "Toolkit for styling artifacts with professional themes.",
    html_url: "https://github.com/king-jingxiang/theme-factory",
    stargazers_count: 85,
    forks_count: 12,
    language: "CSS",
  },
  {
    id: 3,
    name: "frontend-design",
    description: "Design system and guidelines for modern web applications.",
    html_url: "https://github.com/king-jingxiang/frontend-design",
    stargazers_count: 200,
    forks_count: 45,
    language: "Markdown",
  },
]

export const MOCK_ARTICLES: Article[] = [
  {
    title: "Building a Modern Personal Website",
    description: "How I built my personal website using React, Vite, and Tailwind CSS.",
    category: "Frontend",
    date: "2023-10-01",
    slug: "building-modern-personal-website",
  },
  {
    title: "Understanding React Server Components",
    description: "A deep dive into the architecture of React Server Components.",
    category: "React",
    date: "2023-09-15",
    slug: "understanding-rsc",
  },
  {
    title: "The Future of Web Development",
    description: "Trends and technologies shaping the future of the web.",
    category: "Tech",
    date: "2023-08-20",
    slug: "future-web-dev",
  },
]

export async function getProjects(): Promise<Project[]> {
  const username = "king-jingxiang"
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=6`)
    if (!response.ok) {
      throw new Error("Failed to fetch projects")
    }
    const data = await response.json()
    // Filter out forks if desired, or sort by stars.
    // The design doc says: "prioritize pinned (not available in API) -> star count".
    // API sort by 'pushed' or 'updated' or 'full_name'.
    // We can fetch more and sort locally.
    // But for now, let's just return what we get, maybe sort by stars.
    return data.sort((a: Project, b: Project) => b.stargazers_count - a.stargazers_count)
  } catch (error) {
    console.warn("Using mock projects due to error:", error)
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_PROJECTS), 500))
  }
}

export async function getArticles(): Promise<Article[]> {
  if (!S3_BASE_URL) {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_ARTICLES), 500))
  }

  try {
    const response = await fetch(`${S3_BASE_URL}/king-jingxiang/articles/index.json`)
    if (!response.ok) {
      throw new Error("Failed to fetch articles index")
    }
    return await response.json()
  } catch (error) {
    console.warn("Using mock articles due to error:", error)
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_ARTICLES), 500))
  }
}

export async function getArticle(slug: string): Promise<string> {
  if (!S3_BASE_URL) {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_ARTICLE_CONTENT(slug)), 500))
  }

  try {
    // We need the category to construct the path.
    // Since we don't have it, we fetch the index to look it up.
    // In a real app, we might want to cache this index or pass the category via routing.
    const articles = await getArticles()
    const article = articles.find((a) => a.slug === slug)
    
    if (!article) {
      throw new Error(`Article not found: ${slug}`)
    }

    const response = await fetch(`${S3_BASE_URL}/king-jingxiang/articles/${article.category}/${article.slug}.md`)
    if (!response.ok) {
      throw new Error("Failed to fetch article content")
    }
    return await response.text()
  } catch (error) {
    console.warn("Using mock article content due to error:", error)
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_ARTICLE_CONTENT(slug)), 500))
  }
}

const MOCK_ARTICLE_CONTENT = (slug: string) => `# ${slug}

This is a mock article content for **${slug}**.

## Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Code Example

\`\`\`tsx
console.log("Hello World")
\`\`\`
`

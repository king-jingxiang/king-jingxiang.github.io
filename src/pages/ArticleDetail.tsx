import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import { getArticle } from "@/lib/api"
import "highlight.js/styles/github-dark.css"

const removeFrontMatter = (text: string) => {
  return text.replace(/^---\n[\s\S]*?\n---\n?/, "")
}

export function ArticleDetail() {
  const { slug } = useParams()
  const [content, setContent] = useState<string | null>(null)

  useEffect(() => {
    if (slug) {
      getArticle(slug).then((text) => setContent(removeFrontMatter(text)))
    }
  }, [slug])

  if (!content) {
    return <div className="container mx-auto py-10 text-center">Loading...</div>
  }

  return (
    <article className="container mx-auto max-w-3xl py-10 prose dark:prose-invert lg:prose-xl prose-h1:text-center prose-img:mx-auto">
       <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {content}
       </ReactMarkdown>
    </article>
  )
}

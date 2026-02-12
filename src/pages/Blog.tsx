import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getArticles, type Article } from "@/lib/api"

export function Blog() {
  const [articles, setArticles] = useState<Article[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    getArticles().then(setArticles)
  }, [])

  const categories = Array.from(new Set(articles.map((article) => article.category)))
  const filteredArticles = selectedCategory
    ? articles.filter((article) => article.category === selectedCategory)
    : articles

  return (
    <div className="container py-10">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="space-y-4">
          <h1 className="inline-block font-bold text-4xl tracking-tight lg:text-5xl">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            A collection of thoughts on software development, design, and more.
          </p>
        </div>
      </div>
      <div className="my-8 flex justify-center gap-2 flex-wrap">
         <Badge 
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/90"
            onClick={() => setSelectedCategory(null)}
         >
            All
         </Badge>
         {categories.map(category => (
            <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/90"
                onClick={() => setSelectedCategory(category)}
            >
                {category}
            </Badge>
         ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <Link key={article.slug} to={`/blog/${article.slug}`} className="group h-full">
            <Card className="h-full transition-all hover:bg-muted/50 hover:shadow-md hover:-translate-y-1 duration-300">
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span className="text-sm text-muted-foreground">{article.date}</span>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">{article.title}</CardTitle>
                <CardDescription className="line-clamp-3 mt-2">
                  {article.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

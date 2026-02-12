import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getArticles, type Article } from "@/lib/api"
import { X } from "lucide-react"

export function Blog() {
  const [articles, setArticles] = useState<Article[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    getArticles().then(setArticles)
  }, [])

  const categories = Array.from(new Set(articles.map((article) => article.category)))
  
  const filteredArticles = articles.filter((article) => {
    if (selectedTag) {
      return article.tags?.includes(selectedTag)
    }
    if (selectedCategory) {
      return article.category === selectedCategory
    }
    return true
  })

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category)
    setSelectedTag(null)
  }

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault()
    setSelectedTag(tag)
    setSelectedCategory(null)
  }

  const clearTag = () => {
    setSelectedTag(null)
  }

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
      
      <div className="my-8 flex flex-col items-center gap-4">
        <div className="flex justify-center gap-2 flex-wrap">
          <Badge 
              variant={selectedCategory === null && selectedTag === null ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/90"
              onClick={() => handleCategoryClick(null)}
          >
              All
          </Badge>
          {categories.map(category => (
              <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/90"
                  onClick={() => handleCategoryClick(category)}
              >
                  {category}
              </Badge>
          ))}
        </div>
        
        {selectedTag && (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <span className="text-sm text-muted-foreground">Filtered by tag:</span>
            <Badge 
              variant="secondary" 
              className="cursor-pointer hover:bg-secondary/80 gap-1 pr-1"
              onClick={clearTag}
            >
              {selectedTag}
              <X className="h-3 w-3" />
            </Badge>
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <Link key={article.slug} to={`/blog/${article.slug}`} className="group h-full">
            <Card className="h-full flex flex-col transition-all hover:bg-muted/50 hover:shadow-md hover:-translate-y-1 duration-300">
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
              <CardContent className="mt-auto pt-0">
                <div className="flex flex-wrap gap-2">
                  {article.tags?.map(tag => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={(e) => handleTagClick(e, tag)}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

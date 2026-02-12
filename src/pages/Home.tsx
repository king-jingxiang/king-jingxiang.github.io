import { useEffect, useState } from "react"
import { Github, Twitter, Linkedin, Mail, Star, GitFork } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getProjects, type Project, getArticles, type Article } from "@/lib/api"

export function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    getProjects().then(setProjects)
    getArticles().then(setArticles)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center gap-6 py-24 text-center md:py-32">
        <div className="rounded-full bg-muted p-4 animate-in fade-in zoom-in duration-500">
            <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-primary to-secondary" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-in slide-in-from-bottom-4 duration-700">
          <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
            Building digital products,
          </span>
          <br className="hidden sm:inline" />
          sharing knowledge.
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 animate-in slide-in-from-bottom-6 duration-1000">
          I'm Jingxiang, a software engineer passionate about open source, frontend architecture, and building tools that empower developers.
        </p>
        <div className="flex gap-4 animate-in slide-in-from-bottom-8 duration-1000 delay-200">
          <Button asChild size="lg">
            <a href="https://github.com/king-jingxiang" target="_blank" rel="noreferrer">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/blog">Read Blog</Link>
          </Button>
        </div>
        <div className="flex gap-4 mt-4 animate-in slide-in-from-bottom-10 duration-1000 delay-300">
             {/* Social Links */}
             <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
             </a>
             <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
             </a>
             <a href="mailto:contact@jingxiang.ai" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-5 w-5" />
             </a>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="container py-12 md:py-24 lg:py-32 bg-muted/50 rounded-3xl">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-12">
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
            Featured Projects
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Open source projects I've contributed to or maintained.
          </p>
        </div>
        <div className="grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:gap-8 mx-auto">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col justify-between hover:shadow-lg transition-shadow hover:-translate-y-1 duration-300">
              <CardHeader>
                <CardTitle className="line-clamp-1">{project.name}</CardTitle>
                <CardDescription className="line-clamp-2">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <div className="mr-1 h-3 w-3 rounded-full bg-sky-500" />
                    {project.language}
                  </div>
                  <div className="flex items-center">
                    <Star className="mr-1 h-3 w-3" />
                    {project.stargazers_count}
                  </div>
                  <div className="flex items-center">
                    <GitFork className="mr-1 h-3 w-3" />
                    {project.forks_count}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                 <Button variant="secondary" className="w-full" asChild>
                    <a href={project.html_url} target="_blank" rel="noreferrer">View Project</a>
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Articles */}
      <section className="container py-12 md:py-24 lg:py-32">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center mb-12">
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
            Recent Articles
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Thoughts on software development, architecture, and more.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] lg:gap-8">
            {articles.map((article) => (
                <Link key={article.slug} to={`/blog/${article.slug}`} className="group block h-full">
                    <Card className="h-full transition-all hover:bg-muted/50 hover:shadow-md hover:-translate-y-1 duration-300">
                        <CardHeader>
                            <div className="flex justify-between items-center mb-2">
                                <Badge variant="secondary">{article.category}</Badge>
                                <span className="text-sm text-muted-foreground">{article.date}</span>
                            </div>
                            <CardTitle className="group-hover:text-primary transition-colors">{article.title}</CardTitle>
                            <CardDescription className="line-clamp-3 mt-2">{article.description}</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
      </section>
    </div>
  )
}

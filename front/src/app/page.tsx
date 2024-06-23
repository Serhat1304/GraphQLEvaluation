import ArticlesList from "@/components/ArticlesList"
import PostArticle from "@/components/PostArticle"

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl p-6 lg:px-8 relative">
      <h1 className="text-center mb-20 text-4xl font-bold">What's new on sdmNET ?</h1>
      <ArticlesList />
      <PostArticle />
    </div>
  )
}

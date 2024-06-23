"use client"

import { useGetUser } from "@/app/hooks/auth.hooks"
import { Article } from "@/types/articles.type"

export default function Account() {
  const { data: user, isLoading: userLoading } = useGetUser()

  return (
    <div className="mx-auto max-w-7xl p-6 lg:px-8 relative">
      <h1 className="text-center mb-20 text-4xl font-bold">Hello, {user?.username}</h1>
      <p>Voici vos posts :</p>
      <ul>{user?.articles.map((article: Article) => <li key={article.id}>{article.title}</li>)}</ul>
    </div>
  )
}

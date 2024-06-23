"use client"
import { useState } from "react"
import { useGetArticles } from "@/app/hooks/articles.hooks"
import { Article } from "@/types/articles.type"
import Avatar from "@mui/material/Avatar"

type CommentsVisibilityState = {
  [key: string]: boolean
}

export default function ArticlesList() {
  const { data: articles, isLoading: loadingArticles } = useGetArticles()
  const [commentsVisibility, setCommentsVisibility] = useState<CommentsVisibilityState>({})

  const toggleComments = (articleId: string) => {
    setCommentsVisibility((prev) => ({
      ...prev,
      [articleId]: !prev[articleId],
    }))
  }

  return loadingArticles ? (
    <p>Loading...</p>
  ) : (
    articles?.map((article: Article) => (
      <div
        key={article.id}
        className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-4"
      >
        <div className="p-4">
          <div className="flex items-center mb-4">
            <Avatar
              alt={article.author.username}
              src={`https://ui-avatars.com/api/?name=${article.author.username}`}
              className="w-10 h-10"
            />
            <div className="ml-4">
              <div className="text-sm font-semibold text-gray-900">{article.author.username}</div>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-medium text-black">{article.title}</h1>
            <p className="mt-2 text-gray-600">{article.content}</p>
            <div className="mt-4 flex items-center">
              <span className="text-gray-600 text-sm">{article.likes} Likes</span>
            </div>
            <div className="mt-4">
              <button
                onClick={() => toggleComments(article.id)}
                className="text-indigo-500 hover:text-indigo-700 focus:outline-none"
              >
                {commentsVisibility[article.id] ? "Hide Comments" : "Show Comments"}
              </button>
              {commentsVisibility[article.id] && (
                <div className="mt-4">
                  <h2 className="text-gray-700 font-semibold">Comments:</h2>
                  {article.comments.length > 0 ? (
                    article.comments.map((comment) => (
                      <div key={comment.id} className="mt-2">
                        <span className="text-gray-800 font-medium">{comment.author.username}:</span>{" "}
                        <span className="text-gray-600">{comment.content}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No comments yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    ))
  )
}

"use client"
import { useState } from "react"
import { useGetArticles, usePostComment, useLikeArticle } from "@/app/hooks/articles.hooks"
import { Article } from "@/types/articles.type"
import Avatar from "@mui/material/Avatar"
import { useQueryClient } from "react-query"

type CommentsVisibilityState = {
  [key: string]: boolean
}

export default function ArticlesList() {
  const queryClient = useQueryClient()
  const { data: articles, isLoading: loadingArticles } = useGetArticles()
  const [commentsVisibility, setCommentsVisibility] = useState<CommentsVisibilityState>({})
  const [searchInput, setSearchInput] = useState<string>("")

  const postComment = usePostComment()
  const likeArticle = useLikeArticle()

  const toggleComments = (articleId: string) => {
    setCommentsVisibility((prev) => ({
      ...prev,
      [articleId]: !prev[articleId],
    }))
  }

  const handlePostComment = async (e: React.FormEvent<HTMLFormElement>, articleId: string) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const content = formData.get("content") as string

    try {
      await postComment.mutateAsync({ articleId, content })
      queryClient.invalidateQueries("getArticles")
      e.currentTarget.reset()
    } catch (error) {
      console.error("Error posting comment:", error)
    }
  }

  const filteredArticles = articles?.filter(
    (article: Article) =>
      article.author.username.toLowerCase().includes(searchInput.toLowerCase()) ||
      article.title.toLowerCase().includes(searchInput.toLowerCase()),
  )

  function handleLikeArticle(articleId: string) {
    likeArticle.mutate(
      { articleId },
      {
        onSuccess: () => {
          console.log("invalideateaze")
          queryClient.invalidateQueries("getArticles")
        },
      },
    )
  }

  return loadingArticles ? (
    <p>Loading...</p>
  ) : (
    <div>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search by author or title..."
        className="border border-gray-300 rounded-lg px-4 py-2 mb-10 w-[400px]"
      />
      {filteredArticles?.map((article: Article) => (
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
                <button
                  onClick={() => handleLikeArticle(article.id)}
                  className="text-indigo-500 hover:text-indigo-700 focus:outline-none"
                >
                  {likeArticle.isLoading ? "Liking..." : "Like"}
                </button>
                <span className="ml-4 text-gray-600 text-sm">{article.likes} Likes</span>
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
                    <form className="mt-4" onSubmit={(e) => handlePostComment(e, article.id)}>
                      <input
                        type="text"
                        name="content"
                        placeholder="Write a comment..."
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                      />
                      <button
                        type="submit"
                        className="mt-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-4 py-2 focus:outline-none"
                      >
                        {postComment.isLoading ? "Posting..." : "Comment"}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

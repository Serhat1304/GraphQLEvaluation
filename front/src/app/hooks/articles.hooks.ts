import ApiArticlesService from "../services/articles.service"
import { useMutation, useQuery } from "react-query"

export const useGetArticles = () => {
  return useQuery(["getArticles"], ApiArticlesService.getArticles)
}

export const usePostArticle = () => {
  return useMutation(ApiArticlesService.postArticle)
}

export const usePostComment = () => {
  return useMutation(ApiArticlesService.postComment)
}

export const useLikeArticle = () => {
  return useMutation(ApiArticlesService.likeArticle)
}

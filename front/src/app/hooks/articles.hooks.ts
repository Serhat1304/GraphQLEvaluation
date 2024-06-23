import ApiArticlesService from "../services/articles.service"
import { useMutation, useQuery } from "react-query"

export const useGetArticles = () => {
  return useQuery({
    queryKey: "getArticles",
    queryFn: ApiArticlesService.getArticles,
    enabled: true,
  })
}

export const usePostArticle = () => {
  return useMutation(ApiArticlesService.postArticle)
}

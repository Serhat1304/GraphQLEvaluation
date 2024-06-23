import { getCookie } from "cookies-next"
import ApiAuthService from "../services/auth.service"
import { useMutation, useQuery } from "react-query"

export const useSignUp = () => {
  return useMutation(ApiAuthService.signUp)
}

export const useLogin = () => {
  return useMutation(ApiAuthService.login)
}

export const useGetUser = () => {
  return useQuery({
    queryKey: "getProfile",
    queryFn: ApiAuthService.getUser,
    enabled: !!getCookie("xToken"),
  })
}

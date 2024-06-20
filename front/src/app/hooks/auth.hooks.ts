import { signUp, login } from "../services/auth.service"
import { useMutation } from "react-query"

export const useSignUp = () => {
  return useMutation(signUp)
}

export const useLogin = () => {
  return useMutation(login)
}

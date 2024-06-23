"use client"
import { useQueryClient } from "react-query"
import { useLogin } from "@/app/hooks/auth.hooks"
import { ApolloError } from "@apollo/client"
import { setCookie } from "cookies-next"
import Link from "next/link"

export default function SignIn() {
  const queryClient = useQueryClient()
  const login = useLogin()

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const pwd = formData.get("password") as string

    login.mutate(
      { email: email, password: pwd },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries("getProfile")
          setCookie("xToken", data.login)
          console.log(data.login)
        },
        onError: (error: ApolloError | unknown) => {
          error instanceof ApolloError ? console.error(error.message) : console.error(error)
        },
      },
    )
  }

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
        <div className="text-sm text-center">
          <Link href="/auth/signUp" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  )
}

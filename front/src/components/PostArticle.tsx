"use client"
import { useState } from "react"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import AddIcon from "@mui/icons-material/Add"
import { useGetUser } from "@/app/hooks/auth.hooks"
import { usePostArticle } from "@/app/hooks/articles.hooks"
import { useQueryClient } from "react-query"
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react"
import { ApolloError } from "@apollo/client"

export default function PostArticle() {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { data: user } = useGetUser()
  const postArticle = usePostArticle()

  const handlePostForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const content = formData.get("message") as string

    postArticle.mutate(
      { title, content },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("getArticles")
          setOpen(false)
        },
        onError: (error: ApolloError | unknown) => {
          error instanceof ApolloError ? setError(error.message) : console.error(error)
        },
      },
    )
  }

  return (
    <div>
      <Tooltip title="Post Article" arrow>
        <IconButton
          color="primary"
          className="fixed bottom-4 right-4"
          onClick={() => (user ? setOpen(true) : alert("You need to be logged in to post an article"))}
        >
          <AddIcon
            sx={{
              width: 50,
              height: 50,
            }}
          />
        </IconButton>
      </Tooltip>
      <Transition show={open}>
        <Dialog className="relative z-10" onClose={setOpen}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start justify-center">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                        <form className="space-y-6" action="#" method="POST" onSubmit={handlePostForm}>
                          <div>
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                              Titre
                            </label>
                            <div className="mt-2">
                              <input
                                id="title"
                                name="title"
                                type="text"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
                              Your message
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              rows={4}
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Write your thoughts here..."
                            ></textarea>
                          </div>
                          <div className="flex space-x-4">
                            <button
                              type="submit"
                              className="flex-1 justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            >
                              {postArticle.isLoading ? "En cours de publication..." : "Publier !"}
                            </button>
                            <button
                              onClick={() => setOpen(false)}
                              className="flex-1 justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            >
                              Cancel
                            </button>
                          </div>

                          {error && <div className="text-sm text-center text-red-500">{error}</div>}
                        </form>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

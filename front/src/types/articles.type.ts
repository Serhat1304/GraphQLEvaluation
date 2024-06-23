export interface Article {
  __typename: string
  id: string
  title: string
  content: string
  author: Author
  comments: Comment[]
  likes: number
}

export interface Author {
  __typename: string
  email?: string
  id: string
  username: string
}

export interface Comment {
  __typename: string
  content: string
  id: string
  author: Author
}

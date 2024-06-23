import { ApolloClient, InMemoryCache, gql, ApolloError } from "@apollo/client"
import { getCookie } from "cookies-next"

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
})

const GET_ARTICLES_QUERY = gql`
  query Query {
    articles {
      id
      title
      content
      author {
        email
        id
        username
      }
      comments {
        content
        id
        author {
          username
          id
        }
      }
      likes
    }
  }
`

const POST_ARTICLE_MUTATION = gql`
  mutation Mutation($title: String!, $content: String!) {
    createArticle(title: $title, content: $content) {
      content
      title
    }
  }
`

const ApiArticlesService = {
  async getArticles() {
    const response = await client.query({
      query: GET_ARTICLES_QUERY,
    })
    return response.data?.articles
  },

  async postArticle(payload: { title: string; content: string }) {
    const token = getCookie("xToken")
    const response = await client.mutate({
      mutation: POST_ARTICLE_MUTATION,
      variables: payload,
      context: {
        headers: {
          Authorization: token ? `${token}` : "",
        },
      },
    })
    return response.data
  },
}

export default ApiArticlesService

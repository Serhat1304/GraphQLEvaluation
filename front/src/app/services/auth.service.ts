import { ApolloClient, InMemoryCache, gql, ApolloError } from "@apollo/client"
import { getCookie } from "cookies-next"

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
})

const SIGN_UP_MUTATION = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      user {
        id
        username
        email
      }
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        username
        email
      }
      token
    }
  }
`

const GET_USER_QUERY = gql`
  query Query {
    me {
      id
      username
      email
    }
  }
`

const ApiAuthService = {
  async signUp(payload: { username: string; email: string; password: string }) {
    const response = await client.mutate({
      mutation: SIGN_UP_MUTATION,
      variables: payload,
    })
    return response.data
  },

  async login(payload: { email: string; password: string }) {
    const response = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: payload,
    })
    return response.data
  },

  async getUser() {
    const token = getCookie("xToken")

    const response = await client.query({
      query: GET_USER_QUERY,
      context: {
        headers: {
          Authorization: `${token}`,
        },
      },
    })

    return response.data?.me
  },
}

export default ApiAuthService

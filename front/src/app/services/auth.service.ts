import { ApolloClient, InMemoryCache, gql, ApolloError } from "@apollo/client"

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
})

const SIGN_UP_MUTATION = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      id
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

const GET_USER_QUERY = gql`
  query Users {
    users {
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

  getUser: async () => {
    try {
      const response = await client.query({
        query: GET_USER_QUERY,
      })
      return response.data
    } catch (error: ApolloError | unknown) {
      error instanceof ApolloError ? console.error(error.message) : console.error(error)
    }
  },
}

export default ApiAuthService

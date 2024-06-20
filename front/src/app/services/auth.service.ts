import { ApolloClient, InMemoryCache, gql } from "@apollo/client"

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
})

const SIGN_UP_MUTATION = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      // Ajoutez les champs que vous souhaitez retourner après la mutation
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation Login($loginEmail2: String!, $loginPassword2: String!) {
    login(email: $loginEmail2, password: $loginPassword2)
  }
`

const apiAuthService = {
  async signUp(username: string, email: string, password: string) {
    try {
      const response = await client.mutate({
        mutation: SIGN_UP_MUTATION,
        variables: { username, email, password },
      })
      return response.data
    } catch (error: any) {
      throw new Error("Erreur lors de l'inscription : " + error?.message)
    }
  },

  async login(email: string, password: string) {
    try {
      const response = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: { loginEmail2: email, loginPassword2: password },
      })
      return response.data
    } catch (error: any) {
      throw new Error("Erreur lors de la connexion : " + error.message)
    }
  },
}
export default apiAuthService

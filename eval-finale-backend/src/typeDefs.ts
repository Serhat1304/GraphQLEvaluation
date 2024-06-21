import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    articles: [Article!]!
  }

  type Article {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]!
    likes: Int!
  }

  type Comment {
    id: ID!
    content: String!
    article: Article!
    author: User!
  }

  type Query {
    me: User
    users: [User!]!
    articles: [Article!]!
    article(id: ID!): Article
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): String!
    createArticle(title: String!, content: String!): Article!
    createComment(articleId: ID!, content: String!): Comment!
    likeArticle(articleId: ID!): Article!
  }
  
  type AuthPayload {
    token: String!
    user: User!
  }

`;
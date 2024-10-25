import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    username: String!
    addresses: [Address]
  }

  type Auth {
    token: String!
    user: User!
  }

  type Address {
    _id: ID!
    nickname: String!
    street: String!
    city: String!
    state: String!
    zip: String!
    country: String!
  }

  type Service {
    _id: ID!
    name: String!
    description: String
    price: Float
    job: Job
  }

  type Job {
    _id: ID!
    title: String!
    description: String
    services: [Service]
  }

  type Query {
    getUsers: [User]
    getAddresses: [Address]
    getServices: [Service]
  }

  type Mutation {
    signup(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      username: String!
    ): Auth

    login(email: String!, password: String!): Auth

    addAddress(
      nickname: String!
      street: String!
      city: String!
      state: String!
      zip: String!
      country: String!
      userId: ID!
    ): Address

    addService(name: String!, description: String, price: Float): Service
  }
`;

export default typeDefs;

import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    username: String! # Add username field here
    addresses: [Address]
  }

  type Auth {
    token: String!
    user: User!
  }

  type Address {
    _id: ID!
    nickname: String! # Add nickname field here
    address_line_1: String!
    city: String!
    state: String!
    zip: String!
    user: User!
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
      username: String! # Add username argument here
    ): Auth

    login(email: String!, password: String!): Auth

    addAddress(
      nickname: String! # Add nickname argument here
      address_line_1: String!
      city: String!
      state: String!
      zip: String!
      userId: ID!
    ): Address!

    addService(name: String!, description: String, price: Float): Service
  }
`;

export default typeDefs;

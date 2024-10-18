import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    username: String! # Add username field here
    addresses: [Address]
  }

  type Address {
    id: ID!
    address_line_1: String!
    city: String!
    state: String!
    zip: String!
    user: User!
  }

  type Service {
    id: ID!
    name: String!
    description: String
    price: Float
    job: Job
  }

  type Job {
    id: ID!
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

    login(
      email: String!
      password: String!
    ): Auth
    
    addAddress(
      address_line_1: String!
      city: String!
      state: String!
      zip: String!
      userId: ID!
    ): Address!
    
    addService(
    name: String!,
    description: String, 
    price: Float
    ): Service
  }

  type Auth {
    token: String!
    user: User!
  }
`;

export default typeDefs;

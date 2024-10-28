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
    address_line_1: String!
    city: String!
    state: String!
    zip: String!
    country: String! # Add country field here
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
      username: String!
    ): Auth

    login(email: String!, password: String!): Auth

    addAddress(
      nickname: String!
      address_line_1: String!
      city: String!
      state: String!
      zip: String!
      country: String!
    ): Address!

    deleteAddress(addressId: ID!): Address!
    addServiceToAddress(addressId: ID!, serviceId: ID!): Address
    addService(
      name: String!
      description: String
      price: Float
      addressId: ID!
    ): Service
  }
`;


export default typeDefs;

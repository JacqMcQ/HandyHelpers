import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation Signup(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $username: String!
  ) {
    signup(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      username: $username
    ) {
      token
      user {
        _id
        firstName
        lastName
        email
        username
      }
    }
  }
`;

// Login Mutation
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_ADDRESS = gql`
  mutation AddAddress(
    $nickname: String!
    $address_line_1: String!
    $city: String!
    $state: String!
    $zip: String!
    $country: String!
  ) {
    addAddress(
      nickname: $nickname
      address_line_1: $address_line_1
      city: $city
      state: $state
      zip: $zip
      country: $country
    ) {
      _id
      nickname
      address_line_1
      city
      state
      zip
      country
    }
  }
`;

// Queries
export const GET_USERS = gql`
  query getUsers {
    getUsers {
      _id
      firstName
      lastName
      email
      username
    }
  }
`;

// Get all addresses
export const GET_ADDRESSES = gql`
  query getAddresses {
    getAddresses {
      _id
      nickname
      address_line_1
      city
      state
      zip
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;

// Get all services
export const GET_SERVICES = gql`
  query getServices {
    getServices {
      _id
      name
      description
      price
    }
  }
`;

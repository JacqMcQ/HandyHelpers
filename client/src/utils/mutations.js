import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation signup(
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

export const ADD_ADDRESSES = gql`
  mutation addAddress(
    $nickname: String!
    $street: String!
    $city: String!
    $state: String!
    $zip: String!
    $country: String!
    $userId: ID!
  ) {
    addAddress(
      nickname: $nickname
      street: $street
      city: $city
      state: $state
      zip: $zip
      country: $country
      userId: $userId
    ) {
      _id
      nickname
      street
      city
      state
      zip
      country
    }
  }
`;


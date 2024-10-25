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
  mutation add_address(
    $nickname: String
    $address_line_1: String!
    $city: String!
    $state: String!
    $zip: String!
    $userId: ID!
  ) {
    add_address(
      address_line_1: $address_line_1
      city: $city
      state: $state
      zip: $zip
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;


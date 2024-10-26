import { gql } from "@apollo/client";

// Get all users
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

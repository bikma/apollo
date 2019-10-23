import { gql } from "apollo-boost"

export const GET_USERS = gql`
  query Users {
    users {
      id
      name
      dob
      phone
      status
    }
  }
`
export const SUBSCRIBE = gql`
  mutation Subscribe($phone: String!) {
    subscribe(phone: $phone) {
      id
      name
      dob
      phone
    }
  }
`

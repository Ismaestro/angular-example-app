import { gql } from 'apollo-angular';

export const getMeQuery = gql`
  query me {
    me {
      id
      email
      firstname
      heroes {
        id
        realName
        alterEgo
      }
    }
  }
`;

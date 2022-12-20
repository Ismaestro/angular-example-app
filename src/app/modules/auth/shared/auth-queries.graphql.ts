import { gql } from 'apollo-angular';

export const getMeQuery = () => {
  return {
    query: gql`
      query {
        getMe {
          id
          email
          lang
          isEmailVerified
          firstName
          lastName
          picture
          availableDishes
          starterOptionSelected
          role
          origin
        }
      }
    `,
  };
};

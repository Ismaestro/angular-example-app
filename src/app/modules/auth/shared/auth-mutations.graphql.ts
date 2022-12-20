import { gql } from 'apollo-angular';
import { RegisterPayload } from '~modules/auth/shared/interfaces/register-payload.interface';
import { AppConfig } from '../../../configs/app.config';
import { UpdateUserData } from '~modules/auth/shared/interfaces/update-user-data.interface';

export const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      accessToken
      refreshToken
    }
  }
`;

// eslint-disable-next-line max-lines-per-function
export const registerMutation = ({ firstName, email, password, terms }: RegisterPayload) => {
  return {
    mutation: gql`
        mutation register {
          register(
          firstName: "${firstName}"
          email: "${email}"
          password: "${password}"
          terms: ${terms}
        ) {
            accessToken
            refreshToken
            user {
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
        }
      `,
  };
};

export const verifyEmailMutation = (token: string) => {
  return {
    mutation: gql`
        mutation {
          verifyEmail(
            token: "${token}"
          ) {
            user {
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
        }
      `,
  };
};

export const resendVerificationEmailMutation = (email: string) => {
  return {
    mutation: gql`
        mutation {
          resendVerificationEmail(
            email: "${email}"
          ) {
            ok
          }
        }
      `,
  };
};

export const rememberPasswordMutation = (email: string) => {
  return {
    mutation: gql`
        mutation {
          rememberPassword(
            email: "${email}"
          ) {
            ok
          }
        }
      `,
  };
};

export const resetPasswordMutation = (token: string, newPassword: string) => {
  return {
    mutation: gql`
        mutation resetPassword {
          resetPassword(
            token: "${token}"
            newPassword: "${newPassword}"
          ) {
            accessToken
            refreshToken
            user {
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
        }
      `,
  };
};

export const updateUserMutation = (userData: UpdateUserData) => {
  const firstName = userData.firstName;
  const lastName = userData.lastName;
  const lang = userData.lang;
  return {
    mutation: gql`
        mutation updateUser {
          updateUser(
            ${firstName ? 'firstName: "' + firstName + '"' : ''}
            ${lastName ? 'lastName: "' + lastName + '"' : ''}
            ${lang ? 'lang: ' + lang : ''}
          ) {
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

export const changePasswordMutation = (oldPassword: string, newPassword: string) => {
  return {
    mutation: gql`
        mutation changePassword {
          changePassword(
            oldPassword: "${oldPassword}"
            newPassword: "${newPassword}"
          ) {
            ok
          }
        }
      `,
  };
};

export const deleteAccountMutation = (password: string) => {
  return {
    mutation: gql`
        mutation deleteAccount {
          deleteAccount(
            password: "${password}"
          ) {
            ok
          }
        }
      `,
  };
};

export const updateTokenMutation = (refreshToken: string) => {
  return {
    mutation: gql`
        mutation updateToken {
          updateToken(token: "${refreshToken}") {
            accessToken
            refreshToken
          }
        }
      `,
    context: {
      headers: { [AppConfig.bypassAuthorization]: 'true' },
    },
  };
};

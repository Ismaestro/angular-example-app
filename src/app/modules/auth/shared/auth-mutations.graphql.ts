import { gql } from 'apollo-angular';

export const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      accessToken
      refreshToken
      user {
        id
        email
        firstname
        language
        heroes {
          id
          realName
          alterEgo
          image
        }
      }
    }
  }
`;

export const signupMutation = gql`
  mutation signup($firstname: String!, $email: String!, $password: String!) {
    signup(data: { firstname: $firstname, email: $email, password: $password }) {
      accessToken
      refreshToken
      user {
        id
        email
        firstname
        language
      }
    }
  }
`;

export const updateUserMutation = gql`
  mutation updateUser($firstname: String!, $language: String!) {
    updateUser(data: { firstname: $firstname, language: $language }) {
      id
      firstname
      email
      language
    }
  }
`;

export const changePasswordMutation = gql`
  mutation changePassword($oldPassword: String!, $newPassword: String!) {
    changePassword(data: { oldPassword: $oldPassword, newPassword: $newPassword }) {
      id
    }
  }
`;

export const refreshTokenMutation = gql`
  mutation refreshToken($refreshToken: String!) {
    refreshToken(token: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;

export const deleteAccountMutation = gql`
  mutation deleteAccount($password: String!) {
    deleteAccount(password: $password) {
      ok
    }
  }
`;

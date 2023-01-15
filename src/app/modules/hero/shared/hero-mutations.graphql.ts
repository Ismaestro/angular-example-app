import { gql } from 'apollo-angular';

export const createHeroMutation = gql`
  mutation createHero($alterEgo: String!, $realName: String!) {
    createHero(data: { alterEgo: $alterEgo, realName: $realName }) {
      id
      realName
      alterEgo
      votes
      image
      public
      user {
        id
        email
      }
      createdAt
      updatedAt
    }
  }
`;

export const deleteHeroMutation = gql`
  mutation removeHero($heroId: String!) {
    removeHero(heroId: $heroId) {
      id
    }
  }
`;

export const voteForHeroMutation = gql`
  mutation voteHero($heroId: String!) {
    voteHero(heroId: $heroId) {
      id
      realName
      alterEgo
      image
      public
      user {
        id
        email
      }
      createdAt
      updatedAt
    }
  }
`;

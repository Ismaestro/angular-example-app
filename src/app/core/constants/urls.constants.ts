import { AUTHENTICATION_PATHS, POKEMON_PATHS, ROOT_PATHS } from '~core/constants/paths.constants';

export const ROOT_URLS = {
  home: `/${ROOT_PATHS.home}`,
  myPokedex: `/${ROOT_PATHS.myPokedex}`,
  error404: `/${ROOT_PATHS.error404}`,
};

export const AUTH_URLS = {
  logIn: `/${AUTHENTICATION_PATHS.base}/${AUTHENTICATION_PATHS.logIn}`,
  register: `/${AUTHENTICATION_PATHS.base}/${AUTHENTICATION_PATHS.register}`,
};

export const USER_URLS = {
  // TODO: refactor this line
  myAccount: `/my-account`,
};

export const POKEMON_URLS = {
  detail: (id: string) => `/${POKEMON_PATHS.base}/${id}`,
};

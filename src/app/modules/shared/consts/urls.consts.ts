import {
  AUTH_PATHS,
  POKEMON_PATHS,
  ROOT_PATHS,
  USER_PATHS,
} from '~modules/shared/consts/paths.consts';

export const ROOT_URLS = {
  home: `/${ROOT_PATHS.home}`,
  error404: `/${ROOT_PATHS.error404}`,
};

export const AUTH_URLS = {
  logIn: `/${AUTH_PATHS.base}/${AUTH_PATHS.logIn}`,
  register: `/${AUTH_PATHS.base}/${AUTH_PATHS.register}`,
};

export const USER_URLS = {
  dashboard: `/${USER_PATHS.base}/${USER_PATHS.dashboard}`,
};

export const POKEMON_URLS = {
  detail: (id: string) => `/${POKEMON_PATHS.base}/${id}`,
};

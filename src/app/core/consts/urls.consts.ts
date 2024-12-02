import {
  AUTHENTICATION_PATHS,
  DASHBOARD_PATHS,
  POKEMON_DETAIL_PATHS,
  ROOT_PATHS,
} from '~core/consts/paths.consts';

export const ROOT_URLS = {
  home: `/${ROOT_PATHS.home}`,
  error404: `/${ROOT_PATHS.error404}`,
};

export const AUTH_URLS = {
  logIn: `/${AUTHENTICATION_PATHS.base}/${AUTHENTICATION_PATHS.logIn}`,
  register: `/${AUTHENTICATION_PATHS.base}/${AUTHENTICATION_PATHS.register}`,
};

export const USER_URLS = {
  dashboard: `/${DASHBOARD_PATHS.base}/${DASHBOARD_PATHS.base}`,
};

export const POKEMON_URLS = {
  detail: (id: string) => `/${POKEMON_DETAIL_PATHS.base}/${id}`,
};

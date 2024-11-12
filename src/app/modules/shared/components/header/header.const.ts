import { translations } from '../../../../../locale/translations';
import { AUTH_URLS, ROOT_URLS, USER_URLS } from '~modules/shared/consts/urls.consts';

export enum NavItemType {
  LINK = 'LINK',
  BUTTON = 'BUTTON',
  INPUT = 'INPUT',
}

export type NavItem = {
  id: string;
  type: NavItemType;
  text: string;
  isUserRequired?: boolean;
  withGradient?: boolean;
  url?: string;
  click?: () => void;
  change?: (value: unknown) => void;
};

export enum NavItemId {
  HOME = 'home',
  LOGIN = 'login',
  REGISTER = 'register',
  DASHBOARD = 'dashboard',
  LOGOUT = 'logout',
  SEARCH = 'search',
}

export const HEADER_NAV_ITEMS = [
  {
    id: NavItemId.HOME,
    url: ROOT_URLS.home,
    text: translations.home,
    type: NavItemType.LINK,
  },
  {
    id: NavItemId.LOGIN,
    url: AUTH_URLS.logIn,
    text: translations.logIn,
    isUserRequired: false,
    type: NavItemType.LINK,
  },
  {
    id: NavItemId.REGISTER,
    url: AUTH_URLS.register,
    text: translations.register,
    isUserRequired: false,
    withGradient: true,
    type: NavItemType.LINK,
  },
  {
    id: NavItemId.DASHBOARD,
    url: USER_URLS.dashboard,
    text: translations.dashboard,
    isUserRequired: true,
    type: NavItemType.LINK,
  },
  {
    id: NavItemId.SEARCH,
    text: translations.logout,
    type: NavItemType.INPUT,
  },
  {
    id: NavItemId.LOGOUT,
    isUserRequired: true,
    text: translations.logout,
    type: NavItemType.BUTTON,
  },
];

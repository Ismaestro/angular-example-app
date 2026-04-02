import type { Language } from '~core/enums/language.enums';

export type UpdateUserRequest = {
  name?: string;
  language?: Language;
};

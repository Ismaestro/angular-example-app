import type { Language } from '~core/enums/language.enum';

export type UpdateUserRequest = {
  name?: string;
  language?: Language;
};

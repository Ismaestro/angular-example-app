import type { Language } from '~core/enums/language.enum';

export type User = {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  firstname: string;
  language: Language;
};

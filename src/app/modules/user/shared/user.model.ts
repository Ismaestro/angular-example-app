import { Hero } from '~modules/hero/shared/hero.model';

export class User {
  id: string;
  email: string;
  language: string;
  firstname: string;
  heroes: Hero[];

  // eslint-disable-next-line complexity
  constructor(user: User) {
    this.id = user?.id;
    this.email = user?.email;
    this.language = user?.language || 'en';
    this.firstname = user?.firstname;
    this.heroes = user?.heroes;
  }
}

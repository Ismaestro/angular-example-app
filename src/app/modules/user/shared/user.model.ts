import { Deserializable } from '../../../shared/interfaces/deserializable.interface';
import { Hero } from '../../hero/shared/hero.model';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class User implements Deserializable {
  email: string;
  firstname: string;
  lastname: string;
  role: Role;
  heroes: Hero[];

  constructor(user: any = {}) {
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.role = user.role;
    this.heroes = user.heroes;
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

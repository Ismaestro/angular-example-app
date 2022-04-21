import { Deserializable } from '~shared/interfaces/deserializable.interface';
import { User } from '../../user/shared/user.model';

export class Hero implements Deserializable {
  id: string;
  realName: string;
  alterEgo: string;
  published: boolean;
  image: string;
  usersVoted: User[];

  constructor(hero: any = {}) {
    this.id = hero.id;
    this.realName = hero.realName || '';
    this.alterEgo = hero.alterEgo || '';
    this.published = hero.published || false;
    this.image = hero.image || '';
    this.usersVoted = hero.usersVoted || [];
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

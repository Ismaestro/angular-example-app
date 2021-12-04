import { Deserializable } from '../../../shared/interfaces/deserializable.interface';

export class Hero implements Deserializable {
  id: string;
  realName: string;
  alterEgo: string;
  votes: number;
  published: boolean;
  image: string;

  constructor(hero: any = {}) {
    this.id = hero.id;
    this.realName = hero.realName || '';
    this.alterEgo = hero.alterEgo || '';
    this.votes = hero.votes || 0;
    this.published = hero.published || false;
    this.image = hero.image || '';
  }

  like() {
    this.votes += 1;
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

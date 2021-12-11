import { Deserializable } from '../../../shared/interfaces/deserializable.interface';

export class Hero implements Deserializable {
  id: string;
  realName: string;
  alterEgo: string;
  published: boolean;
  image: string;

  constructor(hero: any = {}) {
    this.id = hero.id;
    this.realName = hero.realName || '';
    this.alterEgo = hero.alterEgo || '';
    this.published = hero.published || false;
    this.image = hero.image || '';
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

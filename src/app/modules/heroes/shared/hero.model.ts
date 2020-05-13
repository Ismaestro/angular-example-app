import { Deserializable } from '../../../shared/interfaces/deserializable.interface';

export class Hero implements Deserializable {
  id: string;
  name: string;
  alterEgo: string;
  likes: number;
  default: boolean;
  avatarUrl: string;
  avatarBlurredUrl: string;
  avatarThumbnailUrl: string;

  constructor(hero: any = {}) {
    this.id = hero.id;
    this.name = hero.name || '';
    this.alterEgo = hero.alterEgo || '';
    this.likes = hero.likes || 0;
    this.default = hero.default || false;
    this.avatarUrl = hero.avatarUrl || '';
    this.avatarBlurredUrl = hero.avatarBlurredUrl || '';
    this.avatarThumbnailUrl = hero.avatarThumbnailUrl || '';
  }

  like() {
    this.likes += 1;
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

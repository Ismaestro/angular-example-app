export class Hero {
  id: string;
  realName: string;
  alterEgo: string;
  image: string;
  public: boolean;
  usersVoted: Hero[];

  // eslint-disable-next-line complexity
  constructor(hero: Hero) {
    this.id = hero?.id;
    this.realName = hero?.realName;
    this.alterEgo = hero?.alterEgo;
    this.image = hero?.image;
    this.public = hero?.public;
    this.usersVoted = hero?.usersVoted;
  }
}

export class User {
  id: string;
  email: string;
  lang: string;
  firstName: string;
  lastName: string;

  // eslint-disable-next-line complexity
  constructor(user: User) {
    this.id = user?.id;
    this.email = user?.email;
    this.lang = user?.lang || 'en';
    this.firstName = user?.firstName;
    this.lastName = user?.lastName;
  }
}

import { UserService } from '~modules/user/shared/user.service';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { TestBed } from '@angular/core/testing';
import { getMeQuery } from '~modules/user/shared/user-queries.graphql';
import { User } from '~modules/user/shared/user.model';

// eslint-disable-next-line max-lines-per-function
describe('UserService', () => {
  let controller: ApolloTestingController;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [UserService],
    });
  });

  beforeEach(() => {
    controller = TestBed.inject(ApolloTestingController);
    userService = TestBed.inject(UserService);
  });

  it('should get my own user', () => {
    userService.getMe().subscribe();
    const op = controller.expectOne(getMeQuery);
    expect(op.operation.clientName).toEqual('default');
    op.flush({
      data: {
        me: new User({
          id: 'userId',
          email: 'user@email.com',
          language: 'es',
          firstname: 'Isma',
          heroes: [],
        }),
      },
    });
  });

  afterEach(() => {
    controller.verify();
  });
});

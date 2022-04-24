/*
import { TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroDataService } from './hero-data.service';
import { of } from 'rxjs';
import { UsersService } from '~core/services/users.service';

const userMock: any = { name: 'Isma', lang: 'es' };

describe('ApplyDataService', () => {
  let service: HeroDataService;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;

  const spyUser = jasmine.createSpyObj('UsersService', ['getUser']);
  const mockUser = () => {
    usersServiceSpy = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    usersServiceSpy.getUser.and.returnValue(of(userMock));
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        HeroDataService,
        { provide: UsersService, useValue: spyUser },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(HeroDataService);
    mockUser();
  });

  it('#getUser', done => {
    service.getUser().subscribe(user => {
      expect(user.name).toBe(userMock.name);
      done();
    });
  });

  it('#setUser', done => {
    service.setUser(userMock);

    service.getUser().subscribe(user => {
      expect(user.name).toBe(userMock.name);
      done();
    });
  });

  it('#cleanData', () => {
    service.cleanData();
    expect((service as any).call).toBeNull();
  });
});
*/

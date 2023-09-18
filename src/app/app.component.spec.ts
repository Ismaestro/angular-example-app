import { AppComponent } from './app.component';
import { HeaderComponent } from '~modules/shared/components/header/header.component';
import { MockComponent } from 'ng-mocks';
import { FooterComponent } from '~modules/shared/components/footer/footer.component';
import { AuthService } from '~modules/auth/shared/auth.service';
import { AlertComponent } from '~modules/shared/components/alert/alert.component';
import { APP_CONFIG, AppConfig } from './configs/app.config';
import { SidebarComponent } from '~modules/shared/components/sidebar/sidebar.component';
import { AuthRepository } from '~modules/auth/store/auth.repository';
import { of, throwError } from 'rxjs';
import EventBusEvent, {
  EventBCType,
  EventBusService,
} from '~modules/shared/services/event-bus.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';
import { User } from '~modules/user/shared/user.model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AlertId, AlertService } from '~modules/shared/services/alert.service';

/* eslint sonarjs/no-duplicate-string: 0  max-lines-per-function: 0  */
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let eventBusService: EventBusService;
  let router: Router;

  const user = new User({
    id: 'userId',
    email: 'user@email.com',
    language: 'es',
    firstname: 'Isma',
    heroes: [],
  });
  const routerSpy = jasmine.createSpyObj('Router', {
    navigate: () => new Promise<void>(resolve => resolve()),
  });
  const titleServiceSpy = jasmine.createSpyObj('TitleService', ['setTitle']);
  const alertServiceSpy = jasmine.createSpyObj('AlertService', ['create']);
  const authServiceSpy = jasmine.createSpyObj('AuthService', {
    refreshToken: of(true),
    decodeToken: { exp: 167498413 },
  });
  const authRepositorySpy = jasmine.createSpyObj('AuthRepository', {
    isLoggedIn: of(true),
    getAccessTokenValue: '',
    getRefreshTokenValue: '',
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockComponent(HeaderComponent),
        MockComponent(FooterComponent),
        MockComponent(AlertComponent),
        MockComponent(SidebarComponent),
      ],
      declarations: [AppComponent],
      providers: [
        {
          provide: Router,
          useValue: { ...routerSpy, events: of(true) },
        },
        { provide: Title, useValue: titleServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
        {
          provide: AuthRepository,
          useValue: {
            ...authRepositorySpy,
            $user: of(user),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {
                alertId: AlertId.GENERIC_ERROR,
              },
            },
          },
        },
        {
          provide: EventBusService,
          useValue: {
            eventsBC: new BroadcastChannel('events-broadcast-channel'),
            events$: new EventEmitter(),
          },
        },
        { provide: APP_CONFIG, useValue: AppConfig },
        {
          provide: Document,
          useValue: {
            defaultView: {
              location: { reload: () => true, href: 'localhost:4200' },
              onfocus: () => true,
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    eventBusService = TestBed.inject(EventBusService);
    router = TestBed.inject(Router);
    routerSpy.navigate.calls.reset();
  });

  it('should create and destroy', () => {
    const destroy = spyOn(component.destroy$, 'next');
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.window).toBeTruthy();
    expect(component.isLoggingOut).toBeFalse();
    expect(component.isArrivalRoute).toBeFalse();
    expect(component.user).toEqual(user);
    expect(titleServiceSpy.setTitle).toHaveBeenCalledWith('Angular Example App');
    fixture.destroy();
    expect(destroy).toHaveBeenCalledWith(true);
  });

  it('should show alert because active param is set and logout because of refresh token expired', () => {
    authRepositorySpy.getRefreshTokenValue.and.returnValue('refresh');
    AuthService.decodeToken = () => ({ exp: 167498413 });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    router.events = of(
      new NavigationEnd(0, 'http://localhost:4200/login', 'http://localhost:4200/login'),
    );
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    expect(alertServiceSpy.create).toHaveBeenCalledWith('GENERIC_ERROR');
    expect(component.isArrivalRoute).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/logout'], {
      queryParams: { origin: 'localhost%3A4200', alertId: 'SESSION_EXPIRED' },
    });
  });

  it('should refresh token because only access_token is expired', () => {
    authRepositorySpy.getAccessTokenValue.and.returnValue('access');
    authRepositorySpy.getRefreshTokenValue.and.returnValue('refresh');
    AuthService.decodeToken = (token: string) =>
      token === 'access' ? { exp: 167498413 } : { exp: Date.now() };
    authServiceSpy.refreshToken.and.returnValue(of(true));
    fixture.detectChanges();
    expect(authServiceSpy.refreshToken).toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalledWith(['/auth/logout'], {
      queryParams: { origin: 'localhost%3A4200', alertId: 'SESSION_EXPIRED' },
    });
  });

  it('should logout because access token and refresh token are expired', () => {
    authRepositorySpy.getAccessTokenValue.and.returnValue('access');
    authRepositorySpy.getRefreshTokenValue.and.returnValue('refresh');
    AuthService.decodeToken = () => ({ exp: 167498413 });
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/logout'], {
      queryParams: { origin: 'localhost%3A4200', alertId: 'SESSION_EXPIRED' },
    });
  });

  it('should logout because refresh token request fails', () => {
    authRepositorySpy.getAccessTokenValue.and.returnValue('access');
    authRepositorySpy.getRefreshTokenValue.and.returnValue('refresh');
    AuthService.decodeToken = (token: string) =>
      token === 'access' ? { exp: 167498413 } : { exp: Date.now() };
    authServiceSpy.refreshToken.and.returnValue(throwError(() => ({ message: 'Test error' })));
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/logout'], {
      queryParams: { origin: 'localhost%3A4200', alertId: 'SESSION_EXPIRED' },
    });
  });

  it('should be logging out', () => {
    eventBusService.events$ = of({
      id: '',
      date: new Date(),
      type: 'FINISH_LOGOUT',
      data: { path: 'localhost:4200' },
    }) as EventEmitter<EventBusEvent>;
    fixture.detectChanges();
    expect(component.isLoggingOut).toBeTrue();
    expect(component.isLoggedIn).toBeTrue();
  });

  it('should reload page because session changed', () => {
    const locationSpy = spyOn(component.window.location, 'reload');
    fixture.detectChanges();
    if (eventBusService.eventsBC.onmessage) {
      eventBusService.eventsBC.onmessage({
        data: {
          type: EventBCType.SESSION_CHANGED,
        },
      } as MessageEvent);
    }
    expect(locationSpy).toHaveBeenCalled();
  });

  it('should check token expirations on window focus', () => {
    const checkAccessTokenSpy = spyOn(component, 'checkAccessToken');
    fixture.detectChanges();
    (component.window as unknown as { onfocus: () => void }).onfocus();
    expect(checkAccessTokenSpy).toHaveBeenCalled();
  });
});

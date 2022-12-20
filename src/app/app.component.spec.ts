import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from '~modules/shared/components/header/header.component';
import { MockComponent } from 'ng-mocks';
import { FooterComponent } from '~modules/shared/components/footer/footer.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { AuthService } from '~modules/auth/shared/auth.service';
import { AlertComponent } from '~modules/shared/components/alert/alert.component';
import { APP_CONFIG, AppConfig } from './configs/app.config';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);

  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [
      RouterTestingModule,
      MockComponent(HeaderComponent),
      MockComponent(FooterComponent),
      MockComponent(AlertComponent),
    ],
    providers: [
      { provide: AuthService, useValue: authServiceSpy },
      { provide: APP_CONFIG, useValue: AppConfig },
    ],
  });

  beforeEach(() => {
    authServiceSpy.isLoggedIn.and.returnValue(false);
    spectator = createComponent();
  });

  it('should create the app', () => {
    expect(spectator.query('router-outlet')).toExist();
  });
});

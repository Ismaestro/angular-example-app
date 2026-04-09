import { LogInComponent } from '~features/authentication/pages/log-in/log-in.component';
import { RegisterComponent } from '~features/authentication/pages/register/register.component';
import { AUTHENTICATION_PATHS } from '~core/constants/paths.constants';
import { MyAccountComponent } from '~features/authentication/pages/my-account/my-account.component';
import { noAuthenticationGuard } from '~features/authentication/guards/no-authentication.guard';
import { authenticationGuard } from '~features/authentication/guards/authentication.guard';

export const AUTHENTICATION_ROUTES = [
  {
    path: AUTHENTICATION_PATHS.logIn,
    component: LogInComponent,
    canActivate: [noAuthenticationGuard],
  },
  {
    path: AUTHENTICATION_PATHS.register,
    component: RegisterComponent,
    canActivate: [noAuthenticationGuard],
  },
  {
    path: AUTHENTICATION_PATHS.myAccount,
    component: MyAccountComponent,
    canActivate: [authenticationGuard],
  },
];

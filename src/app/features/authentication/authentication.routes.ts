import { LogInComponent } from '~features/authentication/pages/log-in/log-in.component';
import { RegisterComponent } from '~features/authentication/pages/register/register.component';
import { noAuthenticationGuard } from '~core/guards/no-authentication.guard';
import { AUTHENTICATION_PATHS, ROOT_PATHS } from '~core/constants/paths.constants';
import { authenticationGuard } from '~core/guards/authentication.guard';
import { MyAccountComponent } from '~features/authentication/pages/my-account/my-account.component';

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
  { path: '**', redirectTo: ROOT_PATHS.error404 },
];

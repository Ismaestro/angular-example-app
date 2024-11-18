import { LogInComponent } from '~features/authentication/pages/log-in/log-in.component';
import { RegisterComponent } from '~features/authentication/pages/register/register.component';
import { noAuthenticationGuard } from '~core/guards/no-authentication.guard';
import { AUTHENTICATION_PATHS, ROOT_PATHS } from '~core/consts/paths.consts';

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
  { path: '**', redirectTo: ROOT_PATHS.error404 },
];

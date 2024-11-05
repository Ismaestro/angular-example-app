import { LogInComponent } from '~modules/auth/pages/log-in/log-in.component';
import { RegisterComponent } from '~modules/auth/pages/register/register.component';
import { noAuthenticationGuard } from '~modules/shared/guards/no-authentication.guard';
import { AUTH_PATHS, ROOT_PATHS } from '~modules/shared/consts/paths.consts';

export const AUTH_ROUTES = [
  { path: AUTH_PATHS.logIn, component: LogInComponent, canActivate: [noAuthenticationGuard] },
  {
    path: AUTH_PATHS.register,
    component: RegisterComponent,
    canActivate: [noAuthenticationGuard],
  },
  { path: '**', redirectTo: ROOT_PATHS.error404 },
];

import { Route } from '@angular/router';
import { authPaths } from '~modules/auth/shared/auth-routes';
import { LogInPageComponent } from '~modules/auth/pages/log-in-page/log-in-page.component';
import { appPaths } from '../../app-routes';
import { RegisterPageComponent } from '~modules/auth/pages/register-page/register-page.component';
import { LogoutPageComponent } from '~modules/auth/pages/logout-page/logout-page.component';
import { noAuthenticationGuard } from '~modules/shared/guards/no-authentication.guard';

export const AUTH_ROUTES: Route[] = [
  { path: authPaths.logIn, component: LogInPageComponent, canActivate: [noAuthenticationGuard] },
  {
    path: authPaths.register,
    component: RegisterPageComponent,
    canActivate: [noAuthenticationGuard],
  },
  {
    path: authPaths.logout,
    component: LogoutPageComponent,
  },
  { path: '**', redirectTo: appPaths.error404 },
];

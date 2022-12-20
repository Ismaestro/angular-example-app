import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from '~environments/environment';
import { enableElfProdMode } from '@ngneat/elf';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { APP_CONFIG, AppConfig } from './app/configs/app.config';
import { RouterModule } from '@angular/router';
import { CustomRoute } from '~modules/shared/interfaces/custom-route.interface';
import { appPaths } from './app/app-routes';
import { authPaths, authRoutes } from '~modules/auth/shared/auth-routes';
import { Error404PageComponent } from '~modules/shared/pages/error404-page/error404-page.component';
import { HttpClientModule } from '@angular/common/http';
import { userPaths } from '~modules/user/shared/user-routes';
import { CoreModule } from '~modules/core/core.module';

const appRoutes: CustomRoute[] = [
  {
    path: appPaths.home,
    redirectTo: authRoutes.logIn,
    pathMatch: 'full',
  },
  {
    path: authPaths.base,
    loadChildren: () => import('./app/modules/auth/auth.routes').then(mod => mod.AUTH_ROUTES),
  },
  {
    path: userPaths.base,
    loadChildren: () => import('./app/modules/user/user.routes').then(mod => mod.USER_ROUTES),
  },
  { path: '404', component: Error404PageComponent },
  { path: '**', redirectTo: '404' },
];

if (environment.production) {
  enableProdMode();
  enableElfProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: APP_CONFIG, useValue: AppConfig },
    importProvidersFrom(
      HttpClientModule,
      CoreModule,
      RouterModule.forRoot(appRoutes, {
        scrollPositionRestoration: 'enabled',
      })
    ),
  ],
});

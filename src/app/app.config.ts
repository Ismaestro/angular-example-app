import { ApplicationConfig } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  withRouterConfig,
} from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { AUTH_PATHS, POKEMON_PATHS, USER_PATHS } from '~modules/shared/consts/paths.consts';
import { Error404Component } from '~modules/root/pages/error-404/error-404.component';
import { ROOT_ROUTES } from '~modules/root/root.routes';
import { loggingInterceptor } from '~modules/shared/interceptors/logging.interceptor';
import { cachingInterceptor } from '~modules/shared/interceptors/caching.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([loggingInterceptor, cachingInterceptor])),
    provideRouter(
      [
        ...ROOT_ROUTES,
        {
          path: AUTH_PATHS.base,
          loadChildren: () => import('./modules/auth/auth.routes').then(mod => mod.AUTH_ROUTES),
        },
        {
          path: USER_PATHS.base,
          loadChildren: () => import('./modules/user/user.routes').then(mod => mod.USER_ROUTES),
        },
        {
          path: POKEMON_PATHS.base,
          loadChildren: () =>
            import('./modules/pokemon/pokemon.routes').then(mod => mod.POKEMON_ROUTES),
        },
        { path: '404', component: Error404Component },
        { path: '**', redirectTo: '404' },
      ],
      withRouterConfig({ paramsInheritanceStrategy: 'always', onSameUrlNavigation: 'reload' }),
      withComponentInputBinding(),
      withPreloading(PreloadAllModules),
    ),
    { provide: Document, useExisting: DOCUMENT },
  ],
};

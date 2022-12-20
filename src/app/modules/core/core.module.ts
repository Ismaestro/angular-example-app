import { LOCALE_ID, NgModule, Optional, SkipSelf } from '@angular/core';
import { AppConfig } from '../../configs/app.config';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { AuthRepository } from '~modules/auth/store/auth.repository';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { environment } from '~environments/environment';
import { setContext } from '@apollo/client/link/context';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '~modules/core/interceptors/token.interceptor';
import { Router } from '@angular/router';
import { AuthService } from '~modules/auth/shared/auth.service';
import { DOCUMENT } from '@angular/common';

function getAcceptLanguageContext(authRepository: AuthRepository) {
  return setContext((operation, prevContext) => {
    return {
      headers: {
        ...prevContext.headers,
        'Accept-Language': authRepository.locale,
      },
    };
  });
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
      deps: [Router, AuthService, AuthRepository, DOCUMENT],
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: (
        httpLink: HttpLink,
        authRepository: AuthRepository
      ): ApolloClientOptions<unknown> => {
        const acceptLanguage = getAcceptLanguageContext(authRepository);
        return {
          link: ApolloLink.from([
            acceptLanguage,
            httpLink.create({ uri: environment.graphqlHost + AppConfig.endpoints.graphql }),
          ]),
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpLink, AuthRepository, LOCALE_ID],
    },
    Apollo,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule has already been loaded. Import Core modules in the AppModule only.'
      );
    }
  }
}

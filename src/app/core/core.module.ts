import {NgModule, Optional, SkipSelf} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ProgressBarService} from './services/progress-bar.service';
import {LoggerService} from './services/logger.service';
import {HeroService} from '../modules/heroes/shared/hero.service';
import {TimingInterceptor} from './interceptors/timing.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ProgressInterceptor} from './interceptors/progress.interceptor';

function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
  }
}

@NgModule({
  imports: [
    /*ReactiveFormsModule,
    RouterModule*/
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ProgressInterceptor, multi: true, deps: [ProgressBarService]},
    {provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true},
    HeroService,
    LoggerService,
    ProgressBarService
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

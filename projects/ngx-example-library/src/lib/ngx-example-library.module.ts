import {APP_INITIALIZER, InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {NgxExampleLibraryComponent} from './ngx-example-library.component';
import {NgxExampleLibraryService} from './ngx-example-library.service';

export const OPTIONS = new InjectionToken<string>('OPTIONS');

export interface SampleModuleOptions {
  config: {};
}

export function initialize(options: any) {
  console.log('Angular library has started with this options: ', options);
  return function () {
  };
}

@NgModule({
  imports: [
  ],
  declarations: [
    NgxExampleLibraryComponent
  ],
  exports: [
    NgxExampleLibraryComponent
  ]
})
export class NgxExampleLibraryModule {
  static forRoot(options?: SampleModuleOptions): ModuleWithProviders {
    return {
      ngModule: NgxExampleLibraryModule,
      providers: [
        {provide: OPTIONS, useValue: options},
        {
          provide: APP_INITIALIZER,
          useFactory: initialize,
          deps: [OPTIONS],
          multi: true
        },
        NgxExampleLibraryService
      ]
    };
  }
}

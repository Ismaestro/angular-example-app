import {APP_INITIALIZER, InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {AngularExampleLibraryComponent} from './angular-example-library.component';
import {AngularExampleLibraryService} from './angular-example-library.service';

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
  imports: [],
  declarations: [AngularExampleLibraryComponent],
  exports: [AngularExampleLibraryComponent]
})
export class AngularExampleLibraryModule {
  static forRoot(options?: SampleModuleOptions): ModuleWithProviders {
    return {
      ngModule: AngularExampleLibraryModule,
      providers: [
        {provide: OPTIONS, useValue: options},
        {
          provide: APP_INITIALIZER,
          useFactory: initialize,
          deps: [OPTIONS],
          multi: true
        },
        AngularExampleLibraryService
      ]
    };
  }
}

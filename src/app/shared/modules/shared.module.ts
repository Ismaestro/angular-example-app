import {ModuleWithProviders, NgModule} from '@angular/core';
import {MaterialModule} from './material.module';
import {TranslateModule} from '@ngx-translate/core';
import {HeroService} from '../../heroes/shared/hero.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularExampleLibraryModule} from 'angular-example-library';

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
    AngularExampleLibraryModule
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
    AngularExampleLibraryModule
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        HeroService
      ]
    };
  }
}

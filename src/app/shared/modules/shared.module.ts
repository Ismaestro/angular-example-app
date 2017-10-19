import {ModuleWithProviders, NgModule} from '@angular/core';
import {MaterialModule} from './material.module';
import {TranslateModule} from '@ngx-translate/core';
import {HeroService} from '../../heroes/shared/hero.service';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    TranslateModule
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    TranslateModule
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

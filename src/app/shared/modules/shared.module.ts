import {ModuleWithProviders, NgModule} from '@angular/core';
import {MaterialModule} from './material.module';
import {TranslateModule} from '@ngx-translate/core';
import {HeroService} from '../../heroes/shared/hero.service';

@NgModule({
  imports: [
    MaterialModule,
    TranslateModule
  ],
  exports: [
    MaterialModule,
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

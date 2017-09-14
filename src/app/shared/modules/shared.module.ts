import {ModuleWithProviders, NgModule} from '@angular/core';
import {ProgressBarService} from '../services/progress-bar.service';
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
        ProgressBarService, HeroService
      ]
    };
  }
}

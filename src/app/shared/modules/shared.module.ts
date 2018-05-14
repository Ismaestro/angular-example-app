import {ModuleWithProviders, NgModule} from '@angular/core';
import {MaterialModule} from './material.module';
import {TranslateModule} from '@ngx-translate/core';
import {HeroService} from '../../heroes/shared/hero.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxExampleLibraryModule} from '@ismaestro/ngx-example-library';

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
    NgxExampleLibraryModule
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
    NgxExampleLibraryModule
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

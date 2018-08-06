import {NgModule} from '@angular/core';
import {MaterialModule} from './modules/material.module';
import {TranslateModule} from '@ngx-translate/core';
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
}

import {NgModule} from '@angular/core';
import {ProgressBarService} from '../services/progress-bar.service';
import {MaterialModule} from './material.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [],
  exports: [
    MaterialModule,
    TranslateModule
  ],
  providers: [ProgressBarService]
})

export class SharedModule {
}

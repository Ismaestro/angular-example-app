import {NgModule} from '@angular/core';

import {ProgressBarService} from '../services/progress-bar.service';
import {MaterialModule} from './material.module';

@NgModule({
  declarations: [],
  exports: [MaterialModule],
  providers: [ProgressBarService]
})

export class SharedModule {
}

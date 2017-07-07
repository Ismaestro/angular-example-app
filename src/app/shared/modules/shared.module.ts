import {NgModule} from '@angular/core';

import {HighlightDirective} from '../directives/highlight.directive';
import {ProgressBarService} from '../services/progress-bar.service';

@NgModule({
  declarations: [HighlightDirective],
  exports: [HighlightDirective],
  providers: [ProgressBarService]
})

export class SharedModule {
}

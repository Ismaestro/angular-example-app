import {NgModule} from '@angular/core';

import {HighlightDirective} from './highlight.directive';

@NgModule({
  declarations: [HighlightDirective],
  exports: [HighlightDirective]
})

export class SharedModule {
}

import {MdAutocompleteModule, MdButtonModule, MdIconModule, MdInputModule, MdMenuModule} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [MdButtonModule, MdMenuModule, MdIconModule,
            MdAutocompleteModule, MdInputModule],
  exports: [MdButtonModule, MdMenuModule, MdIconModule,
            MdAutocompleteModule, MdInputModule],
})

export class MaterialModule {
}

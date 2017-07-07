import {
  MdAutocompleteModule,
  MdButtonModule,
  MdCardModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdMenuModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdSliderModule,
  MdSnackBarModule, MdTooltipModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    MdButtonModule,
    MdMenuModule,
    MdIconModule,
    MdCardModule,
    MdSliderModule,
    MdProgressBarModule,
    MdAutocompleteModule,
    MdInputModule,
    MdGridListModule,
    MdSnackBarModule,
    MdProgressSpinnerModule,
    MdTooltipModule
  ],
  exports: [
    MdButtonModule,
    MdMenuModule,
    MdIconModule,
    MdCardModule,
    MdSliderModule,
    MdProgressBarModule,
    MdAutocompleteModule,
    MdInputModule,
    MdGridListModule,
    MdSnackBarModule,
    MdProgressSpinnerModule,
    MdTooltipModule
  ],
})

export class MaterialModule {
}

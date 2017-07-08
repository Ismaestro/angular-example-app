import {
  MdAutocompleteModule,
  MdButtonModule,
  MdCardModule, MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule, MdListModule,
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
    MdTooltipModule,
    MdListModule,
    MdDialogModule
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
    MdTooltipModule,
    MdListModule,
    MdDialogModule
  ],
})

export class MaterialModule {
}

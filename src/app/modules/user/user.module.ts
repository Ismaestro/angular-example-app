import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  declarations: [],
})
export class UserModule {}

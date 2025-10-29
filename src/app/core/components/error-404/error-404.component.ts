import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-error-404',
  imports: [NgOptimizedImage],
  templateUrl: './error-404.component.html',
  styleUrl: 'error-404.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Error404Component {}

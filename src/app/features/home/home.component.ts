import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { DecorativeHeaderComponent } from '~core/components/decorative-header/decorative-header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DecorativeHeaderComponent, NgOptimizedImage],
})
export class HomeComponent {}

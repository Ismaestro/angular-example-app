import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { DecorativeHeaderComponent } from '~core/components/decorative-header/decorative-header.component';
import { CardComponent } from '~core/components/card/card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DecorativeHeaderComponent, NgOptimizedImage, CardComponent],
})
export class HomeComponent {}

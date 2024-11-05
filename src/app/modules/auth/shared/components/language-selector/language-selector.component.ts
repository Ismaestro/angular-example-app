import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UpperCasePipe],
})
export class LanguageSelectorComponent {
  router = inject(Router);
  locale = inject(LOCALE_ID);
}

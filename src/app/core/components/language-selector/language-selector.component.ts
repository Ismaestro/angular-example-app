import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  LOCALE_ID,
} from '@angular/core';
import { Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';

import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UpperCasePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LanguageSelectorComponent {
  readonly router = inject(Router);
  readonly locale = inject(LOCALE_ID);
}

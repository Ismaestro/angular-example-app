import { ChangeDetectionStrategy, Component, Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class LanguageSelectorComponent {
  constructor(
    public router: Router,
    @Inject(LOCALE_ID) public locale: string,
  ) {}
}

import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { Theme, ThemeManagerService } from '~core/services/ui/theme-manager.service';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

@Component({
  selector: 'app-theme-button',
  templateUrl: './theme-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ThemeButtonComponent {
  private readonly themeManagerService = inject(ThemeManagerService);

  readonly themeSelected = this.themeManagerService.themeSelected;
  readonly Theme = Theme;

  toggleTheme() {
    if (this.themeSelected() === Theme.DARK) {
      this.themeManagerService.setTheme(Theme.LIGHT);
    } else {
      this.themeManagerService.setTheme(Theme.DARK);
    }
  }
}

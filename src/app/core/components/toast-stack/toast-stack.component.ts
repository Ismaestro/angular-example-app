import type { ElementRef } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
  viewChildren,
} from '@angular/core';
import { AlertStore } from '~core/services/ui/alert.store';
import type { Alert } from '~core/constants/alerts.constants';

import '@shoelace-style/shoelace/dist/components/alert/alert.js';

@Component({
  selector: 'app-toast-stack',
  templateUrl: './toast-stack.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ToastStackComponent {
  private readonly alertStore = inject(AlertStore);
  private readonly toastedAlertIds = new Set<string>();
  private readonly alertElements = viewChildren<ElementRef>('alertReference');

  readonly alerts = this.alertStore.alerts;

  constructor() {
    effect(() => {
      for (const element of this.alertElements()) {
        const native = element.nativeElement as HTMLElement & { toast?: () => void };
        const alertId = native.getAttribute('id');
        if (alertId && !this.toastedAlertIds.has(alertId)) {
          native.toast?.();
          this.toastedAlertIds.add(alertId);
        }
      }
    });
  }

  removeFromAlerts(alert: Alert) {
    this.alertStore.removeAlert(alert);
  }
}

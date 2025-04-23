import { Injectable, signal } from '@angular/core';
import type { Alert } from '~core/constants/alerts.constants';
import { AlertType } from '~core/constants/alerts.constants';

@Injectable({ providedIn: 'root' })
export class AlertStore {
  private readonly _alerts = signal<Alert[]>([]);

  readonly alerts = this._alerts.asReadonly();

  createSuccessAlert(message: string) {
    this.createAlert({
      id: this.generateAlertId(),
      message,
      type: AlertType.SUCCESS,
      duration: 7000,
      hasCountdown: true,
    });
  }

  createErrorAlert(message: string) {
    this.createAlert({ id: this.generateAlertId(), message, type: AlertType.ERROR });
  }

  removeAlert(alertToRemove: Alert) {
    this._alerts.update((alerts) => alerts.filter((alert) => alert !== alertToRemove));
  }

  private createAlert(alert: Alert) {
    this._alerts.update((alerts) => [...alerts, alert]);
  }

  private generateAlertId(): string {
    return Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
  }
}

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

enum AlertType {
  SUCCESS = 'success',
  ERROR = 'error',
}

type Alert = {
  message: string;
  type: AlertType;
  hasCountdown?: boolean;
  duration?: number;
};

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private readonly renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  createSuccessAlert(message: string) {
    this.createAlert({ message, type: AlertType.SUCCESS, duration: 7000, hasCountdown: true });
  }

  createErrorAlert(message: string) {
    this.createAlert({ message, type: AlertType.ERROR });
  }

  private createAlert(alert: Alert): void {
    const alertElement = this.createAlertElement(alert);
    const container = document.body;
    this.renderer.appendChild(container, alertElement);
    alertElement.toast();
  }

  private createAlertElement(alert: Alert): HTMLElement & { toast: () => void } {
    const alertElement = this.renderer.createElement('sl-alert');
    alertElement.classList.add(`alert--${alert.type}`);
    this.renderer.setAttribute(alertElement, 'closable', '');
    this.renderer.setAttribute(alertElement, 'variant', alert.type);
    if (alert.duration) {
      this.renderer.setAttribute(alertElement, 'duration', alert.duration.toString());
    }
    if (alert.hasCountdown) {
      this.renderer.setAttribute(alertElement, 'countdown', 'rtl');
    }
    this.renderer.setProperty(alertElement, 'innerHTML', alert.message);
    return alertElement as HTMLElement & { toast: () => void };
  }
}

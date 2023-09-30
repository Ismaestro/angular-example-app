import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TrackByFunction,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Alert,
  AlertData,
  AlertEvent,
  AlertEventType,
  AlertId,
  AlertService,
  AlertType,
} from '~modules/shared/services/alert.service';
import { Subject, takeUntil } from 'rxjs';
import { AppConfig } from '../../../../configs/app.config';
import { EventBusService } from '~modules/shared/services/event-bus.service';
import { getAlertConfigById } from '~modules/shared/components/alert/alerts.config';
import { TrackBy } from '~modules/shared/classes/track-by';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class AlertComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  alerts: Alert[];
  alertTimeout: ReturnType<typeof setTimeout> | undefined;
  timeoutAlertId: AlertId | undefined;
  trackAlert: TrackByFunction<Alert>;

  constructor(
    private alertService: AlertService,
    private changeDetectorRef: ChangeDetectorRef,
    private eventBusService: EventBusService,
  ) {
    this.trackAlert = TrackBy.trackAlert;
    this.alerts = [];
  }

  ngOnInit() {
    this.alertService.events$.pipe(takeUntil(this.destroy$)).subscribe((alertEvent: AlertEvent) => {
      if (alertEvent.type === AlertEventType.CREATE_ALERT) {
        this.createAlert(alertEvent);
      } else if (alertEvent.type === AlertEventType.REMOVE_ALERT) {
        this.alerts = this.alerts.filter(alert => alert.id !== alertEvent.data?.alertId);
        this.changeDetectorRef.detectChanges();
      } else if (alertEvent.type === AlertEventType.CLOSE_ALL) {
        const exceptions = alertEvent.options?.exceptions;
        this.alerts = exceptions
          ? this.alerts.filter(alert => exceptions.find(exception => alert.id === exception))
          : [];
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  createAlert(alertEvent: AlertEvent) {
    const alertData = alertEvent.data as AlertData;
    const newAlert = getAlertConfigById(alertData.alertId);
    if (newAlert) {
      this.setAlertKeys(alertData, newAlert);

      if (newAlert.options?.static) {
        this.alerts = [];
      }

      if (this.timeoutAlertId === newAlert.id && this.alertTimeout) {
        clearTimeout(this.alertTimeout);
      }

      const alertExists = this.alerts.find(alert => alert.id === newAlert.id);
      if (alertExists) {
        this.alerts = this.alerts.filter(alert => alert.id !== newAlert.id);
      }

      this.alerts.push(newAlert);
      setTimeout(() => {
        this.changeDetectorRef.detectChanges();
      }, newAlert.delay);

      this.setAlertTimeOut(newAlert);
    }
  }

  setAlertKeys(alertData: AlertData, newAlert: Alert) {
    newAlert.code = alertData.options?.code ?? undefined;
    newAlert.delay = alertData.options?.delay ?? 0;
  }

  setAlertTimeOut(newAlert: Alert) {
    if (
      !newAlert.options?.forceStay &&
      [AlertType.INFO, AlertType.SUCCESS].includes(newAlert.type)
    ) {
      this.timeoutAlertId = newAlert.id;
      this.alertTimeout = setTimeout(() => {
        this.closeAlert(newAlert);
      }, AppConfig.alertMilliseconds);
    }
  }

  buttonClicked(alert: Alert) {
    const actionType = alert.options?.button?.actionType;
    if (actionType) {
      this.eventBusService.emit({ type: actionType });
    }
  }

  closeAlert(alertClosed: Alert) {
    this.alerts = this.alerts.filter(alert => alert.message !== alertClosed.message);
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

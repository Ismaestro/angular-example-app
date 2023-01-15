import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { EventBusType } from '~modules/shared/services/event-bus.service';

export enum AlertType {
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  INFO = 'info',
}

export enum AlertId {
  GENERIC_ERROR = 'GENERIC_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  BAD_CREDENTIALS = 'BAD_CREDENTIALS',
  USER_DUPLICATED = 'USER_DUPLICATED',
  PASSWORD_CHANGED = 'PASSWORD_CHANGED',
  USER_SAVED = 'USER_SAVED',
  UPDATE_USER_ERROR = 'UPDATE_USER_ERROR',
  CURRENT_PASSWORD_ERROR = 'CURRENT_PASSWORD_ERROR',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  ACCOUNT_DELETED = 'ACCOUNT_DELETED',
  DOUBLE_VOTED = 'DOUBLE_VOTED',
  HERO_DELETED = 'HERO_DELETED',
}

export interface AlertData {
  alertId: AlertId;
  options?: AlertDataOptions;
}

export interface AlertParams {
  [key: string]: string;
}

export interface AlertDataOptions {
  code?: number;
  delay?: number;
  params?: AlertParams;
}

export interface Alert {
  id: AlertId;
  type: AlertType;
  message: string;
  code?: number;
  delay?: number;
  icon?: string;
  options?: AlertOptions;
}

export interface AlertOptions {
  static?: boolean;
  forceStay?: boolean;
  button?: {
    actionType: EventBusType;
    text: string;
  };
}

export interface AlertEvent {
  type: AlertEventType;
  data?: AlertData;
  options?: AlertEventOptions;
}
export interface AlertEventOptions {
  exceptions: AlertId[];
}

export enum AlertEventType {
  CREATE_ALERT = 'CREATE_ALERT',
  REMOVE_ALERT = 'REMOVE_ALERT',
  CLOSE_ALL = 'CLOSE_ALL',
}

@Injectable({
  providedIn: 'root',
})
export class AlertService implements OnDestroy {
  public events$: Subject<AlertEvent>;

  constructor() {
    this.events$ = new Subject();
  }

  create(alertId: AlertId, options?: AlertDataOptions) {
    this.events$.next({ type: AlertEventType.CREATE_ALERT, data: { alertId, options } });
  }

  clearAll(options?: AlertEventOptions) {
    this.events$.next({ type: AlertEventType.CLOSE_ALL, options });
  }

  ngOnDestroy(): void {
    this.events$.complete();
  }
}

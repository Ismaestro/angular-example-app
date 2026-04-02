import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { AlertService } from './alert.service';
import { AlertType } from '~core/enums/alerts.enums';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertService],
    });
    service = TestBed.inject(AlertService);
  });

  it('should be created with empty alerts', () => {
    expect(service).toBeTruthy();
    expect(service.alerts()).toEqual([]);
  });

  it('should create a success alert', () => {
    service.createSuccessAlert('Success message');

    const alerts = service.alerts();
    expect(alerts.length).toBe(1);
    expect(alerts[0].message).toBe('Success message');
    expect(alerts[0].type).toBe(AlertType.SUCCESS);
    expect(alerts[0].duration).toBe(7000);
    expect(alerts[0].hasCountdown).toBe(true);
    expect(alerts[0].id).toBeDefined();
  });

  it('should create an error alert', () => {
    service.createErrorAlert('Error message');

    const alerts = service.alerts();
    expect(alerts.length).toBe(1);
    expect(alerts[0].message).toBe('Error message');
    expect(alerts[0].type).toBe(AlertType.ERROR);
    expect(alerts[0].id).toBeDefined();
  });

  it('should remove an alert', () => {
    service.createSuccessAlert('Message 1');
    service.createErrorAlert('Message 2');

    let alerts = service.alerts();
    expect(alerts.length).toBe(2);

    const [alertToRemove] = alerts;
    service.removeAlert(alertToRemove);

    alerts = service.alerts();
    expect(alerts.length).toBe(1);
    expect(alerts[0].message).toBe('Message 2');
  });
});

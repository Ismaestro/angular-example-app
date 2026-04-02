import type { AlertType } from '~core/enums/alerts.enums';

export type Alert = {
  id: string;
  message: string;
  type: AlertType;
  hasCountdown?: boolean;
  duration?: number;
};

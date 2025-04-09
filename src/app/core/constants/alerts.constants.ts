export enum AlertType {
  SUCCESS = 'success',
  ERROR = 'error',
}

export type Alert = {
  id: string;
  message: string;
  type: AlertType;
  hasCountdown?: boolean;
  duration?: number;
};

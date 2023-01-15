import { Alert, AlertId, AlertType } from '~modules/shared/services/alert.service';
import { translations } from '../../../../../locale/translations';

// eslint-disable-next-line max-lines-per-function
export function getAlertConfigById(alertId: AlertId): Alert | undefined {
  return [
    {
      id: AlertId.GENERIC_ERROR,
      type: AlertType.DANGER,
      message: translations.unexpectedError,
    },
    {
      id: AlertId.BAD_CREDENTIALS,
      type: AlertType.INFO,
      message: translations.badCredentials,
    },
    {
      id: AlertId.NETWORK_ERROR,
      type: AlertType.DANGER,
      message: translations.networkError,
      code: 500,
    },
    {
      id: AlertId.UPDATE_USER_ERROR,
      type: AlertType.DANGER,
      message: translations.updateUserError,
    },
    {
      id: AlertId.CURRENT_PASSWORD_ERROR,
      type: AlertType.DANGER,
      message: translations.currentPasswordError,
    },
    {
      id: AlertId.SESSION_EXPIRED,
      type: AlertType.DANGER,
      message: translations.sessionExpired,
    },
    {
      id: AlertId.ACCOUNT_DELETED,
      type: AlertType.DANGER,
      message: translations.accountDeleted,
    },
    {
      id: AlertId.USER_DUPLICATED,
      type: AlertType.WARNING,
      message: translations.userDuplicated,
    },
    {
      id: AlertId.USER_SAVED,
      type: AlertType.SUCCESS,
      message: translations.userSaved,
    },
    {
      id: AlertId.PASSWORD_CHANGED,
      type: AlertType.SUCCESS,
      message: translations.passwordChanged,
    },
    {
      id: AlertId.HERO_DELETED,
      type: AlertType.SUCCESS,
      message: translations.heroDeleted,
    },
    {
      id: AlertId.DOUBLE_VOTED,
      type: AlertType.DANGER,
      message: translations.doubleVoted,
    },
  ].find(alert => alert.id === alertId);
}

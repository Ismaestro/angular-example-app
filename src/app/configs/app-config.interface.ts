export interface IAppConfig {
  bypassAuthorization: string;
  alertMilliseconds: number;
  defaultLang: string;
  customQueryParams: {
    origin: string;
    alertId: string;
  };
  languages: {
    es: string;
    en: string;
  };
  breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  endpoints: {
    graphql: string;
  };
}

import {TranslateStaticLoader} from 'ng2-translate';

export function TranslateLoaderFactory(http: any) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

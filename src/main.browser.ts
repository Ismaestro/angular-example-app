import {enableProdMode, MissingTranslationStrategy} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppBrowserModule} from './app/app.browser.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppBrowserModule, {
  missingTranslation: MissingTranslationStrategy.Error,
}).catch(err => console.log(err));

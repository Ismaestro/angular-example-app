import { Component, Inject } from '@angular/core';

import { APP_CONFIG, IAppConfig } from './app.config';

@Component({
    selector: 'toh-app',
    templateUrl: './app.component.html',
    styleUrls: [],
})

export class AppComponent {
    title: string;

    constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig) {
        this.title = this.appConfig.title;
    }
}

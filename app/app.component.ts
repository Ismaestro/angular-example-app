import {Component, Inject} from '@angular/core';

import {APP_CONFIG, IAppConfig} from './app.config';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: [],
})

export class AppComponent {
    constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig) {
    }

    title = this.appConfig.title;
}

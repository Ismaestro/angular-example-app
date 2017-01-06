import { Component, Inject } from '@angular/core';

import { APP_CONFIG, IAppConfig } from './../../app.config';

@Component({
    moduleId: module.id,
    selector: 'toh-nav',
    templateUrl: 'nav.component.html',
    styleUrls: [ 'nav.component.css' ]
})

export class NavComponent {
    menuItems;

    constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig) {
        this.menuItems = [
            { link: '/', name: 'Home' },
            { link: '/' + appConfig.routes.heroes, name: 'Heroes list' }
        ];
    }
}

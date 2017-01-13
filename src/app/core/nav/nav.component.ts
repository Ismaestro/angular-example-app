import {Component, Inject, Input} from '@angular/core';

import {APP_CONFIG} from '../../config/app.config';
import {IAppConfig} from '../../config/iapp.config';

@Component({
  selector: 'toh-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent {
  @Input() title: string;

  menuItems: any[];

  constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig) {
    this.menuItems = [
      {link: '/', name: 'Home'},
      {link: '/' + appConfig.routes.heroes, name: 'Heroes list'}
    ];
  }
}

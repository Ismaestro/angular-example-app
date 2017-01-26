import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {environment} from '../environments/environment';

@Component({
  selector: 'toh-app',
  templateUrl: './app.component.html'
})

export class AppComponent {
  title: string;

  constructor(private titleService: Title) {
    titleService.setTitle(environment.title);
  }
}

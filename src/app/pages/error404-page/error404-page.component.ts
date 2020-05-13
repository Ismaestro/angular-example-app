import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-error404-page',
  templateUrl: './error404-page.component.html',
  styleUrls: ['./error404-page.component.scss']
})

export class Error404PageComponent {
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {APP_CONFIG} from '../../../configs/app.config';
import {ProgressBarService} from '../../services/progress-bar.service';
import {NavigationEnd, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  selectedLanguage: string;
  progressBarMode: string;
  currentUrl: string;
  languages: any[];

  constructor(@Inject(APP_CONFIG) public appConfig: any,
              private progressBarService: ProgressBarService,
              private cookieService: CookieService,
              private router: Router) {
    this.languages = [{name: 'en', label: 'English'}, {name: 'es', label: 'Español'}];
  }

  ngOnInit() {
    this.selectedLanguage = this.cookieService.get('language') || 'en';

    this.progressBarService.getUpdateProgressBar().subscribe((mode: string) => {
      this.progressBarMode = mode;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }

  changeLanguage(language: string): void {
    this.cookieService.put('language', language);
    this.selectedLanguage = language;
  }
}

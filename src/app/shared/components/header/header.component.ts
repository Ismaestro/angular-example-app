import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {APP_CONFIG} from '../../../configs/app.config';
import {ProgressBarService} from '../../../core/services/progress-bar.service';
import {isPlatformBrowser} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

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
              private router: Router,
              private activatedRoute: ActivatedRoute,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.languages = [{name: 'en', label: 'English'}, {name: 'es', label: 'Español'}];
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedLanguage = localStorage.getItem('language') || 'en';
    }

    this.progressBarService.updateProgressBar$.subscribe((mode: string) => {
      this.progressBarMode = mode;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd ) {
        this.currentUrl = event.url;
      }
    });
  }

  changeLanguage(language: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', language);
    }
    this.selectedLanguage = language;
  }
}

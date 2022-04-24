import { Component, Inject, OnInit } from '@angular/core';
import { APP_CONFIG } from '~app/configs/app.config';
import { NavigationEnd, Router } from '@angular/router';
import { ROUTES_CONFIG, RoutesConfig } from '~app/configs/routes.config';
import { AuthService } from '../../../auth/auth.service';
import { StorageKey, StorageService } from '~shared/services/storage.service';
import { environment } from '~environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  selectedLanguage: string;
  baseUrl: string;
  currentUrl: string;
  languages: any[];
  isLoggedIn: boolean;

  constructor(
    @Inject(APP_CONFIG) public appConfig: any,
    @Inject(ROUTES_CONFIG) public routesConfig: any,
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) {
    this.baseUrl = environment.baseUrl;
    this.selectedLanguage = '';
    this.currentUrl = '';
    this.languages = [
      { name: 'en', label: 'English' },
      { name: 'es', label: 'Español' },
    ];
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit() {
    this.selectedLanguage = this.storageService.getCookie(StorageKey.LANGUAGE) || 'en';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        this.isLoggedIn = this.authService.isLoggedIn();
      }
    });
  }

  changeLanguage(language: string): void {
    this.storageService.setCookie(StorageKey.LANGUAGE, language);
    this.selectedLanguage = language;
  }

  logOut(): void {
    this.storageService.removeCookie(StorageKey.ACCESS_TOKEN);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.router.navigate([RoutesConfig.routes.home]);
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { APP_CONFIG } from '../../../../configs/app.config';
import { NavigationEnd, Router } from '@angular/router';
import { CookieService } from '@gorniv/ngx-universal';
import { ROUTES_CONFIG, RoutesConfig } from '../../../../configs/routes.config';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  selectedLanguage: string;
  currentUrl: string;
  languages: any[];
  isLoggedIn: boolean;

  constructor(@Inject(APP_CONFIG) public appConfig: any,
              @Inject(ROUTES_CONFIG) public routesConfig: any,
              private cookieService: CookieService,
              private authService: AuthService,
              private router: Router) {
    this.languages = [{ name: 'en', label: 'English' }, { name: 'es', label: 'Español' }];
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit() {
    this.selectedLanguage = this.cookieService.get('language') || 'en';

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        this.isLoggedIn = this.authService.isLoggedIn();
      }
    });
  }

  changeLanguage(language: string): void {
    this.cookieService.put('language', language);
    this.selectedLanguage = language;
  }

  logOut(): void {
    this.cookieService.remove('accessToken');
    this.isLoggedIn = this.authService.isLoggedIn();
    this.router.navigate([RoutesConfig.routes.home]);
  }
}

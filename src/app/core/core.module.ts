import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {throwIfAlreadyLoaded} from './module-import-guard';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ProgressBarService} from './services/progress-bar.service';
import {LoggerService} from './services/logger.service';
import {HomePage} from './pages/home/home.page';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {Error404Page} from './pages/error404/error404.page';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {HeroService} from '../modules/heroes/shared/hero.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomePage,
    Error404Page,
    HeaderComponent,
    SearchBarComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    SearchBarComponent,
    FooterComponent
  ],
  providers: [
    HeroService,
    LoggerService,
    ProgressBarService
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

import {NgModule} from '@angular/core';
import {MaterialModule} from './modules/material.module';
import {TranslateModule} from '@ngx-translate/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxExampleLibraryModule} from '@ismaestro/ngx-example-library';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {FooterComponent} from './components/footer/footer.component';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {HeaderComponent} from './components/header/header.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {Error404PageComponent} from './pages/error404-page/error404-page.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    RouterModule,
    NgxExampleLibraryModule
  ],
  declarations: [
    HomePageComponent,
    Error404PageComponent,
    HeaderComponent,
    SearchBarComponent,
    FooterComponent,
    SpinnerComponent
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    TranslateModule,
    NgxExampleLibraryModule,
    HeaderComponent,
    SearchBarComponent,
    FooterComponent,
    SpinnerComponent
  ]
})

export class SharedModule {
}

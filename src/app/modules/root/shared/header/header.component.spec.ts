import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MockComponent } from 'ng-mocks';
import { APP_CONFIG, AppConfig } from '~app/configs/app.config';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { of } from 'rxjs';
import { ROUTES_CONFIG, RoutesConfig } from '~app/configs/routes.config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '~shared/services/storage.service';
import { Apollo } from 'apollo-angular';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
  const storageServiceSpy = jasmine.createSpyObj('StorageService', [
    'getCookie',
    'setCookie',
    'removeCookie',
  ]);
  const progressBarServiceSpy = jasmine.createSpyObj('ProgressBarService', [
    'getUpdateProgressBar',
  ]);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          MatButtonModule,
          MatMenuModule,
          MatIconModule,
          MatProgressBarModule,
        ],
        declarations: [MockComponent(SearchBarComponent), HeaderComponent],
        providers: [
          { provide: StorageService, useValue: storageServiceSpy },
          { provide: MatSnackBar, useValue: matSnackBarSpy },
          { provide: APP_CONFIG, useValue: AppConfig },
          { provide: ROUTES_CONFIG, useValue: RoutesConfig },
          Apollo,
        ],
      }).compileComponents();

      storageServiceSpy.getCookie.and.returnValue('en');
      progressBarServiceSpy.getUpdateProgressBar.and.returnValue(of('query'));

      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create header component', () => {
    expect(component).toBeTruthy();
  });

  it('should change the language', () => {
    storageServiceSpy.setCookie.and.returnValue(true);
    expect(component.selectedLanguage).toBe('en');
    component.changeLanguage('es');
    expect(component.selectedLanguage).toBe('es');
  });
});

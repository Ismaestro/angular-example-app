import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {HeaderComponent} from './header.component';
import {TestsModule} from '../../modules/tests.module';
import {APP_CONFIG, AppConfig} from '../../../configs/app.config';
import {ProgressBarService} from '../../../core/services/progress-bar.service';
import {configureTestSuite} from 'ng-bullet';
import {SearchBarComponent} from '../search-bar/search-bar.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let progressBarService: ProgressBarService;
  let translateService: TranslateService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        SearchBarComponent,
        HeaderComponent
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        ProgressBarService
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.debugElement.componentInstance;
    progressBarService = TestBed.get(ProgressBarService);
    translateService = TestBed.get(TranslateService);
  });

  it('should create header component', (() => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('should update progress bar', (() => {
    fixture.detectChanges();
    expect(component.progressBarMode).toBeUndefined();
    progressBarService.updateProgressBar$.emit('query');
    expect(component.progressBarMode).toBe('query');
  }));

  it('should change language to spanish', (() => {
    fixture.detectChanges();
    expect(translateService.currentLang).toBeUndefined();
    component.changeLanguage('es');
    expect(translateService.currentLang).toBe('es');
  }));
});

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {configureTestSuite} from 'ng-bullet';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import {MockComponent, MockModule} from 'ng-mocks';
import {APP_CONFIG, AppConfig} from '../../../configs/app.config';
import {RouterTestingModule} from '@angular/router/testing';
import {MatButtonModule, MatIconModule, MatMenuModule, MatProgressBar} from '@angular/material';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MockModule(MatButtonModule),
        MockModule(MatMenuModule),
        MockModule(MatIconModule)
      ],
      declarations: [
        MockComponent(SearchBarComponent),
        MockComponent(MatProgressBar),
        HeaderComponent
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig}
      ]
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create header component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should change the language', (() => {
    expect(component.selectedLanguage).toBe('en');
    component.changeLanguage('es');
    expect(component.selectedLanguage).toBe('es');
  }));
});

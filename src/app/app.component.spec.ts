import { AppComponent } from './app.component';
import { HeaderComponent } from '~core/components/header/header.component';
import { MockComponent } from 'ng-mocks';
import { FooterComponent } from '~core/components/footer/footer.component';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const titleServiceSpy = jasmine.createSpyObj('TitleService', ['setTitle']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockComponent(HeaderComponent), MockComponent(FooterComponent)],
      declarations: [AppComponent],
      providers: [{ provide: Title, useValue: titleServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(titleServiceSpy.setTitle).toHaveBeenCalledWith('Angular Example App');
  });
});

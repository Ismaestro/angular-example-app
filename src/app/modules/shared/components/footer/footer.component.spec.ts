import { FooterComponent } from '~modules/shared/components/footer/footer.component';
import { environment } from '~environments/environment';
import { appRoutes } from '../../../../app-routes';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// eslint-disable-next-line max-lines-per-function
describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.environment).toBe(environment);
    expect(component.appRoutes).toBe(appRoutes);
    expect(component.currentYear).toBe(new Date().getFullYear());
    expect(String(component.currentYear)).toContain('202');
  });

  it('should have a link class by default', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#how-it-works')).nativeElement).toHaveClass(
      'nav-link',
    );
  });

  it('should contains logo text', () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('#footer__copyright-container p')).nativeElement
        .textContent,
    ).toContain('© 2023 Angular Example App');
  });
});

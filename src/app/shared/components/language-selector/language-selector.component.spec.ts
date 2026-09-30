import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { LanguageSelectorComponent } from './language-selector.component';

@Component({ selector: 'app-page', template: '', changeDetection: ChangeDetectionStrategy.OnPush })
class PageStubComponent {}

describe('LanguageSelectorComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LanguageSelectorComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([
          { path: '', component: PageStubComponent },
          { path: 'pokemon/:pokemonId', component: PageStubComponent },
        ]),
      ],
    });
  });

  it('should keep the language links pointing to the current page after navigating', async () => {
    const fixture = TestBed.createComponent(LanguageSelectorComponent);
    await fixture.whenStable();

    await TestBed.inject(Router).navigateByUrl('/pokemon/pikachu');
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    const hrefs = Array.from(element.querySelectorAll('a'), (link) => link.getAttribute('href'));
    expect(hrefs).toEqual(['/es/pokemon/pikachu', '/pokemon/pikachu']);
  });
});

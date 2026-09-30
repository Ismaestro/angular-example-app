import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { BULBASAUR, PIKACHU } from '~features/pokemon/testing/pokemon.fixtures';
import { PokemonCardComponent } from './pokemon-card.component';

describe('PokemonCardComponent', () => {
  it('should keep the link and the image in sync with the pokemon input', async () => {
    TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    });
    const fixture = TestBed.createComponent(PokemonCardComponent);
    const element = fixture.nativeElement as HTMLElement;

    fixture.componentRef.setInput('pokemon', PIKACHU);
    await fixture.whenStable();
    expect(element.querySelector('a')?.getAttribute('href')).toBe('/pokemon/25');
    expect(element.querySelector('img')?.getAttribute('src')).toBe('pikachu.png');

    fixture.componentRef.setInput('pokemon', BULBASAUR);
    await fixture.whenStable();
    expect(element.querySelector('a')?.getAttribute('href')).toBe('/pokemon/1');
    expect(element.querySelector('img')?.getAttribute('src')).toBe('bulbasaur.png');
  });
});

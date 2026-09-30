import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID, provideZonelessChangeDetection } from '@angular/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CropImageService } from '~features/pokemon/services/crop-image.service';
import { PokemonImageComponent } from './pokemon-image.component';

describe('PokemonImageComponent', () => {
  let fixture: ComponentFixture<PokemonImageComponent>;
  let cropImageService: { getCroppedImageUrl: ReturnType<typeof vi.fn> };

  const setup = (platformId: 'browser' | 'server') => {
    TestBed.configureTestingModule({
      imports: [PokemonImageComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: PLATFORM_ID, useValue: platformId },
        { provide: CropImageService, useValue: cropImageService },
      ],
    });
    fixture = TestBed.createComponent(PokemonImageComponent);
  };
  const image = () => (fixture.nativeElement as HTMLElement).querySelector('img');

  beforeEach(() => {
    cropImageService = {
      getCroppedImageUrl: vi
        .fn()
        .mockResolvedValueOnce('cropped-pikachu.png')
        .mockResolvedValueOnce('cropped-bulbasaur.png'),
    };
  });

  it('should render the cropped image and crop it again when the image changes', async () => {
    setup('browser');
    fixture.componentRef.setInput('image', 'pikachu.png');
    await fixture.whenStable();
    expect(image()?.getAttribute('src')).toBe('cropped-pikachu.png');

    fixture.componentRef.setInput('image', 'bulbasaur.png');
    await fixture.whenStable();
    expect(image()?.getAttribute('src')).toBe('cropped-bulbasaur.png');
    expect(cropImageService.getCroppedImageUrl).toHaveBeenLastCalledWith('bulbasaur.png');
  });

  it('should notify when the cropped image has been loaded', async () => {
    setup('browser');
    let loaded = false;
    fixture.componentInstance.loaded.subscribe(() => {
      loaded = true;
    });
    fixture.componentRef.setInput('image', 'pikachu.png');
    await fixture.whenStable();

    image()?.dispatchEvent(new Event('load'));

    expect(loaded).toBe(true);
  });

  it('should not try to crop the image on the server', async () => {
    setup('server');
    fixture.componentRef.setInput('image', 'pikachu.png');
    await fixture.whenStable();

    expect(cropImageService.getCroppedImageUrl).not.toHaveBeenCalled();
    expect(image()).toBeNull();
  });
});

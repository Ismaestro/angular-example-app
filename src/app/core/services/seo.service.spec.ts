import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SeoService } from './seo.service';
import { translations } from '~locale/translations';

describe('SeoService', () => {
  let service: SeoService;
  let titleService: Title;
  let metaService: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SeoService,
        { provide: Title, useValue: { setTitle: vi.fn() } },
        { provide: Meta, useValue: { addTags: vi.fn() } },
      ],
    });

    service = TestBed.inject(SeoService);
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setBasicTags', () => {
    it('should set title and meta tags based on translations', () => {
      service.setBasicTags();

      expect(titleService.setTitle).toHaveBeenCalledWith(translations.seoTitle);
      expect(metaService.addTags).toHaveBeenCalledWith([
        { name: 'og:title', content: translations.seoTitle },
        { name: 'twitter:title', content: translations.seoTitle },
        { name: 'description', content: translations.seoDescription },
        { name: 'og:description', content: translations.seoDescription },
        { name: 'twitter:description', content: translations.seoDescription },
      ]);
    });
  });
});

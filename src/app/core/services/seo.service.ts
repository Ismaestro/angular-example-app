import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { translations } from '~locale/translations';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  setBasicTags() {
    const { seoTitle, seoDescription } = translations;
    this.title.setTitle(seoTitle);
    this.meta.addTags([
      { name: 'og:title', content: seoTitle },
      { name: 'twitter:title', content: seoTitle },
      { name: 'description', content: seoDescription },
      { name: 'og:description', content: seoDescription },
      { name: 'twitter:description', content: seoDescription },
    ]);
  }
}

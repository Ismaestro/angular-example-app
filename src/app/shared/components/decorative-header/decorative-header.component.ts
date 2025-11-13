import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import type { SafeHtml } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from '~core/services/storage/file.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-decorative-header',
  templateUrl: './decorative-header.component.html',
  styleUrl: './decorative-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecorativeHeaderComponent {
  private readonly fileService = inject(FileService);
  private readonly domSanitizer = inject(DomSanitizer);

  readonly svgUrl = input<string | null>(null);
  readonly svgResource = rxResource({
    params: this.svgUrl,
    stream: ({ params }) => (params ? this.fileService.getFileAsText(params) : of('')),
  });
  readonly svgContent = computed<SafeHtml | null>(() => {
    const svg = this.svgResource.value();
    return svg ? this.domSanitizer.bypassSecurityTrustHtml(svg) : null;
  });
}

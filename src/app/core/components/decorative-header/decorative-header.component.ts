import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import type { SafeHtml } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from '~core/services/storage/file.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-decorative-header',
  templateUrl: './decorative-header.component.html',
  styleUrl: './decorative-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecorativeHeaderComponent {
  private readonly fileService = inject(FileService);
  private readonly domSanitizer = inject(DomSanitizer);

  readonly svgUrl = input<string>('');
  readonly svgResource = rxResource({
    request: this.svgUrl,
    loader: ({ request }) => this.fileService.getFileAsText(request),
  });
  readonly svgContent = computed<SafeHtml>(() =>
    this.domSanitizer.bypassSecurityTrustHtml(this.svgResource.value()!),
  );
}

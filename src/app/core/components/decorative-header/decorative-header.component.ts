import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  input,
} from '@angular/core';
import type { SafeHtml } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from '~core/services/file.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-decorative-header',
  templateUrl: './decorative-header.component.html',
  styleUrl: './decorative-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class DecorativeHeaderComponent implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly fileService = inject(FileService);
  private readonly domSanitizer = inject(DomSanitizer);
  private readonly destroyRef = inject(DestroyRef);

  readonly svgUrl = input<string>('');

  svgContent: SafeHtml | null = null;

  ngOnInit(): void {
    if (this.svgUrl()) {
      this.fileService
        .loadFile(this.svgUrl())
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (svg) => {
            this.svgContent = this.domSanitizer.bypassSecurityTrustHtml(svg);
            this.changeDetectorRef.markForCheck();
          },
        });
    }
  }
}

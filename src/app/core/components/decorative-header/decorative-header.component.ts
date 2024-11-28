import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FileService } from '~core/services/file.service';

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

  svgContent: SafeHtml | null = null;

  svgUrl = input<string>('');

  ngOnInit(): void {
    if (this.svgUrl()) {
      this.fileService.loadFile(this.svgUrl()).subscribe({
        next: (svg) => {
          this.svgContent = this.domSanitizer.bypassSecurityTrustHtml(svg);
          this.changeDetectorRef.markForCheck();
        },
      });
    }
  }
}

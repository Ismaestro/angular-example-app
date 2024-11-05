import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { translations } from '../locale/translations';
import { Router, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HeaderComponent } from '~modules/shared/components/header/header.component';
import { FooterComponent } from '~modules/shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  standalone: true,
})
export class AppComponent implements OnInit {
  router = inject(Router);
  titleService = inject(Title);

  ngOnInit() {
    this.setMetaTags();
  }

  setMetaTags() {
    this.titleService.setTitle(translations.title);
  }
}

import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
  currentLang: string;

  constructor(private translateService: TranslateService) {
  }

  ngOnInit() {
    this.currentLang = this.translateService.currentLang;
  }
}

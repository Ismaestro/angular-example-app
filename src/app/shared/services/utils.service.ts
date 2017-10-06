import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

declare const Modernizr;

@Injectable()
export class UtilsService {

  constructor(private snackBar: MatSnackBar,
              private translateService: TranslateService) {
  }

  checkBrowserFeatures() {
    let supported = true;
    for (let feature in Modernizr) {
      if (Modernizr.hasOwnProperty(feature) &&
        typeof Modernizr[feature] === 'boolean' && Modernizr[feature] === false) {
        supported = false;
        break;
      }
    }

    if (!supported) {
      this.translateService.get(['updateBrowser']).subscribe((texts) => {
        this.snackBar.open(texts['updateBrowser'], 'OK');
      });
    }

    return supported;
  }
}

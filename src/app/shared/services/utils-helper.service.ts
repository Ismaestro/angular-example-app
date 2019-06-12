import {Injectable} from '@angular/core';

declare const require;
const bowser = require('bowser');

@Injectable({
  providedIn: 'root'
})
export class UtilsHelperService {
  static isPalindrome(str) {
    const len = Math.floor(str.length / 2);
    for (let i = 0; i < len; i++) {
      if (str[i] !== str[str.length - i - 1]) {
        return false;
      }
    }
    return true;
  }

  static isBrowserValid() {
    const browser = bowser.getParser(window.navigator.userAgent);
    return browser.satisfies({
      windows: {
        'internet explorer': '>10',
      },
      macos: {
        safari: '>10.1'
      },
      chrome: '>20.1.1432',
      firefox: '>31',
      opera: '>22'
    });
  }
}

import {isPlatformBrowser} from '@angular/common';
import {ɵgetDOM} from '@angular/platform-browser';

export function appInitializerFactory(document: HTMLDocument, platformId: Object) {
  return () => {
    if (isPlatformBrowser(platformId)) {
      const dom = ɵgetDOM();
      const styles: any[] = Array.prototype.slice.apply(dom.querySelectorAll(document, `style[ng-transition]`));
      styles.forEach(el => {
        // Remove ng-transition attribute to prevent Angular appInitializerFactory
        // to remove server styles before preboot complete
        el.removeAttribute('ng-transition');
      });
      document.addEventListener('PrebootComplete', () => {
        // After preboot complete, remove the server scripts
        setTimeout(() => styles.forEach(el => dom.remove(el)));
      });
    }
  };
}

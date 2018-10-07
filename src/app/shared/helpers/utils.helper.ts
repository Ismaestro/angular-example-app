import {animate, AnimationTriggerMetadata, style, transition, trigger} from '@angular/animations';
declare const require;
const bowser = require('bowser');

export const scrollToElement = (element) => {
  if (element) {
    const distance = window.pageYOffset - Math.abs(element.getBoundingClientRect().y);

    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: element.getBoundingClientRect().top + window.scrollY - 150
    });

    setTimeout(() => {
      element.focus();
      element.blur(); // Trigger error messages
      element.focus();
    }, distance);
  }
};

export const isPalindrome = (str) => {
  const len = Math.floor(str.length / 2);
  for (let i = 0; i < len; i++) {
    if (str[i] !== str[str.length - i - 1]) {
      return false;
    }
  }
  return true;
};

export const isBrowserValid = () => {
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
};

export const fadeInOut: AnimationTriggerMetadata = trigger('fadeInOut', [
  transition(':enter', [
    style({opacity: 0}),
    animate(500, style({opacity: 1}))
  ]),
  transition(':leave', [
    animate(500, style({opacity: 0}))
  ])
]);


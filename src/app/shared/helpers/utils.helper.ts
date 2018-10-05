import {animate, AnimationTriggerMetadata, style, transition, trigger} from '@angular/animations';

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

export const fadeInOut: AnimationTriggerMetadata = trigger('fadeInOut', [
  transition(':enter', [
    style({opacity: 0}),
    animate(500, style({opacity: 1}))
  ]),
  transition(':leave', [
    animate(500, style({opacity: 0}))
  ])
]);


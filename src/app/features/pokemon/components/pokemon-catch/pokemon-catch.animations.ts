import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

export const catchAnimations = [
  trigger('pokeballAnimation', [
    state(
      'idle',
      style({
        opacity: 0,
        transform: `translate(var(--pokeball-starting-point))`,
        filter: 'brightness(1)',
      }),
    ),
    state(
      'catching',
      style({
        transform: `translate(var(--pokeball-pokemon-x-point), var(--pokeball-pokemon-y-point))`,
      }),
    ),
    state(
      'falling',
      style({
        transform: `translate(var(--pokeball-pokemon-x-point), var(--pokeball-ground-y-point))`,
      }),
    ),
    state(
      'shaking',
      style({
        transform: `translate(var(--pokeball-pokemon-x-point), var(--pokeball-ground-y-point)) translateX(0) rotate(0deg)`,
      }),
    ),
    state(
      'shining',
      style({
        transform: `translate(var(--pokeball-pokemon-x-point), var(--pokeball-ground-y-point))`,
        filter: 'brightness(2) scale(1.1)',
      }),
    ),
    transition('idle => catching', [
      animate(
        '1s ease-in-out',
        keyframes([
          style({ transform: `translate(var(--pokeball-starting-point))`, offset: 0 }),
          style({ opacity: 0.5, offset: 0.6 }),
          style({
            transform: `translate(var(--pokeball-pokemon-x-point), var(--pokeball-pokemon-y-point))`,
            offset: 1,
          }),
        ]),
      ),
    ]),
    transition('catching => falling', [
      animate(
        '0.3s ease-out',
        keyframes([
          style({
            transform: `translate(var(--pokeball-pokemon-x-point), var(--pokeball-pokemon-y-point))`,
            offset: 0,
          }),
          style({
            transform: `translate(var(--pokeball-pokemon-x-point), var(--pokeball-ground-y-point))`,
            offset: 1,
          }),
        ]),
      ),
    ]),
    transition('falling => shaking', [
      animate(
        '3s ease-out',
        keyframes([
          style({
            transform: `translate(var(--pokeball-pokemon-x-point), var(--pokeball-ground-y-point)) translateX(0) rotate(0deg)`,
            offset: 0,
          }),
          style({
            transform: `translate(var(--pokeball-pokemon-x-point), var(--pokeball-ground-y-point)) translateX(-3px) rotate(-10deg)`,
            offset: 0.1,
          }),
          style({
            transform: `translate(var(--pokeball-pokemon-x-point), var(--pokeball-ground-y-point)) translateX(3px) rotate(10deg)`,
            offset: 0.2,
          }),
          style({
            transform: `translate(var(--pokeball-pokemon-x-point), var(--pokeball-ground-y-point)) translateX(-3px) rotate(-5deg)`,
            offset: 0.3,
          }),
          style({
            transform: `translate(var(--pokeball-pokemon-x-point), var(--pokeball-ground-y-point)) translateX(0) rotate(0deg)`,
            offset: 0.35,
          }),
          style({
            transform: `translate(var(--pokeball-pokemon-x-point), var(--pokeball-ground-y-point)) translateX(0) rotate(0deg)`,
            offset: 0.6,
          }),
          style({
            transform: `translate(var(--pokeball-pokemon-x-point), var(--pokeball-ground-y-point)) translateX(-3px) rotate(-10deg)`,
            offset: 0.7,
          }),
          style({
            transform: `translate(var(--pokeball-pokemon-x-point), var(--pokeball-ground-y-point)) translateX(3px) rotate(10deg)`,
            offset: 0.8,
          }),
          style({
            transform: `translate(var(--pokeball-pokemon-x-point), var(--pokeball-ground-y-point)) translateX(-3px) rotate(-5deg)`,
            offset: 0.9,
          }),
          style({
            transform: `translate(var(--pokeball-pokemon-x-point), var(--pokeball-ground-y-point)) translateX(0) rotate(0deg)`,
            offset: 1,
          }),
        ]),
      ),
    ]),
    transition('shaking => shining', [
      animate(
        '2s ease-out',
        keyframes([
          style({
            transform: `translate(var(--pokeball-pokemon-x-point), var(--pokeball-ground-y-point)) scale(1)`,
            filter: 'brightness(1)',
            offset: 0,
          }),
          style({
            transform: `translate(var(--pokeball-pokemon-x-point), var(--pokeball-ground-y-point)) scale(1.1)`,
            filter: 'brightness(1.5)',
            offset: 0.2,
          }),
          style({
            transform: `translate(var(--pokeball-pokemon-x-point), var(--pokeball-ground-y-point)) scale(1)`,
            filter: 'brightness(1)',
            offset: 1,
          }),
        ]),
      ),
    ]),
  ]),
  trigger('pokemonAnimation', [
    state(
      'idle',
      style({
        opacity: 1,
        filter: 'brightness(1)',
        transform: 'scale(1) translate(0, 0)',
      }),
    ),
    state(
      'shining',
      style({
        opacity: 1,
        filter: 'brightness(2)',
      }),
    ),
    state(
      'disappear',
      style({
        opacity: 1,
        transform: 'scale(1) translate(0, 0)',
      }),
    ),
    transition('idle => shining', [
      animate(
        '2s ease-in-out',
        keyframes([
          style({ filter: 'brightness(1.2)', offset: 0.3 }),
          style({ filter: 'brightness(2)', offset: 0.6 }),
          style({ filter: 'brightness(1.5)', offset: 1 }),
        ]),
      ),
    ]),
    transition('shining => disappear', [
      animate(
        '1s ease-out',
        keyframes([
          style({
            opacity: 1,
            transform: 'scale(1) translate(0, 0)',
            offset: 0,
          }),
          style({
            opacity: 0.7,
            transform: 'scale(0.6) translate(0, -200px)',
            offset: 0.5,
          }),
          style({
            opacity: 0,
            transform: 'scale(0) translate(0, -300px)',
            offset: 1,
          }),
        ]),
      ),
    ]),
  ]),
];

import type { Pokemon } from '~features/pokemon/types/pokemon.types';

export const PIKACHU: Pokemon = {
  id: 25,
  order: '35',
  name: 'pikachu',
  height: '4',
  weight: '60',
  sprites: { front_default: 'pikachu.png', front_shiny: 'pikachu-shiny.png' },
};

export const BULBASAUR: Pokemon = {
  id: 1,
  order: '1',
  name: 'bulbasaur',
  height: '7',
  weight: '69',
  sprites: { front_default: 'bulbasaur.png', front_shiny: 'bulbasaur-shiny.png' },
};

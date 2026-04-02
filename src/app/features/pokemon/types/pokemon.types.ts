export type Pokemon = {
  id: number;
  order: string;
  name: string;
  height: string;
  weight: string;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
};

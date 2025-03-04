export type TPokemonStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  }
};

export type TPokemonType = {
  type: {
    name: string;
    url: string;
  }
};

export type TPokemonCries = {
  latest: string;
  legacy: string;
};

export type TPokemonSprites = {
  other: {
    ["official-artwork"]: {
      front_default: string;
      front_shiny: string;
    }
  }
};

export interface IPokemonDetailResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: TPokemonType[];
  stats: TPokemonStat[];
  cries: TPokemonCries;
  sprites: TPokemonSprites;
}
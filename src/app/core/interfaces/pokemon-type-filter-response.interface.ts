import { TResults } from "./common-response.interface"

export interface IPokemonTypeFilterResponse {
  pokemon: {
    pokemon: TResults
  }[]
}
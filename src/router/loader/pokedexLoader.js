import { getAllPokemons } from "../../services/getAllPokemons";
import { getAllTypes } from "../../services/getAllTypes";
import { getPokemonsByType } from "../../services/getPokemonsByType";

export const pokedexLoader = async ({ request }) => {
  const types = await getAllTypes();
  const url = new URL(request.url);
//   const isSearching = url.search;
  const name = url.searchParams.get("pokemon_name")?.toLowerCase();
  const type = url.searchParams.get("pokemon_type")?.toLowerCase();

  let pokemons;

  if (!name && !type) {
    pokemons = await getAllPokemons();
  } else if (name && type) {
    pokemons = await getPokemonsByType(type);
    pokemons = pokemons.filter((pokemon) => pokemon.name.includes(name));
  } else if (name) {
    pokemons = await getAllPokemons();
    pokemons = pokemons.filter((pokemon) => pokemon.name.includes(name));
  } else if (type) {
    pokemons = await getPokemonsByType(type);
    0;
  }

  return { types, pokemons };
};

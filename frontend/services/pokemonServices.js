import axios from "axios";

const URL = `${import.meta.env.VITE_BASE_URL}/pokemon`;

export const getPokemons = async (limit = 12, page = 1, search = "") => {
  try {
    const res = await axios.get(URL, {
      params: { limit, page, search },
    });
    const pokemons = res.data;

    return pokemons.map((p) => {
      const id = p.url.split("/").filter(Boolean).pop();
      return {
        name: p.name,
        id,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      };
    });
  } catch (err) {
    console.error("Couldn't get pokemons data:", err);
    return [];
  }
};

export const getPokemonById = async (id) => {
  try {
    const res = await axios.get(`${URL}/${id}`);
    const pokemon = res.data;

    return {
      name: pokemon.name,
      id: pokemon.id,
      abilities: pokemon.abilities,
      image: pokemon.sprites.front_default,
    };
  } catch (err) {
    console.error("Couldn't get pokemon data:", err);
    return null;
  }
};

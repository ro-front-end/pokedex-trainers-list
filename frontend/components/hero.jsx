import { useState } from "react";
import PokemonList from "./pokemonList";
import TrainersList from "./trainersList";

function Hero() {
  const [filter, setFilter] = useState("pokemons");

  return (
    <header>
      <div className="gap-4 flex mb-8 bg-black/50 ml-auto p-2 px-4 items-center text-blue-950 justify-end rounded-xl">
        <label className="text-blue-50" htmlFor="">
          Choose trainers or pokemons{" "}
        </label>
        <select
          className=" bg-blue-300 border-none py-1 px-4 rounded-xl outline-none"
          name="filter"
          id="filter"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="pokemons">Pokemons</option>
          <option value="trainers">Trainers</option>
        </select>
      </div>

      {filter === "pokemons" && <PokemonList />}
      {filter === "trainers" && <TrainersList />}
    </header>
  );
}

export default Hero;

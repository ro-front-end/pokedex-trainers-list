import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPokemonById } from "../services/pokemonServices";
import { FaDownload } from "react-icons/fa";

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemonById(id);
        console.log(data);
        setPokemon(data);
      } catch (err) {
        console.error("Error fetching details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-white text-xl">Loading Pokémon...</p>
      </div>
    );

  if (!pokemon)
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-900">
        <p className="text-white text-2xl font-bold"> Pokémon not found </p>
      </div>
    );

  return (
    <section
      className="min-h-[80vh] my-auto flex items-center justify-center p-4 sm:p-6 lg:p-8"
      style={{
        backgroundImage: `url(${pokemon.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 backdrop-blur-xl bg-black/30"></div>

      <div className="relative max-w-md w-full z-10">
        <div className="bg-black/80 rounded-3xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.02] duration-300 ">
          <div className="flex p-4">
            <Link to="/" className="text-orange-800 font-semibold ml-auto">
              ⬅ Go back
            </Link>
          </div>
          <div className="text-center space-y-5">
            <h2 className="text-3xl font-extrabold p-4 bg-black/60">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h2>
            <div className="relative bg-transparent w-full h-40 sm:h-80 md:h-96 flex items-center justify-center">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-full h-50 sm:h-96 object-contain drop-shadow-2xl relative z-10 rounded-xl"
              />
            </div>

            <div className="h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

            <div>
              <h2 className="text-lg font-semibold text-blue-700 mb-3">
                Abilities
              </h2>
              <ul className="space-y-1">
                {pokemon.abilities?.map((abilityObj) => (
                  <li
                    key={abilityObj.ability.name}
                    className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mx-1"
                  >
                    {abilityObj.ability.name.replace("-", " ")}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={`${import.meta.env.VITE_BASE_URL}/pdf/${id}`}
              className="group flex items-center justify-center gap-2 w-full bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-blue-900 font-bold py-3 px-6 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-yellow-500 my-6"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDownload className="group-hover:rotate-12 transition-transform" />
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PokemonDetails;

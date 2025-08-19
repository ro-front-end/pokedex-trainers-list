import { useEffect, useState } from "react";
import { getPokemons } from "../services/pokemonServices";
import { Link } from "react-router-dom";
import PaginationControls from "./paginationControls";
import SearchBar from "./searchBar";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 12;

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const data = await getPokemons(limit, page, search);
        setPokemons(data);
      } catch (err) {
        console.error("Could get pokemons:", err);
        setError("Couldn't load pokemons. Please try again later");
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, [page, search]);

  if (loading) return <p className="text-center p-8">Loading Pokemons...</p>;
  if (error) return <p className="text-orange-600 text-center p-8">{error}</p>;
  if (pokemons.length === 0) return <p>No pokemons yet!!!</p>;

  return (
    <section>
      <div className="mb-8">
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 ">
        {pokemons.map((p) => (
          <li
            key={p.id}
            className="relative w-full rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out h-64"
          >
            <div
              className="absolute inset-0  bg-center bg-cover"
              style={{ backgroundImage: `url('/logo-wb.png')` }}
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>{" "}
            </div>

            <h3 className="absolute top-4 w-full text-center text-white font-bold text-xl z-10">
              {p.name.toUpperCase()}
            </h3>

            <div className="relative w-full h-3/4 flex justify-center items-center z-20 mt-6">
              <img
                src={p.image}
                alt={p.name}
                className="w-32 h-32 object-contain drop-shadow-2xl"
              />
            </div>

            <Link
              to={`/pokemon/${p.id}`}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-yellow-300 text-blue-700 font-semibold rounded-full px-6 py-2 z-20 hover:scale-105 transition-transform"
            >
              Details!
            </Link>
          </li>
        ))}
      </ul>
      <div className="p-8 flex justify-center">
        <PaginationControls page={page} setPage={setPage} />
      </div>
    </section>
  );
}

export default PokemonList;

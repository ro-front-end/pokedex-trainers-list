import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PaginationControls from "./paginationControls";
import SearchBar from "./searchBar";
import { deleteTrainer, getAllTrainers } from "../services/trainersServices";
import TrainerForm from "./trainerForm";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import DownloadCSVButton from "./csvButton";

function TrainersList() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const fetchTrainers = async () => {
      setLoading(true);
      try {
        const data = await getAllTrainers(page, 12, search);
        setTrainers(data);
      } catch (err) {
        console.error("Could get trainers:", err);
        setError("Couldn't load trainers. Please try again later");
      } finally {
        setLoading(false);
      }
    };
    fetchTrainers();
  }, [page, search]);

  const handleDeleteTrainer = async (id) => {
    try {
      await deleteTrainer(id);
      const updatedTrainerList = await getAllTrainers(page, 12, search);
      setTrainers(updatedTrainerList);
    } catch (err) {
      console.error("Couldn't delete trainer:", err);
      setError("Couldn't delete trainer. Please try again later");
    }
  };

  if (loading) return <p className="text-center p-8">Loading trainers...</p>;
  if (error) return <p className="text-orange-600 text-center p-8">{error}</p>;
  if (trainers.length === 0) return <p>No trainers yet!!!</p>;

  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <SearchBar search={search} setSearch={setSearch} />
        <button
          onClick={() => setShowCreateForm(true)}
          className="p-4 text-blue-50 font-semibold cursor-pointer bg-blue-400 hover:bg-blue-500 transition duration-300 ease-in-out rounded-xl"
        >
          Add a new trainer
        </button>
        <DownloadCSVButton
          url={`${import.meta.env.VITE_BASE_URL}/trainers/csv`}
        />
      </div>

      {showCreateForm && (
        <TrainerForm
          setTrainers={setTrainers}
          onClose={() => setShowCreateForm(false)}
        />
      )}

      {editingTrainer && (
        <TrainerForm
          trainer={editingTrainer}
          setTrainers={setTrainers}
          onClose={() => setEditingTrainer(null)}
        />
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 ">
        {trainers.map((t) => (
          <li
            key={t.id}
            className="relative w-full rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out h-52"
          >
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url('/logo-wb.png')` }}
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            </div>

            <h3 className="absolute top-4 w-full text-center text-white font-bold text-xl z-10">
              {t.name.toUpperCase()}
            </h3>

            <Link
              to={`/trainers/${t.id}`}
              className="absolute bottom-21 left-1/2 -translate-x-1/2 bg-yellow-300 text-blue-700 font-semibold rounded-full px-6 py-2 z-20 hover:scale-105 transition-transform"
            >
              Details!
            </Link>

            <button
              className="z-10 absolute left-[8rem] bg-blue-400 p-2 px-4 rounded-lg bottom-4 hover:bg-yellow-600 cursor-pointer transition duration-300 ease-in-out"
              title="Edit Trainer"
              type="button"
              onClick={() => setEditingTrainer(t)}
            >
              <FaPencilAlt />
            </button>

            <button
              className="z-10 absolute bg-blue-400 p-2 px-4 right-[8rem] rounded-lg bottom-4 hover:bg-orange-600 cursor-pointer transition duration-300 ease-in-out"
              title="Delete Trainer"
              type="button"
              onClick={() => handleDeleteTrainer(t.id)}
            >
              <FaTrashAlt />
            </button>
          </li>
        ))}
      </ul>

      <div className="p-8 flex justify-center">
        <PaginationControls page={page} setPage={setPage} />
      </div>
    </section>
  );
}

export default TrainersList;

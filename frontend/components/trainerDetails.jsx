import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getTrainer, deleteTrainer } from "../services/trainersServices";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import TrainerForm from "./TrainerForm";

function TrainerDetails({ setTrainers }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const data = await getTrainer(id);
        setTrainer(data);
      } catch (err) {
        console.error("Error fetching trainer", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainer();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-white text-xl">Loading Trainer...</p>
      </div>
    );

  if (!trainer)
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-900">
        <p className="text-white text-2xl font-bold">Trainer not found</p>
      </div>
    );

  const handleDelete = async () => {
    try {
      await deleteTrainer(trainer.id);
      if (setTrainers) {
        const updatedList = await getTrainer(); // O getAllTrainers según tu servicio
        setTrainers(updatedList);
      }
      navigate("/trainers");
    } catch (err) {
      console.error("Error deleting trainer", err);
    }
  };

  return (
    <section
      className="min-h-[80vh] flex items-center justify-center p-4 sm:p-6 lg:p-8"
      style={{
        backgroundImage: `url('/logo-wb.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 backdrop-blur-xl bg-black/30"></div>

      <div className="relative max-w-md w-full z-10">
        <div className="bg-black/80 rounded-3xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.02] duration-300">
          <div className="flex p-4">
            <Link to="/" className="text-orange-800 font-semibold ml-auto">
              ⬅ Go back
            </Link>
          </div>

          {!editing ? (
            <div className="text-center space-y-5 p-4">
              <h2 className="text-3xl font-extrabold p-4 bg-black/60 rounded-xl">
                {trainer.name.toUpperCase()} {trainer.lastname.toUpperCase()}
              </h2>

              <p className="text-blue-200 font-semibold">
                Phone: {trainer.phone}
              </p>

              <div>
                <h2 className="text-lg font-semibold text-blue-700 mb-3">
                  Medals
                </h2>
                <ul className="space-y-1">
                  {trainer.medals?.map((m, i) => (
                    <li
                      key={i}
                      className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mx-1"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-center gap-4 mt-4">
                <button
                  className="flex items-center gap-2 p-3 bg-blue-400 text-white rounded-xl hover:bg-yellow-500 transition"
                  onClick={() => setEditing(true)}
                >
                  <FaPencilAlt /> Edit
                </button>
                <button
                  className="flex items-center gap-2 p-3 bg-red-500 text-white rounded-xl hover:bg-orange-600 transition"
                  onClick={handleDelete}
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          ) : (
            <TrainerForm
              trainer={trainer}
              setTrainers={setTrainers}
              onClose={() => setEditing(false)}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default TrainerDetails;

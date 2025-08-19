import { FaDumbbell, FaMedal, FaUsers } from "react-icons/fa";

export default function About() {
  return (
    <main className="min-h-screen px-4 py-12 text-blue-900 flex flex-col items-center">
      <section className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-yellow-300">About This App</h1>

        <p className="text-lg leading-relaxed text-blue-50">
          This app is designed to manage Pokémon trainers, their badges, and
          their contact info. It&apos;s a fullstack project to showcase CRUD
          operations, authentication, and CSV/PDF export features.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-left mt-10">
          <div className="bg-blue-700 p-6 rounded-2xl border border-blue-800 shadow-lg hover:shadow-yellow-400/30 transition duration-300">
            <FaDumbbell className="text-yellow-300 text-3xl mb-4" />
            <h3 className="font-semibold text-yellow-100">
              Trainer Management
            </h3>
            <p className="text-sm text-yellow-200 mt-2">
              Create trainer profiles, perform CRUD operations, and see detailed
              trainer info including medals.
            </p>
          </div>

          <div className="bg-blue-700 p-6 rounded-2xl border border-blue-800 shadow-lg hover:shadow-yellow-400/30 transition duration-300">
            <FaMedal className="text-yellow-300 text-3xl mb-4" />
            <h3 className="font-semibold text-yellow-100">
              Badges, Pokémon & Reports
            </h3>
            <p className="text-sm text-yellow-200 mt-2">
              View detailed information for each Pokémon, track stats and
              achievements, and export individual Pokémon as PDF reports.
            </p>
          </div>

          <div className="bg-blue-700 p-6 rounded-2xl border border-blue-800 shadow-lg hover:shadow-yellow-400/30 transition duration-300">
            <FaUsers className="text-yellow-300 text-3xl mb-4" />
            <h3 className="font-semibold text-yellow-100">
              Collaboration & Open Source
            </h3>
            <p className="text-sm text-yellow-200 mt-2">
              This project is part of my portfolio. Check the code on{" "}
              <strong>GitHub</strong> and explore how trainers, badges, Pokémon,
              and CSV/PDF exports are implemented.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

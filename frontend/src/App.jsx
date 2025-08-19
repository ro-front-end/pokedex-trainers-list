import About from "../components/about";
import Contact from "../components/contact";
import Hero from "../components/hero";
import PokemonDetails from "../components/pokemonDetails";
import NavBar from "../components/topbar/navBar";
import TrainerDetails from "../components/trainerDetails";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="p-8">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/trainers/:id" element={<TrainerDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

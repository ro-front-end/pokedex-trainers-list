const express = require("express");
const cors = require("cors");
const pokemonRoutes = require("./controllers/pokemonApiControllers");
const mongoose = require("mongoose");
const { PORT, MONGODB } = require("./utils/config");
const trainersRoutes = require("./controllers/trainersControllers");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(MONGODB)
  .then(() => {
    console.info("Conneceted to MONGODB");
  })
  .catch(() => {
    console.error("couldn't connect to MONGODB");
  });

app.use("/api/pokemon", pokemonRoutes);
app.use("/api/trainers", trainersRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

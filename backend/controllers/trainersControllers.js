const trainersRoutes = require("express").Router();

const { json } = require("express");
const Trainer = require("../models/trainersSchema");
const { Parser } = require("json2csv");
const { parse } = require("json2csv");

trainersRoutes.get("/", async (req, res) => {
  try {
    const { limit = 12, page = 1, search = "" } = req.query;

    // Construir filtro de búsqueda
    const query = search
      ? { name: { $regex: search, $options: "i" } } // búsqueda parcial, insensible a mayúsculas
      : {};

    const trainers = await Trainer.find(query)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    res.json(trainers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error getting trainers" });
  }
});

trainersRoutes.get("/csv", async (req, res) => {
  try {
    const trainers = await Trainer.find({});

    // Convertir arrays a strings
    const safeTrainers = trainers.map((t) => ({
      name: t.name || "",
      lastname: t.lastname || "",
      phone: t.phone || "",
      medals: Array.isArray(t.medals) ? t.medals.join(", ") : t.medals || "",
    }));

    const fields = ["name", "lastname", "phone", "medals"];
    const csv = new Parser({ fields }).parse(safeTrainers);

    res.header("Content-Type", "text/csv");
    res.attachment("trainers.csv");

    return res.send(csv);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error generating CSV" });
  }
});

trainersRoutes.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const trainer = await Trainer.findById(id);

    if (!trainer) return res.status(404).json({ error: "Trainer not found" });

    return res.json(trainer);
  } catch (error) {
    return res.status(500).json({ error: "Error getting trainer" });
  }
});

trainersRoutes.post("/", async (req, res) => {
  const { name, lastname, phone, medals } = req.body;

  if (!name || !lastname)
    return res.status(400).json({ error: "Name and lastname are required" });

  try {
    const newTrainer = new Trainer({
      name,
      lastname,
      phone,
      medals: medals || [],
    });

    const savedTrainer = await newTrainer.save();
    res.status(201).json(savedTrainer);
  } catch (error) {
    return res.status(500).json({ error: "Error saving trainer" });
  }
});

trainersRoutes.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const trainer = await Trainer.findById(id);

    if (!trainer) return res.status(404).json({ error: "Trainer not found" });

    await Trainer.findByIdAndDelete(id);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: "Error deleting trainer" });
  }
});

trainersRoutes.put("/:id", async (req, res) => {
  const { name, lastname, phone, medals } = req.body;
  const id = req.params.id;
  try {
    const trainer = await Trainer.findById(id);
    if (!trainer) return res.status(404).json({ error: "Trainer not found" });

    const editedTrainer = await Trainer.findByIdAndUpdate(
      id,
      { name, lastname, phone, medals },
      { new: true }
    );
    res.json(editedTrainer);
  } catch (error) {
    return res.status(500).json({ error: "Error updating trainer" });
  }
});

module.exports = trainersRoutes;

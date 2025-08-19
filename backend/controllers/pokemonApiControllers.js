const { default: axios } = require("axios");
const PDFDocument = require("pdfkit");

const URL = "https://pokeapi.co/api/v2/pokemon";

const pokemonRoutes = require("express").Router();

pokemonRoutes.get("/", async (req, res) => {
  try {
    const { limit = 12, page = 1, search = "" } = req.query;

    // Traer todos los Pokémon para filtrar
    const result = await axios.get(`${URL}?limit=10000`);
    let pokemons = result.data.results;

    if (search) {
      pokemons = pokemons.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Paginación
    const start = (parseInt(page) - 1) * parseInt(limit);
    const end = start + parseInt(limit);
    const paginated = pokemons.slice(start, end);

    res.json(paginated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "error getting data" });
  }
});

pokemonRoutes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await axios.get(`${URL}/${id}`);
    res.json(result.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Pokémon" });
  }
});

pokemonRoutes.get("/pdf/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await axios.get(`${URL}/${id}`);
    const pokemon = result.data;

    const doc = new PDFDocument({ size: "A4", margin: 50 });
    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${pokemon.name}.pdf`
      );
      res.send(pdfData);
    });

    // Descargar imagen
    let imageBuffer = null;
    if (pokemon.sprites?.front_default) {
      const imgRes = await axios.get(pokemon.sprites.front_default, {
        responseType: "arraybuffer",
      });
      imageBuffer = Buffer.from(imgRes.data, "binary");
    }

    // Imagen centrada
    if (imageBuffer) {
      doc.image(imageBuffer, doc.page.width / 2 - 75, 50, {
        width: 150,
        height: 150,
      });
    }

    doc.moveDown(12);

    // Nombre del Pokémon
    doc
      .font("Helvetica-Bold")
      .fontSize(28)
      .fillColor("#333")
      .text(pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1), {
        align: "center",
      });

    doc.moveDown(1);

    // Separador
    doc
      .moveTo(100, doc.y)
      .lineTo(doc.page.width - 100, doc.y)
      .strokeColor("#FFD700")
      .lineWidth(2)
      .stroke();

    doc.moveDown(2);

    // Habilidades
    doc
      .font("Helvetica")
      .fontSize(18)
      .fillColor("#444")
      .text("Abilities:", { align: "center" });

    doc.moveDown(0.5);

    pokemon.abilities?.forEach((a) => {
      doc
        .fontSize(16)
        .fillColor("#555")
        .text(`• ${a.ability.name.replace("-", " ")}`, {
          align: "center",
        });
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error getting PDF" });
  }
});

module.exports = pokemonRoutes;

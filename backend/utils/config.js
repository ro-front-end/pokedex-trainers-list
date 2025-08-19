require("dotenv").config();

const MONGODB = process.env.MONGODB_URI;

const PORT = process.env.PORT || 3001;

module.exports = { MONGODB, PORT };

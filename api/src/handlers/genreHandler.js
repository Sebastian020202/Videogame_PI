const { response } = require("express");
const { createGenreDb } = require("../controllers/genreControllers");



const createGenreHandler = async (req, res) => {
  
  try {
    const response = await createGenreDb();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  console.log(response);
};

module.exports = { createGenreHandler };

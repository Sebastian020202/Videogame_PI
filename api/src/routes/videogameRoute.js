const { Router } = require("express");
const {
  getVideogameHandler,
  getVideogameIdHandler,
  createVideogameHandler,
  deleteVideogameHandler,
  getVideogameDbHandler

  
} = require("../handlers/videogameHandler");


const { getVideogameByName } = require("../controllers/videogameControllers");

const videogameRouter = Router();

videogameRouter
  .get ("/name",getVideogameDbHandler )
  .get("/", getVideogameHandler)
  .get("/:id", getVideogameIdHandler)
  .post("/", createVideogameHandler)
  .delete("/:id", deleteVideogameHandler);

module.exports = videogameRouter;
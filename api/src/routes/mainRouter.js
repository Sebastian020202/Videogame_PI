const { Router } = require("express");
const videogameRouter = require("./videogameRoute");
const genreRouter = require("./genreRoute");

const mainRouter = Router();

mainRouter.use("/videogames",videogameRouter);

mainRouter.use("/genre", genreRouter); 

module.exports = mainRouter;

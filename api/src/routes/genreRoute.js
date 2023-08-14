const { Router } = require("express");
const {
  
  createGenreHandler,
} = require("../handlers/genreHandler");
const postsRouter = Router();

postsRouter.get("/", createGenreHandler).post("/", createGenreHandler);

module.exports = postsRouter;

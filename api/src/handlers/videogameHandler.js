const {
    createVideogameDb,
    getVideogameById,
    getAllVideogame,
    getVideogameDb,
    getVideogameApi,
    deleteVideogame,
    getVideogameByName
  } = require("../controllers/videogameControllers");
  
  const getVideogameDbHandler = async (req, res) => {
    const { name } = req.query;
    try {
      if (name) {
        const response = await getVideogameByName(name);
        return res.status(200).json(response);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };  


  const getVideogameHandler = async (req, res) => {
    const { name } = req.query;
    try {
      if (name) {
        const response = await getVideogameDb(name);
        return res.status(200).json(response);
      }
      const response = await getVideogameApi();
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // params --> /:id
  const getVideogameIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await getVideogameById(id);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const createVideogameHandler = async (req, res) => {
    const { id, name, description, platforms, background_image, released, rating, genres} = req.body;
    try {
      const response = await createVideogameDb( id, name, description, platforms, background_image, released, rating, genres);
      res.status(201).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteVideogameHandler = async (req, res) => {
    const { id } = req.params;
    try {
      await deleteVideogame(id);
      res.status(200).send("Se borro el usuario con id: " + id);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  module.exports = {
    getVideogameHandler,
    getVideogameIdHandler,
    createVideogameHandler,
    deleteVideogameHandler,
    getVideogameDbHandler,
    //getAllVideogame
  };
  
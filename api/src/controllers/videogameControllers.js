const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { Sequelize } = require("sequelize");
const URL = "https://api.rawg.io/api/games";
const { API_KEY } = process.env
const { Op } = require("sequelize");


const createVideogameDb = async (id, name, description, platforms, background_image, released, rating, genres) => {
   const newVideogame = await Videogame.create({ id, name, description, platforms, background_image, released, rating, genres });

   const genrest = await Promise.all(genres.map((id) => Genre.findByPk(id)));
   
   const mappedVideogame = {
   id,
   name,
   description,
   platforms: platforms.map((platform)=>platform),
   background_image,
   released,
   rating,
   genres: genrest.map((genre) => genre.name),
 };
 

 await newVideogame.addGenre(genrest);
 return [mappedVideogame];

};



const getVideogameById = async (id) => {
  if(isNaN(id)){
  try {
    const responseBd = [
      await Videogame.findByPk(id, {
        include: [
          {
            model: Genre,
            attributes: ["id", "name"],
            through: { attributes: [] },
          },
        ],
      }),
    ];

    const map = responseBd.map((genr) => {
      return {
        id: genr.id,
        name: genr.name,
        description: genr.description,
        platforms: genr.platforms?.map((platform) => platform),
        background_image: genr.background_image,
        released: genr.released,
        rating: genr.rating,
        genres: genr.Genres?.map((genre) => genre.name),
      };
    });

    return map;
  } catch (error) {
    throw new Error(`No se encontro el id ${id} en la base de datos`);
  }
}
else {
  try {
    const searchApi = [
      (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`))
        .data,
    ];
    const resultApi = searchApi.map(
      ({
        id,
        name,
        background_image,
        description,
        released,
        rating,
        genres,
        platforms,
      }) => {
        return {
          id,
          name,
          description,
          released,
          rating,
          background_image,
          genres: genres?.map((genre) => genre.name),
          platforms: platforms?.map((platform) => platform.platform.name),
          // platforms:platforms
        };
      }
    );
    return resultApi;
  } catch (error) {
    throw new Error(`No se encontro el id ${id} en la Api`);
  }
}


};


//---------------------------------------------------------------------------------------------------------

const totalPeti = 5;

const getVideogameApi = async () => {
  let game = [];

  for (let page = 1; page <= totalPeti; page++) {
    try {
      const searchApi = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`
      );

      const mappedData = searchApi.data.results.map(
        ({ id, name, background_image, platforms, released, rating, genres }) => {
          return {
            id,
            name,
            background_image,
            platforms: platforms?.map((platform) => platform.platform.name),
            released,
            rating,
            genres: genres?.map((genre) => genre.name),
          };
        }
      );

      game.push(...mappedData);
    } catch (error) {
      console.log(`Error en la solicitud para la página ${page}: ${error.message}`);
    }
  }

  const dataBaseVideoGame = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  const map = dataBaseVideoGame.map((genr) => {
    return {
      id: genr.id,
      name: genr.name,
      description: genr.description,
      platforms: genr.platforms,
      background_image: genr.background_image,
      released: genr.released,
      rating: genr.rating,
      genres: genr.Genres?.map((genre) => genre.name),
      created: genr.created,
    };
  });

  return [...game, ...map];
};

module.exports = getVideogameApi;



const getVideogameByName = async (name) => {
  try {
    const info = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
    const infod = info.data.results;

    const filtro = infod.filter((videogame) =>
      videogame.name.toLowerCase().includes(name.toLowerCase())
    );
    const limitedResult = filtro.slice(0, 15);

    const dbResult = limitedResult.map((videogame) => {
      return {
        id: videogame.id,
        name: videogame.name,
        description: videogame.description,
        platforms: videogame.platforms?.map((platform) => platform.platform.name),
        background_image: videogame.background_image,
        releaseDate: videogame.releaseDate,
        rating: videogame.rating,
        genres: videogame.genres?.map((genre) => genre.name),
      };
    });

    const searchBD = await Videogame.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${name}%`,
        },
      },
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });
    console.log(searchBD);
     

    const dbResponse = searchBD.map((videogame) => {
      return {
        id: videogame.id,
        name: videogame.name,
        description: videogame.description,
        platforms: videogame.platforms,
        background_image: videogame.background_image,
        releaseDate: videogame.releaseDate,
        rating: videogame.rating,
        genres: videogame.Genres?.map((genero) => genero.name),
      };
    });
    const searchResults = [...dbResult,...dbResponse];
    return searchResults;
  } catch (error) {
    throw new Error('Error al buscar el videojuego por nombre');
  }
};


module.exports = {
  createVideogameDb,
  getVideogameById,
  getVideogameApi,
  //searchResults,
  //getAllVideogame,
  getVideogameByName,
};


const axios = require ("axios")

const { Genre } = require("../db");

const { API_KEY } = process.env

const createGenreDb = async () => {
  const searchApi= (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results
  const mapGenre = searchApi.map ((Genero)=>Genero.name) 

  let genresEnd=[]
  for(const genres of mapGenre){
  
      const [genresBd] = await Genre.findOrCreate( {
          where:({name: genres})
      })
      genresEnd.push(genresBd)
  }
  
  return genresEnd

};



module.exports = {
  createGenreDb,
};

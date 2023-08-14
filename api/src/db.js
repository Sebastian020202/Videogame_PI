require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false,
  native: false,
});


sequelize
  .authenticate()
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.error("Unable to connect to the database:", error));

sequelize
  .query("SELECT current_database()")
  .then((result) => {
    console.log("Nombre de la base de datos:", result[0][0].current_database);
  })
  .catch((err) => {
    console.log("Error:", err);
  });

 const basename = path.basename(__filename);
 const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const modelDefiner = require(path.join(__dirname, '/models', file));
    modelDefiners.push(modelDefiner);
  });

modelDefiners.forEach(modelDefiner => modelDefiner(sequelize));

const { Videogame, Genre } = sequelize.models;

Genre.belongsToMany(Videogame, { through: 'VideogameGenre' });
Videogame.belongsToMany(Genre, { through: 'VideogameGenre' });


  module.exports = {
    Videogame,
    Genre,
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize,  
  }

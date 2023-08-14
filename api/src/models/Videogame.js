const { DataTypes} = require('sequelize');


module.exports = (Sequelize) =>{
Sequelize.define(
  "Videogame",
   {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  platforms: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  background_image: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      isUrl:true
    },
  },
  released: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.DECIMAL,
    validate:{
      min:1,
      max:5
    },
    },
  },
  { freezeTableName: true, timestamps: false }
 );
};


const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define(
    "Genre", {  
    id: {
      type: DataTypes.INTEGER, //  1, 10, 42
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true, timestamps: false }
  );
};



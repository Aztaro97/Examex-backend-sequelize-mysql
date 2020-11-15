'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Serie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Serie.belongsTo(models.Level , {
        foreignKey: {
          allowNull: false
        }
      })

      models.Serie.hasMany(models.Matiere)
    }
  };
  Serie.init({
    LevelId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Serie',
  });
  return Serie;
};
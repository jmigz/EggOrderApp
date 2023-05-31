const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EggTray extends Model {
    static associate(models) {
      EggTray.hasMany(models.Order, { foreignKey: 'trayId' });
    }
  }
  EggTray.init(
    {
      type: DataTypes.STRING,
      price: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: 'EggTray',
    }
  );

  // Create the trays if they don't exist
  EggTray.findOrCreate({ where: { type: "18's" }, defaults: { price: 50 } });
  EggTray.findOrCreate({ where: { type: "30's" }, defaults: { price: 60 } });
  EggTray.findOrCreate({ where: { type: "6's" }, defaults: { price: 15 } });

  return EggTray;
};
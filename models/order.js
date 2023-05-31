'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.EggTray, {
        foreignKey: 'trayId',
        targetKey: 'id',
      });
    }
  }
  Order.init(
    {
      name: DataTypes.STRING,
      dept: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      trayType: DataTypes.INTEGER, // Include the trayType field in the Order model
      price: DataTypes.DECIMAL,
      total: DataTypes.DECIMAL,
      delivered: DataTypes.BOOLEAN,
      paid: DataTypes.BOOLEAN,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      deliveredAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      paidAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};

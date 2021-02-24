'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.Product)
    }
  };
  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: {
          args: 1
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};
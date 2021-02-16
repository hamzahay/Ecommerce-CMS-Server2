'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'name is requried' }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.DOUBLE,
      validate: {
        notEmpty: { msg: 'price is required' }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: { msg: 'stock is required' },
        min: {
          args: [0],
          msg: 'stock has to more or equal to 0'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
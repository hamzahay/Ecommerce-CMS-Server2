'use strict';
const { hashPass } = require('../helper/bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Product, { through: models.Cart, foreignKey: 'UserId' })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        notEmpty: { msg: 'email is required' },
        isEmail: { msg: 'not a valid email format' }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'password is required' }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'customer',
      validate: {
        notEmpty: { msg: 'role is required' }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, option) => {
        user.password = hashPass(user.password)
      }
    }
  });
  return User;
};
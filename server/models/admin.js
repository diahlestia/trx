'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init({
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name',
    },
    lastName: {
        type: DataTypes.STRING,
        field: 'last_name',
    },
    email: DataTypes.STRING,
    birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'birth_date',
    },
    gender: DataTypes.STRING,
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'hashed_password',
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updated_at',
        defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Admin',
  });
  Admin.beforeCreate((ins, opt) => {
    ins.password = bcrypt.hashSync(ins.password, 5)
  })
  return Admin;
};
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TransactionDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relasi ke model Transaction
      TransactionDetail.belongsTo(models.Transaction, {
        foreignKey: 'transactionId',
        as: 'transaction',
      });

      // Relasi ke model Product
      TransactionDetail.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
      });
    }
  }

  TransactionDetail.init({
    transactionId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TransactionDetail',
  });

  return TransactionDetail;
};

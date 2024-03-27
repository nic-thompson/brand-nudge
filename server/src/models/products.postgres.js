const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/postgres');

const Product = sequelize.define(
  'product',
  {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    retailer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ean: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    on_promotion: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    promotion_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    base_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    shelf_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    promoted_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  { timestamps: false }
);

module.exports = Product;

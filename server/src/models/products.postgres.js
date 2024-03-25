const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/postgres'); // Assuming you have a Sequelize connection instance

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
      unique: true, // Assuming EAN is a unique identifier
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
      allowNull: true, // Assuming Image may be null if not provided
    },
    on_promotion: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default value is false
    },
    promotion_description: {
      type: DataTypes.STRING,
      allowNull: true, // Assuming PromotionDescription may be null if not provided
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
      allowNull: true, // Assuming PromotedPrice may be null if not on promotion
    },
  },
  { timestamps: false }
);

// Exporting the Product model
module.exports = Product;

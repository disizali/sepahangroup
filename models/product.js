"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.TEXT
    },
    {}
  );
  Product.associate = function(models) {
    Product.hasMany(models.Type);
  };
  return Product;
};
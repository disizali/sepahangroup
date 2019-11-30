"use strict";
module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define(
    "Type",
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      thinkness: DataTypes.INTEGER,
      width: DataTypes.INTEGER,
      brand: DataTypes.STRING,
      mood: DataTypes.STRING,
      deliver: DataTypes.STRING,
      unit: DataTypes.STRING,
      price: DataTypes.INTEGER
    },
    {}
  );
  Type.associate = function(models) {
    Type.belongsTo(models.Product);
  };
  return Type;
};

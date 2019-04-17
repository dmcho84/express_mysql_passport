"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      }
    },
    {}
  );

  User.associate = function(models) {
    User.hasMany(models.Category);
    // associations can be defined here
  };
  return User;
};

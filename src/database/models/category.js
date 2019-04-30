'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      identity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {},
  );
  Category.associate = function(models) {
    console.log(models);
    Category.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });

    Category.hasMany(models.Board);
    // Category.belongsTo(models.User, {
    //   foreignKey: "userId"
    // });
    // associations can be defined here
  };
  return Category;
};

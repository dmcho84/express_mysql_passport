'use strict';
module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    'Board',
    {
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT,
      },
      personal: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {},
  );
  Board.associate = function(models) {
    Board.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false,
      },
    });
    Board.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    // associations can be defined here
  };
  return Board;
};

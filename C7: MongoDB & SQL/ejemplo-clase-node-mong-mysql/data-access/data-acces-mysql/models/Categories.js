const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Categories",
    {
      categoryId: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      billsLimit: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
      familyId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "Families",
          key: "familyId",
        },
      },
      inactive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      image: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Categories",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "categoryId" }],
        },
        {
          name: "fk_Category_Family_idx",
          using: "BTREE",
          fields: [{ name: "familyId" }],
        },
        {
          name: "unq",
          using: "BTREE",
          fields: [{ name: "familyId" }, { name: "name" }],
        },
      ],
    }
  );
};

var DataTypes = require("sequelize").DataTypes;
var _Categories = require("./Categories");
var _Families = require("./Families");

function initModels(sequelize) {
  var Categories = _Categories(sequelize, DataTypes);
  var Families = _Families(sequelize, DataTypes);

  Categories.belongsTo(Families, { as: "family", foreignKey: "familyId" });
  Families.hasMany(Categories, { as: "Categories", foreignKey: "familyId" });

  return {
    Categories,
    Families,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

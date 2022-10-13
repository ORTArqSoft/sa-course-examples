var dbModels;
const { QueryTypes } = require("sequelize");

const setDbModels = function (models) {
  dbModels = models;
};

const check = async function (id) {
  let sql = ` SELECT now();`;
  let results = await dbModels.sequelize.query(sql, {
    replacements: {},
    type: QueryTypes.SELECT,
  });

  return results;
};

module.exports = {
  check,
  setDbModels,
};

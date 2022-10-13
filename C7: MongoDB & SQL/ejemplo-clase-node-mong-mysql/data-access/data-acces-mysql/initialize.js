const { initModels } = require("./models/init-models");
require("dotenv").config();
const Sequelize = require("sequelize");
const initializeModels = async function () {
  console.log(`[initialize: api] [function: initializeModels] [type:I] system init mysql models}`);

  try {
    //database connection string
    let connectionString = process.env.MYSQL_DB || "";

    //open connection
    const sequelize = new Sequelize(connectionString);

    //initialize models
    let models = initModels(sequelize);
    models.sequelize = sequelize;

    //sinchronize models and tables
    await models.Families.sync();
    await models.Categories.sync();

    return models;
  } catch (e) {
    console.log(
      `[initialize: api] [function: initializeModels] [type:E] ${e} Error connecting database, system will stop.`
    );
    process.exit(1);
  }
};
module.exports = {
  initializeModels,
};

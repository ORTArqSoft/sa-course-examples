const { initializeRoutes } = require("./controllers/middleware");
const { initializeModels } = require("./data-access/data-acces-mysql/initialize");

const familiesService = require("./services/families/families-services");
const categoriesService = require("./services/categories/categories-services");
const dbService = require("./services/db/db-services");
const billsService = require("./services/bills/bills-service");

const { initializeMongoDB } = require("./data-access/data-access-mongo/connect-mongodb");

const main = async function () {
  /* mysql services */
  let mySQLdbModels = await initializeModels();
  let mySqlServices = [familiesService, categoriesService, dbService];
  await setModelsToServices(mySqlServices, mySQLdbModels);

  /* mongo services services */
  let mongoDbModels = await initializeMongoDB();

  let serviceService = {
    familiesService: familiesService,
    categoriesService: categoriesService,
    dbService: dbService,
    billsService: billsService,
  };

  await initializeRoutes(serviceService);
};

main();

const setModelsToServices = async (services, dbModels) => {
  await services.forEach(async (Service) => {
    Service.setDbModels(dbModels);
  });
};

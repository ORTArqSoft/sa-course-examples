require("dotenv").config();
var express = require("express");
var app = express();
app.use(express.json());
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");

/* get config */
const config = require("config");
const baseUrl = config.webServer.baseUrl;
const port = process.env.PORT || "3000";

/* require controllers  */
const { startFamiliesRoutes } = require("./families/families-controller");
const { startCategoriesRoutes } = require("./categories/categories-controller");
const { startHealthCheckRoutes } = require("./health-check/health-check-api");
const { startBillsRoutes } = require("./bills/bills-controller");
const tokenValidator = require("./token-validator");

const doCommonFilter = (app) => {
  /*start filtros del middleware*/
  app.use(express.static("public"));
  app.use(express.json());

  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "DELETE", "UPDATE", "PUT"],
    })
  );
};

const doCustomFilter = (app) => {
  app.use(tokenValidator.tokenValidator);
};

const initializeRoutes = async function (services) {
  doCommonFilter(app); /*expres filtes for all request*/
  doCustomFilter(app); /*validate token*/

  let router = express.Router();
  await startHealthCheckRoutes(router, services.dbService);
  await startFamiliesRoutes(router, services.familiesService);
  await startCategoriesRoutes(router, services.categoriesService);
  await startBillsRoutes(router, services.billsService);

  app.use(baseUrl, router);
  server.listen(port, () => {
    console.log(`[service: middleware] [function: initializeRoutesServer] [tyoe:I] is running on port ${port}`);
  });
};

module.exports = {
  initializeRoutes,
};

const { HttpErrorCodes } = require("../../exceptions/exceptions");
const { evalException } = require("../../exceptions/exceptions");

/* get config */
const config = require("config");
const routes = config.get("webServer.routes");

const startHealthCheckRoutes = async function startFamiliesRoutes(router, logic) {
  var logicHealt = logic;
  router.get(routes.health_check, async function (req, res) {
    try {
      /***** logic to check health *****/
      let data = await logicHealt.check();
      return res.status(HttpErrorCodes.HTTP_200_OK).send(data);
    } catch (err) {
      return evalException(err, res);
    }
  });
};

module.exports = {
  startHealthCheckRoutes,
};

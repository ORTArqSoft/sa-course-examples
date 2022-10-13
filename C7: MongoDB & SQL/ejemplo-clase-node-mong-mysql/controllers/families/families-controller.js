const { HttpErrorCodes } = require("../../exceptions/exceptions");
const { evalException } = require("../../exceptions/exceptions");
const { extract } = require("./extract-families-get-all-filters");

/* get config */
const config = require("config");
const routes = config.get("webServer.routes");

var FamiliesLogic;

const startFamiliesRoutes = async function startFamiliesRoutes(router, logic) {
  FamiliesLogic = logic;

  router.delete(routes.families_id, async function (req, res) {
    try {
      let id = req.params.id;
      await FamiliesLogic.remove(id);
      return res.status(HttpErrorCodes.HTTP_200_OK).send({});
    } catch (err) {
      return evalException(err, res);
    }
  });

  router.get(routes.families, async function (req, res) {
    try {
      const filter = extract(req);
      let Families = await FamiliesLogic.getAll(filter);
      return res.status(HttpErrorCodes.HTTP_200_OK).send(JSON.stringify(Families));
    } catch (err) {
      return evalException(err, res);
    }
  });

  router.get(routes.families_id, async function (req, res) {
    try {
      let id = req.params.id;
      let anFamilies = await FamiliesLogic.get(id);
      return res.status(HttpErrorCodes.HTTP_200_OK).send(JSON.stringify(anFamilies));
    } catch (err) {
      return evalException(err, res);
    }
  });

  router.post(routes.families, async function (req, res) {
    try {
      let anFamilies = req.body;
      console.log(FamiliesLogic);
      let newFamilies = await FamiliesLogic.create(anFamilies);
      return res.status(HttpErrorCodes.HTTP_200_OK).send(newFamilies);
    } catch (err) {
      return evalException(err, res);
    }
  });

  router.put(routes.families_id, async function (req, res) {
    try {
      let id = req.params.id;
      let anFamilies = req.body;
      let FamiliesUpdated = await FamiliesLogic.update(id, anFamilies);
      return res.status(HttpErrorCodes.HTTP_200_OK).send(FamiliesUpdated);
    } catch (err) {
      return evalException(err, res);
    }
  });
};

module.exports = {
  startFamiliesRoutes,
};

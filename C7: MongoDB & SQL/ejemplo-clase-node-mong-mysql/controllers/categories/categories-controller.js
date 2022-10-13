const { HttpErrorCodes } = require("../../exceptions/exceptions");
const { evalException } = require("../../exceptions/exceptions");
const { extract } = require("./extract-categories-get-all-filters");

/* get config */
const config = require("config");
const routes = config.get("webServer.routes");

var categoriesLogic;

const startCategoriesRoutes = async function startCategoriesRoutes(router, logic) {
  categoriesLogic = logic;
  router.delete(routes.categories_id, async function (req, res) {
    try {
      let id = req.params.id;
      await categoriesLogic.remove(id);
      return res.status(HttpErrorCodes.HTTP_200_OK).send({});
    } catch (err) {
      return evalException(err, res);
    }
  });

  router.get(routes.categories, async function (req, res) {
    try {
      const filter = extract(req);
      let categories = await categoriesLogic.getAll(filter);
      return res.status(HttpErrorCodes.HTTP_200_OK).send(JSON.stringify(categories));
    } catch (err) {
      return evalException(err, res);
    }
  });

  router.get(routes.categories_id, async function (req, res) {
    try {
      let id = req.params.id;
      let aCategory = await categoriesLogic.get(id);
      return res.status(HttpErrorCodes.HTTP_200_OK).send(JSON.stringify(aCategory));
    } catch (err) {
      return evalException(err, res);
    }
  });

  router.post(routes.categories, async function (req, res) {
    try {
      let aCategory = req.body;
      console.log(categoriesLogic);
      let newCategory = await categoriesLogic.create(aCategory);
      return res.status(HttpErrorCodes.HTTP_200_OK).send(newCategory);
    } catch (err) {
      return evalException(err, res);
    }
  });

  router.put(routes.categories_id, async function (req, res) {
    try {
      let id = req.params.id;
      let aCategory = req.body;
      let categoryUpdated = await categoriesLogic.update(id, aCategory);
      return res.status(HttpErrorCodes.HTTP_200_OK).send(categoryUpdated);
    } catch (err) {
      return evalException(err, res);
    }
  });
};

module.exports = {
  startCategoriesRoutes,
};

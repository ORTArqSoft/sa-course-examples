const { HttpErrorCodes } = require("../../exceptions/exceptions");
const { evalException } = require("../../exceptions/exceptions");
const { extract } = require("./extract-bills-get-all-filters");

/* get config */
const config = require("config");
const routes = config.get("webServer.routes");

var billsLogic;

const startBillsRoutes = async function startBillsRoutes(router, logic) {
  billsLogic = logic;
  router.delete(routes.bills_id, async function (req, res) {
    try {
      let id = req.params.id;
      await billsLogic.remove(id);
      return res.status(HttpErrorCodes.HTTP_200_OK).send({});
    } catch (err) {
      return evalException(err, res);
    }
  });

  router.get(routes.bills, async function (req, res) {
    try {
      const filter = extract(req);
      let bills = await billsLogic.getAll(filter);
      return res.status(HttpErrorCodes.HTTP_200_OK).send(JSON.stringify(bills));
    } catch (err) {
      return evalException(err, res);
    }
  });

  router.get(routes.bills_id, async function (req, res) {
    try {
      let id = req.params.id;
      let aBill = await billsLogic.get(id);
      return res.status(HttpErrorCodes.HTTP_200_OK).send(JSON.stringify(aBill));
    } catch (err) {
      return evalException(err, res);
    }
  });

  router.post(routes.bills, async function (req, res) {
    try {
      let aBill = req.body;
      let newBill = await billsLogic.create(aBill);
      return res.status(HttpErrorCodes.HTTP_200_OK).send(newBill);
    } catch (err) {
      return evalException(err, res);
    }
  });

  router.put(routes.bills_id, async function (req, res) {
    try {
      let id = req.params.id;
      let aBill = req.body;
      let billUpdated = await billsLogic.update(id, aBill);
      return res.status(HttpErrorCodes.HTTP_200_OK).send(billUpdated);
    } catch (err) {
      return evalException(err, res);
    }
  });
};

module.exports = {
  startBillsRoutes,
};

const { ElementNotFoundException } = require("../../exceptions/exceptions.js");
const { ElementAllreadyExist } = require("../../exceptions/exceptions.js");
const { messageBinder } = require("./locale/locale-binder");
const { DtoResponse } = require("../../dto/dto-response");
const { validate } = require("./validate-bills");
const { pepareFilters } = require("./prepare-filters");
const Bill = require("../../data-access/data-access-mongo/Models/Bills");

const remove = async function (id) {
  let billToRemove = await Bill.findOne({ _id: id });
  if (!billToRemove) {
    throw new ElementNotFoundException(messageBinder().notFound);
  }

  let filter = { _id: id };
  await Bill.findByIdAndDelete(filter);
  return;
};

const create = async function (aBill) {
  if (aBill.billId) {
    let billExists = await Bill.findOne({ _id: aBill.billId });
    if (billExists) {
      throw new ElementAllreadyExist(messageBinder().alreadyExist);
    }
  }
  validate(aBill);
  let bill = new Bill();
  bill.date = new Date().toISOString();
  bill.amount = aBill.amount;
  bill.category = aBill.category;
  bill.familyId = aBill.familyId;
  bill.description = aBill.description;
  let newBill = await bill.save();
  return newBill;
};

const update = async function (id, aBill) {
  let billForUpdate = await Bill.findOne({ _id: id });
  if (!billForUpdate) {
    throw new ElementNotFoundException(messageBinder().notFound);
  }
  validate(aBill);
  let filter = { _id: id };
  try {
    await Bill.findByIdAndUpdate(filter, aBill);
  } catch (err) {
    console.log("Un error al actualizar: " + JSON.stringify(err));
  }
  return aBill;
};

const getAll = async function (requestFilter) {
  let filter = pepareFilters(requestFilter);
  let bills = await Bill.find(filter.where).skip(filter.skip).limit(filter.limit);
  if (!bills) {
    throw new ElementNotFoundException(messageBinder().notFound);
  }
  let response = new DtoResponse();
  response.data = bills;
  response.count = await Bill.count(filter);
  return response;
};

const get = async function (id) {
  let aBill = await Bill.findOne({ _id: id });
  if (!aBill) {
    throw new ElementNotFoundException(messageBinder().notFound);
  }
  return aBill;
};

module.exports = {
  remove,
  get,
  getAll,
  create,
  update,
};

const { ElementNotFoundException } = require("../../exceptions/exceptions.js");
const { ElementAllreadyExist } = require("../../exceptions/exceptions.js");
const { messageBinder } = require("./locale/locale-binder");
const { DtoResponse } = require("../../dto/dto-response");
const { validate } = require("./validate-families");
const { pepareFilters } = require("./prepare-filters");

var dbModels;

const setDbModels = function (models) {
  dbModels = models;
};

const remove = async function (id) {
  let familyToRemove = await dbModels.Families.findByPk(id);
  if (!familyToRemove) {
    throw new ElementNotFoundException(messageBinder().notFound);
  }

  let filter = { where: { familyId: id } };
  await dbModels.Families.destroy(filter);
  return;
};

const create = async function (aFamily, t) {
  if (aFamily.familyId) {
    let familyExists = await dbModels.Families.findByPk(aFamily.familyId);
    if (familyExists) {
      throw new ElementAllreadyExist(messageBinder().alreadyExist);
    }
  }

  let familyExists = await dbModels.Families.findOne({ where: { name: aFamily.name } });
  if (familyExists) {
    console.log(`familyExists ${familyExists}`);
    throw new ElementAllreadyExist(messageBinder().alreadyExist);
  }

  validate(aFamily);

  let newFamily = await dbModels.Families.create(aFamily, { transaction: t });

  return newFamily;
};

const update = async function (id, aFamily) {
  let familyForUpdate = await dbModels.Families.findByPk(id);
  if (!familyForUpdate) {
    throw new ElementNotFoundException(messageBinder().notFound);
  }
  validate(aFamily);
  let filter = { where: { familyId: id } };
  try {
    await dbModels.Families.update(aFamily, filter);
  } catch (err) {
    console.log("Un error al actualizar: " + JSON.stringify(err));
  }
  return aFamily;
};

const getAll = async function (requestFilter) {
  let filter = pepareFilters(requestFilter);
  let families = await dbModels.Families.findAll(filter);
  if (!families) {
    throw new ElementNotFoundException(messageBinder().notFound);
  }
  let response = new DtoResponse();
  response.data = families;

  response.count = await dbModels.Families.count(filter);
  return response;
};

const get = async function (id) {
  let aFamily = await dbModels.Families.findByPk(id);
  if (!aFamily) {
    throw new ElementNotFoundException(messageBinder().notFound);
  }
  return aFamily;
};

module.exports = {
  remove,
  get,
  getAll,
  create,
  update,
  setDbModels,
};

const { ElementNotFoundException } = require("../../exceptions/exceptions.js");
const { ElementAllreadyExist } = require("../../exceptions/exceptions.js");
const { messageBinder } = require("./locale/locale-binder");
const { DtoResponse } = require("../../dto/dto-response");
const { validate } = require("./validate-categories");
const { pepareFilters } = require("./prepare-filters");

var dbModels;

const setDbModels = function (models) {
  dbModels = models;
};

const remove = async function (id) {
  let categoryToRemove = await dbModels.Categories.findByPk(id);
  if (!categoryToRemove) {
    throw new ElementNotFoundException(messageBinder().notFound);
  }

  let filter = { where: { categoryId: id } };
  await dbModels.Categories.update({ inactive: !categoryToRemove.inactive }, filter);
  return;
};

const create = async function (aCategory) {
  if (aCategory.id) {
    let categoryExists = await dbModels.Categories.findByPk(aCategory.id);
    if (categoryExists) {
      throw new ElementAllreadyExist(messageBinder().alreadyExist);
    }
  }
  validate(aCategory);
  aCategory.inactive = false;
  aCategory.image = "#";
  let newFamily = await dbModels.Categories.create(aCategory);
  return newFamily;
};

const update = async function (id, aCategory) {
  let categoryForUpdate = await dbModels.Categories.findByPk(id);
  if (!categoryForUpdate) {
    throw new ElementNotFoundException(messageBinder().notFound);
  }
  validate(aCategory);
  let filter = { where: { categoryId: id } };
  try {
    await dbModels.Categories.update(aCategory, filter);
  } catch (err) {
    console.log("Un error al actualizar: " + JSON.stringify(err));
  }
  return aCategory;
};

const setImage = async function (id, image) {
  let categoryForUpdate = await dbModels.Categories.findByPk(id);
  if (!categoryForUpdate) {
    throw new ElementNotFoundException(messageBinder().notFound);
  }
  let aCategory = { image: image };
  let filter = { where: { categoryId: id } };
  try {
    await dbModels.Categories.update(aCategory, filter);
  } catch (err) {
    console.log("Un error al actualizar: " + JSON.stringify(err));
  }
  return aCategory;
};

const getAll = async function (requestFilter) {
  let filter = pepareFilters(requestFilter, dbModels);
  let categories = await dbModels.Categories.findAll(filter);
  if (!categories) {
    throw new ElementNotFoundException(messageBinder().notFound);
  }
  let response = new DtoResponse();
  response.data = categories;
  response.count = await dbModels.Categories.count(filter);
  return response;
};

const get = async function (id) {
  let aCategory = await dbModels.Categories.findByPk(id);
  if (!aCategory) {
    throw new ElementNotFoundException(messageBinder().notFound);
  }
  return aCategory;
};

module.exports = {
  setImage,
  remove,
  get,
  getAll,
  create,
  update,
  setDbModels,
};

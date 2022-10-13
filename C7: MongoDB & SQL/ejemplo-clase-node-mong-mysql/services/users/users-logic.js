const { ElementNotFoundException } = require("../../exceptions/exceptions.js");
const { ElementAllreadyExist } = require("../../exceptions/exceptions.js");
const { InvalidCredentials } = require("../../exceptions/exceptions.js");

const { messageBinder } = require("./locale/locale-binder");
const { DtoResponse } = require("../../dto/dto-response");
const { validate } = require("./validate-users");
const loginLogic = require("../login/login-logic");
const familyLogic = require("../families/families-logic");
const { pepareFilters } = require("./prepare-filters");
const { v4: uuidv4 } = require("uuid");

var dbModels;

const setDbModels = function (models) {
  dbModels = models;
};

const remove = async function (id) {
  let userToRemove = await dbModels.Users.findByPk(id);
  if (!userToRemove) {
    throw new ElementNotFoundException(messageBinder().notFound);
  }
  let filter = { where: { userId: id } };
  await dbModels.Users.destroy(filter);
  return;
};

const create = async function (anUser) {
  if (anUser.id) {
    let UserExists = await dbModels.Users.findByPk(anUser.id);
    if (UserExists) {
      throw new ElementAllreadyExist(messageBinder().allreadyExist);
    }
  }

  let userExists = await dbModels.Users.findOne({ where: { email: anUser.email } });
  if (userExists) {
    throw new ElementAllreadyExist(messageBinder().allreadyExist);
  }

  validate(anUser);
  const t = await dbModels.sequelize.transaction();
  let v = uuidv4();

  try {
    if (!anUser.familyId || anUser.familyId == 0) {
      familyLogic.setDbModels(dbModels);
      let family = {
        name: anUser.familyName,
        API_KEY: v.toString(),
      };
      let newFamily = await familyLogic.create(family, t);
      anUser.familyId = newFamily.familyId;
      anUser.isAdministrator = true;
    } else {
      anUser.isAdministrator = false;
      isValidInvitation(anUser.familyId, anUser.inviteId);
    }

    let newUser = await dbModels.Users.create(anUser, { transaction: t });
    newUser.password = anUser.password;
    await loginLogic.setDbModels(dbModels);
    await loginLogic.create(newUser, t);

    await t.commit();
    return newUser;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const isValidInvitation = async (familyId, inviteId) => {
  let invite = await dbModels.invites.findByPk(inviteId);
  if (!invite) {
    throw new ElementNotFoundException("No se ha recibido ninguna invitación!");
  }
  if (invite.familyId != familyId) {
    throw new InvalidCredentials(messageBinder().notFound);
  }
  return true;
};

const update = async function (id, anUser) {
  let userForUpdate = await dbModels.Users.findByPk(id);
  if (!userForUpdate) {
    throw new ElementNotFoundException(messageBinder().notFound);
  }
  validate(anUser);
  let filter = { where: { userId: id } };
  await dbModels.Users.update(anUser, filter);
  return anUser;
};

const getAll = async function (requestFilter) {
  let filter = pepareFilters(requestFilter);
  let users = await dbModels.Users.findAll(filter);
  if (!users) {
    throw new ElementNotFoundException(messageBinder().notFound);
  }
  let response = new DtoResponse();
  response.data = users;
  response.count = await dbModels.Users.count(filter);
  return response;
};

const get = async function (id) {
  let filter = {
    include: {
      model: dbModels.Families,
      as: "family",
    },
    where: { userId: id },
  };
  let anUser = await dbModels.Users.findOne(filter);
  if (!anUser) {
    throw new ElementNotFoundException(messageBinder().notFound);
  }
  return anUser;
};

module.exports = {
  remove,
  get,
  getAll,
  create,
  update,
  setDbModels,
};

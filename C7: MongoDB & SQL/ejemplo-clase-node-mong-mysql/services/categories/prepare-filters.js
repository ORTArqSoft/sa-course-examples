require("dotenv").config();
const { Op } = require("sequelize");

const pepareFilters = (requestFilter, dbModels) => {
  let filter = {
    offset: +process.env.PAGING_DEFAULT_RECORD_OFFSET,
    limit: +process.env.PAGING_DEFAULT_RECORD_LIMIT,
  };

  if (requestFilter.hasOwnProperty("limit") && requestFilter.limit) {
    filter.limit =
      requestFilter.limit <= +process.env.PAGING_DEFAULT_MAX_RECORD_LIMIT
        ? +requestFilter.limit
        : +process.env.PAGING_DEFAULT_RECORD_LIMIT;
  }

  if (requestFilter.hasOwnProperty("offset") && requestFilter.offset) {
    filter.offset = requestFilter.offset;
  }
  let where = {};
  if (requestFilter.hasOwnProperty("name") && requestFilter.name) {
    where.name = { [Op.like]: `%${requestFilter.name}%` };
  }

  if (requestFilter.hasOwnProperty("description") && requestFilter.description) {
    where.description = { [Op.like]: `%${requestFilter.description}%` };
  }

  if (requestFilter.hasOwnProperty("billsLimit") && requestFilter.billsLimit) {
    where.billsLimit = { [Op.gte]: `${+requestFilter.billsLimit}` };
  }

  if (requestFilter.hasOwnProperty("familyId") && requestFilter.familyId) {
    where.familyId = requestFilter.familyId;
  }

  if (requestFilter.hasOwnProperty("inactivefilter")) {
    if (requestFilter.inactivefilter === 0) {
      where.inactive = false;
    } else if (requestFilter.inactivefilter === 1) {
      where.inactive = true;
    }
  }

  if (requestFilter.hasOwnProperty("API_KEY") && requestFilter.API_KEY) {
    where.API_KEY = requestFilter.API_KEY;
  }

  if (requestFilter.hasOwnProperty("familyId") && requestFilter.familyId) {
    where.familyId = requestFilter.familyId;
  }

  let include = {
    model: dbModels.Families,
    as: "family",
  };

  filter.include = include;
  filter.where = where;
  return filter;
};

module.exports = {
  pepareFilters,
};

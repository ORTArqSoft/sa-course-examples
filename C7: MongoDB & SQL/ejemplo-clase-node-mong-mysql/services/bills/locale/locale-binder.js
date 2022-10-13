/* get config */
const config = require("config");
const locale = config.get("locale");
const messageBinder = () => {
  let messageConfig;
  if (locale.language == "ES") {
    messageConfig = require("./es");
  } else if (locale.language == "EN") {
    messageConfig = require("./es");
  } else {
    messageConfig = require("./es");
  }
  return messageConfig.crudMessages;
};

module.exports = {
  messageBinder,
};

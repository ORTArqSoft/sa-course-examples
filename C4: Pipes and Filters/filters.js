// filtros
function upperCase(string) {
  return string.toUpperCase();
}
function revert(string) {
  return string.split("").reverse().join("");
}

module.exports = { upperCase, revert };

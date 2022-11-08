function divide(a, b) {
  if (b == 0) {
    throw new Error("Cannot divide by zero!");
  }
  return a / b;
}
function init() {
  try {
    console.log(divide(10, 2));
    console.log(divide(10, 0));
  } catch (e) {
    console.log('Message: ', e.message);
    console.log('Stack:', e.stack)
  }
}
init();

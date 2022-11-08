(function first() {
  (function second() {
    (function third() {
      throw new Error("See stacktrace!");
    })();
  })();
})();


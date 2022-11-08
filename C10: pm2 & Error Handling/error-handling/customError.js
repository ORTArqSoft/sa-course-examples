class CustomError extends Error {
  constructor(args) {
    super(args);
    this.name = "[ARQ ERROR] ";
    this.date = new Date();
  }
}
throw new CustomError("This error will be thrown");

export class NestedError extends Error {
  public constructor(message?: string, public cause?: any) {
    super(message);
    this.name = new.target.name;

    // stack is a non-standard property though supported in most cases.
    if (this.stack && this.cause) {
      if (this.cause.stack) {
        this.stack = this.stack + "\nCaused by: " + cause.stack;
      } else {
        this.stack = this.stack + "\nCaused by: " + cause;
      }
    }
  }
}

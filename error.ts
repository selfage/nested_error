export class NestedError extends Error {
  public constructor(name: string, message?: string, public cause?: any) {
    super(message);
    this.name = name;

    // stack is a non-standard property that its implementation is not in
    // specification.
    if (this.stack && this.cause) {
      if (this.cause.stack) {
        this.stack = this.stack + "\nCaused by: " + cause.stack;
      } else {
        this.stack = this.stack + "\nCaused by: " + cause;
      }
    }
  }
}

export class StdError extends NestedError {
  public constructor(message?: string, public cause?: any) {
    super("StdError", message, cause);
  }
}

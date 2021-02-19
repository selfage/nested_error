import { CustomError } from "ts-custom-error";

export class NestedError extends CustomError {
  public constructor(message?: string, public cause?: any) {
    super(message);

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

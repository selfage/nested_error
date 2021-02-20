import { NestedError } from "./error";
import { assertThat, eqError } from "@selfage/test_matcher";
import { TEST_RUNNER } from "@selfage/test_runner";

TEST_RUNNER.run({
  name: "ErrorTest",
  cases: [
    {
      name: "StandaloneError",
      execute: () => {
        // Execute
        let e = new NestedError("standalone error");

        // Verify
        assertThat(e, eqError(new NestedError("standalone")), `e`);
      },
    },
    {
      name: "NestedError",
      execute: () => {
        // Execute
        let e = new NestedError("more context", new Error("inside"));

        // Verify
        assertThat(e, eqError(new NestedError("more context")), `e`);
      },
    },
    {
      name: "ThreeLayer",
      execute: () => {
        // Execute
        let e = new NestedError(
          "Even more",
          new NestedError("more context", new Error("inside"))
        );

        // Verify
        assertThat(e, eqError(new NestedError("Even more")), `e`);
      },
    },
    {
      name: "Subclass",
      execute: () => {
        // Execute
        class AError extends NestedError {
          public constructor(message?: string, cause?: any) {
            super(message, cause);
          }
        }
        let e = new AError("more context", new Error("inside"));
        console.log(e.stack);

        // Verify
        assertThat(e, eqError(new AError("more context")), `e`);
      },
    },
  ],
});

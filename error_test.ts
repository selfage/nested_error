import { StdError } from "./error";
import { assert, assertThat, eqError } from "@selfage/test_matcher";
import { TEST_RUNNER } from "@selfage/test_runner";

TEST_RUNNER.run({
  name: "ErrorTest",
  cases: [
    {
      name: "StdError",
      execute: () => {
        // Execute
        let e = new StdError("standalone error");

        // Verify
        assertThat(e, eqError(new StdError("standalone")), `e`);
        assert(e instanceof Error, "of Error type", "not");
      },
    },
    {
      name: "StdError",
      execute: () => {
        // Execute
        let e = new StdError("more context", new Error("inside"));

        // Verify
        assertThat(e, eqError(new StdError("more context")), `e`);
      },
    },
    {
      name: "ThreeLayer",
      execute: () => {
        // Execute
        let e = new StdError(
          "Even more",
          new StdError("more context", new Error("inside"))
        );

        // Verify
        assertThat(e, eqError(new StdError("Even more")), `e`);
      },
    }
  ],
});

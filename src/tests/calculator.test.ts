import { add } from "./../calculator";

describe("String Calculator", () => {
  it("returns 0 for an empty string", () => {
    expect(add("")).toBe(0);
  });

  // Add next test here: it("returns 1 for input '1'", ...)
});

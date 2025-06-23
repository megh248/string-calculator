import { add } from "../calculator";

it("returns 0 for an empty string", () => {
  expect(add("")).toBe(0);
});

it("returns the number for a single number", () => {
  expect(add("1")).toBe(1);
});

it("returns the sum of two numbers", () => {
    expect(add("1, 5")).toBe(6);
  });
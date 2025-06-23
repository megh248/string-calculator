import exp from "node:constants";
import { add } from "../calculator";

it("Returns 0 for an empty string", () => {
    expect(add("")).toBe(0);
});

it("Returns the number for a single number", () => {
    expect(add("1")).toBe(1);
});

it("Returns the sum of two numbers", () => {
    expect(add("1, 5")).toBe(6);
});

it("Handles new lines between numbers", () => {
    expect(add("1\n5")).toBe(6);
});

it("Handles custom delimiters", () => {
    expect(add("//;\n1;5")).toBe(6);
});

it("Throws on negative numbers with message", () => {
    expect(() => add("-1,2")).toThrow("negative numbers not allowed -1");
    expect(() => add("2,-4,3,-5")).toThrow("negative numbers not allowed -4,-5");
});

it("Throws error if numbers are greater than 1000", () => {
    expect(() => add("2,1001")).toThrow("numbers cannot be greater than 1000");
    expect(() => add("1001,2")).toThrow("numbers cannot be greater than 1000");
})
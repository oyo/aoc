import { getCubicArr as e } from "./Interpolator.js";
it("calculates cubic interpolation", () => {
  expect(e([0, 1, 2, 3], 0)).toBe(1), expect(e([0, 1, 2, 3], 0.5)).toBe(1.5), expect(e([0, 1, 2, 3], 1)).toBe(2);
});

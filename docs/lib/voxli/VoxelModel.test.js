import { VoxelModel as t } from "./VoxelModel.js";
it("adds vertices and colors", () => {
  {
    const e = new t().cubeAt(0, 0, 0, { r: 0, g: 0, b: 0 });
    expect(e.v.length).toBe(108), expect(e.c.length).toBe(108);
  }
  {
    const e = new t().starAt(0, 0, 0, { r: 0, g: 0, b: 0 });
    expect(e.v.length).toBe(72), expect(e.c.length).toBe(72);
  }
});

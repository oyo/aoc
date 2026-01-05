var p = Object.defineProperty;
var f = (o, s, t) => s in o ? p(o, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[s] = t;
var n = (o, s, t) => f(o, typeof s != "symbol" ? s + "" : s, t);
import { Shape as m, COLOR as u } from "./Types.js";
import { VoxelModel as z } from "./VoxelModel.js";
class E extends z {
  constructor() {
    super(...arguments);
    n(this, "data", [[[0]]]);
    n(this, "style", {});
    n(this, "dimension", { x: 0, y: 0, z: 0 });
  }
  setStyle(t) {
    return this.style = t, this.updateModel();
  }
  setData(t) {
    return this.data = t, this.updateModel();
  }
  updateModel() {
    var h;
    if (this.clear(), !this.data) return this;
    const t = this.data, e = this.dimension;
    e.z = t.length;
    const r = e.z / 2;
    e.y = t[0].length;
    const c = e.y / 2;
    e.x = t[0][0].length;
    const x = e.x / 2;
    for (let i = 0; i < e.z; i++)
      for (let d = 0; d < e.y; d++)
        for (let a = 0; a < e.x; a++) {
          const l = t[i][d][a];
          if (l) {
            const y = ((h = this.style) == null ? void 0 : h[l]) ?? {
              color: u.DEFAULT_VOXEL,
              shape: m.CUBE
            };
            this.shapeAt(a - x, d - c, i - r, y);
          }
        }
    return this.fireModelChanged(), this;
  }
}
export {
  E as VoxelScene
};

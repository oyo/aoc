var c = Object.defineProperty;
var h = (e, r, o) => r in e ? c(e, r, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[r] = o;
var s = (e, r, o) => h(e, typeof r != "symbol" ? r + "" : r, o);
import { COLOR as a } from "../Types.js";
class m {
  constructor() {
    s(this, "color", new Array(256));
    let r = 1 / 0, o = -1 / 0, i = !0;
    this.color[0] = 0;
    for (let t = 1; t < 256; t++) {
      i = Math.random() > 0.25 ? i : !i;
      const n = this.color[t - 1] + (i ? 0.1 : -0.1) * Math.random();
      n < r && (r = n), n > o && (o = n), this.color[t] = n;
    }
    const l = o - r + 0.2;
    for (let t = 0; t < 256; t++)
      this.color[t] = (this.color[(t + 128) % 256] - r) / l + 0.2;
  }
  getColorStyle(r) {
    return r ?? (r = a.DEFAULT_VOXEL), this.color.reduce((o, i, l) => (o[l] = { color: { r: r.r * i, g: r.g * i, b: r.b * i } }, o), {});
  }
  getColor(r) {
    return this.color[Math.floor(r * 255) % 256];
  }
}
export {
  m as Gradient
};

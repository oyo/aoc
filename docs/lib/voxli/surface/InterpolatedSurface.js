var A = Object.defineProperty;
var g = (y, t, a) => t in y ? A(y, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : y[t] = a;
var m = (y, t, a) => g(y, typeof t != "symbol" ? t + "" : t, a);
import { getTricubic as z } from "./Interpolator.js";
class b {
  constructor(t, a, r) {
    m(this, "data");
    m(this, "filter", []);
    m(this, "tolerance", 1e-3);
    m(this, "cubes", 0);
    let s, o, e, i;
    for (this.data = new Array(t), o = 0; o < t; o++)
      for (this.data[o] = new Array(t), e = 0; e < t; e++)
        for (this.data[o][e] = new Array(t), i = 0; i < t; i++) this.data[o][e][i] = 0;
    for (s = 0; s < r; s++) {
      const n = new Array(a);
      for (o = 0; o < a; o++)
        for (n[o] = new Array(a), e = 0; e < a; e++)
          for (n[o][e] = new Array(a), i = 0; i < a; i++) n[o][e][i] = Math.random();
      const c = this.interpolateTricubic(n, t);
      for (e = 0; e < t; e++)
        for (o = 0; o < t; o++)
          for (i = 0; i < t; i++) this.data[o][e][i] += c[o][e][i] / a;
      a = (a - 1 << 1) + 1;
    }
  }
  static createRandom(t) {
    let a = ~~(Math.random() * 2) + 2, r = ~~(Math.random() * 2) + 3;
    return a + r > 5 && (Math.random() > 0.5 ? a-- : r--), new b(t, r, a);
  }
  interpolateTricubic(t, a) {
    let r, s, o, e, i, n, c, f, h, l, u, d;
    const w = (t.length - 1) / a, p = new Array(a);
    for (e = 0; e < a; e++)
      for (l = e * w, c = ~~l, r = l - c, p[e] = new Array(a), i = 0; i < a; i++)
        for (u = i * w, f = ~~u, s = u - f, p[e][i] = new Array(a), n = 0; n < a; n++)
          d = n * w, h = ~~d, o = d - h, p[e][i][n] = z(t, c - 1, f - 1, h - 1, r, s, o);
    return p;
  }
  doNormalize8bit(t) {
    return t.map((a) => a.map((r) => r.map((s) => Math.floor(s * 255))));
  }
  doFilter(t, a = this.tolerance) {
    const r = Math.floor(this.data.length / 3), s = Math.floor(2 * this.data.length / 3) + 1;
    return t || (t = (this.data[r][r][r] + this.data[r][r][s] + this.data[r][s][r] + this.data[r][s][s] + this.data[s][r][r] + this.data[s][r][s] + this.data[s][s][r] + this.data[s][s][s]) / 8), this.doNormalize8bit(
      this.data.map(
        (o) => o.map((e) => e.map((i) => i > t - a && i < t + a ? 1 : 0))
      )
    );
  }
  doFilterCube() {
    const t = this.data.length;
    return this.doNormalize8bit(
      this.data.map(
        (a, r) => a.map(
          (s, o) => s.map(
            (e, i) => i === 0 || i === t - 1 || o === 0 || o === t - 1 || r === 0 || r === t - 1 ? e : 0
          )
        )
      )
    );
  }
  doFilterSphere() {
    let t, a, r, s, o, e, i, n, c, f;
    const h = this.data.length, l = h >> 1, u = l * l;
    this.cubes = 0;
    const d = new Array(h);
    for (t = 0; t < h; t++)
      for (s = t - l, i = s * s, d[t] = new Array(h), a = 0; a < h; a++)
        for (o = a - l, n = o * o, d[t][a] = new Array(h), r = 0; r < h; r++)
          e = r - l, c = e * e, f = i + n + c, (d[t][a][r] = f < u && f > u - h ? this.data[t][a][r] : 0) && this.cubes++;
    return this.doNormalize8bit(d);
  }
  getData() {
    return this.data;
  }
}
export {
  b as InterpolatedSurface
};

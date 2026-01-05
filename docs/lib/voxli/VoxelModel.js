var l = Object.defineProperty;
var g = (f, e, s) => e in f ? l(f, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : f[e] = s;
var n = (f, e, s) => g(f, typeof e != "symbol" ? e + "" : e, s);
import { Model as v } from "./Model.js";
import { Shape as a, COLOR as b } from "./Types.js";
class E extends v {
  constructor() {
    super();
    n(this, "shade", [
      [0.7, 0.3, 0.8],
      [0.5, 0.9, 0.4]
    ]);
    n(this, "ds", [
      [
        [0.45, 0.55],
        [0.85, 0.95]
      ],
      [
        [0.25, 0.35],
        [0.65, 0.75]
      ]
    ]);
    n(this, "shapeFnMap", {
      [a.EMPTY]: () => this,
      [a.CUBE]: this.cubeAt,
      [a.STAR]: this.starAt,
      [a.DIAMOND]: this.diamondAt
    });
  }
  /*
   * Six squares as cube sides
   */
  quadXM(s, t, i, h) {
    const r = t + 1, o = i + 1, u = this.shade[0][0], p = [u * h.r, u * h.g, u * h.b];
    this.v.push(s, t, i, s, t, o, s, r, o, s, t, i, s, r, o, s, r, i);
    for (let d = 0; d < 6; d++) this.c.push(...p);
  }
  quadXP(s, t, i, h) {
    const r = t + 1, o = i + 1, u = this.shade[1][0], p = [u * h.r, u * h.g, u * h.b];
    this.v.push(s, t, i, s, r, o, s, t, o, s, t, i, s, r, i, s, r, o);
    for (let d = 0; d < 6; d++) this.c.push(...p);
  }
  quadYM(s, t, i, h) {
    const r = s + 1, o = i + 1, u = this.shade[0][1], p = [u * h.r, u * h.g, u * h.b];
    this.v.push(s, t, i, r, t, i, r, t, o, s, t, i, r, t, o, s, t, o);
    for (let d = 0; d < 6; d++) this.c.push(...p);
  }
  quadYP(s, t, i, h) {
    const r = s + 1, o = i + 1, u = this.shade[1][1], p = [u * h.r, u * h.g, u * h.b];
    this.v.push(s, t, i, r, t, o, r, t, i, s, t, i, s, t, o, r, t, o);
    for (let d = 0; d < 6; d++) this.c.push(...p);
  }
  quadZP(s, t, i, h) {
    const r = s + 1, o = t + 1, u = this.shade[1][2], p = [u * h.r, u * h.g, u * h.b];
    this.v.push(s, t, i, s, o, i, r, o, i, s, t, i, r, o, i, r, t, i);
    for (let d = 0; d < 6; d++) this.c.push(...p);
  }
  quadZM(s, t, i, h) {
    const r = s + 1, o = t + 1, u = this.shade[0][2], p = [u * h.r, u * h.g, u * h.b];
    this.v.push(s, t, i, r, o, i, s, o, i, s, t, i, r, t, i, r, o, i);
    for (let d = 0; d < 6; d++) this.c.push(...p);
  }
  /*
   * Eight triangles through cube corners
   */
  // N = -1,+1,+1
  striA(s, t, i, h) {
    const r = this.ds[1][1][1], o = [r * h.r, r * h.g, r * h.b];
    this.v.push(s, t, i, s, t + 1, i + 1, s + 1, t + 1, i);
    for (let u = 0; u < 3; u++) this.c.push(...o);
  }
  // N = +1,-1,+1
  striB(s, t, i, h) {
    const r = this.ds[1][0][0], o = [r * h.r, r * h.g, r * h.b];
    this.v.push(s, t, i, s + 1, t + 1, i, s + 1, t, i + 1);
    for (let u = 0; u < 3; u++) this.c.push(...o);
  }
  // N = -1,-1,-1
  striC(s, t, i, h) {
    const r = this.ds[0][0][1], o = [r * h.r, r * h.g, r * h.b];
    this.v.push(s, t, i, s + 1, t, i + 1, s, t + 1, i + 1);
    for (let u = 0; u < 3; u++) this.c.push(...o);
  }
  // N = +1,+1,-1
  striD(s, t, i, h) {
    const r = this.ds[0][1][0], o = [r * h.r, r * h.g, r * h.b];
    this.v.push(s, t + 1, i + 1, s + 1, t, i + 1, s + 1, t + 1, i);
    for (let u = 0; u < 3; u++) this.c.push(...o);
  }
  // N = -1,-1,+1
  striE(s, t, i, h) {
    const r = this.ds[1][0][1], o = [r * h.r, r * h.g, r * h.b];
    this.v.push(s, t, i + 1, s, t + 1, i, s + 1, t, i);
    for (let u = 0; u < 3; u++) this.c.push(...o);
  }
  // N = -1,+1,-1
  striF(s, t, i, h) {
    const r = this.ds[0][1][1], o = [r * h.r, r * h.g, r * h.b];
    this.v.push(s, t, i + 1, s + 1, t + 1, i + 1, s, t + 1, i);
    for (let u = 0; u < 3; u++) this.c.push(...o);
  }
  // N = +1,-1,-1
  striG(s, t, i, h) {
    const r = this.ds[0][0][0], o = [r * h.r, r * h.g, r * h.b];
    this.v.push(s, t, i + 1, s + 1, t, i, s + 1, t + 1, i + 1);
    for (let u = 0; u < 3; u++) this.c.push(...o);
  }
  // N = +1,+1,+1
  striH(s, t, i, h) {
    const r = this.ds[1][1][0], o = [r * h.r, r * h.g, r * h.b];
    this.v.push(s, t + 1, i, s + 1, t + 1, i + 1, s + 1, t, i);
    for (let u = 0; u < 3; u++) this.c.push(...o);
  }
  /*
   * Eight triangles through cube corners
   */
  // N = -1,+1,+1
  dtriA(s, t, i, h) {
    const r = this.ds[1][1][0], o = [r * h.r, r * h.g, r * h.b];
    this.v.push(s, t + 0.5, i, s + 0.5, t + 1, i + 0.5, s + 1, t + 0.5, i);
    for (let u = 0; u < 3; u++) this.c.push(...o);
  }
  // N = +1,-1,+1
  dtriB(s, t, i, h) {
    const r = this.ds[1][1][1], o = [r * h.r, r * h.g, r * h.b];
    this.v.push(
      s + 1,
      t + 0.5,
      i,
      s + 0.5,
      t + 1,
      i + 0.5,
      s + 1,
      t + 0.5,
      i + 1
    );
    for (let u = 0; u < 3; u++) this.c.push(...o);
  }
  // N = -1,-1,-1
  dtriC(s, t, i, h) {
    const r = this.ds[0][1][1], o = [r * h.r, r * h.g, r * h.b];
    this.v.push(
      s + 1,
      t + 0.5,
      i + 1,
      s + 0.5,
      t + 1,
      i + 0.5,
      s,
      t + 0.5,
      i + 1
    );
    for (let u = 0; u < 3; u++) this.c.push(...o);
  }
  // N = +1,+1,-1
  dtriD(s, t, i, h) {
    const r = this.ds[0][1][0], o = [r * h.r, r * h.g, r * h.b];
    this.v.push(s, t + 0.5, i + 1, s + 0.5, t + 1, i + 0.5, s, t + 0.5, i);
    for (let u = 0; u < 3; u++) this.c.push(...o);
  }
  // N = -1,-1,+1
  dtriE(s, t, i, h) {
    const r = this.ds[1][0][0], o = [r * h.r, r * h.g, r * h.b];
    this.v.push(s + 0.5, t, i + 0.5, s, t + 0.5, i, s + 1, t + 0.5, i);
    for (let u = 0; u < 3; u++) this.c.push(...o);
  }
  // N = -1,+1,-1
  dtriF(s, t, i, h) {
    const r = this.ds[1][0][1], o = [r * h.r, r * h.g, r * h.b];
    this.v.push(s + 0.5, t, i + 0.5, s + 1, t + 0.5, i, s + 1, t + 0.5, i + 1);
    for (let u = 0; u < 3; u++) this.c.push(...o);
  }
  // N = +1,-1,-1
  dtriG(s, t, i, h) {
    const r = this.ds[0][0][1], o = [r * h.r, r * h.g, r * h.b];
    this.v.push(s + 0.5, t, i + 0.5, s + 1, t + 0.5, i + 1, s, t + 0.5, i + 1);
    for (let u = 0; u < 3; u++) this.c.push(...o);
  }
  // N = +1,+1,+1
  dtriH(s, t, i, h) {
    const r = this.ds[0][0][0], o = [r * h.r, r * h.g, r * h.b];
    this.v.push(s + 0.5, t, i + 0.5, s, t + 0.5, i + 1, s, t + 0.5, i);
    for (let u = 0; u < 3; u++) this.c.push(...o);
  }
  /*
   * Geometric shapes
   */
  cubeAt(s, t, i, h) {
    return this.quadXP(s + 1, t, i, h), this.quadYP(s, t + 1, i, h), this.quadZM(s, t, i + 1, h), this.quadXM(s, t, i, h), this.quadYM(s, t, i, h), this.quadZP(s, t, i, h), this;
  }
  starAt(s, t, i, h) {
    return this.striA(s, t, i, h), this.striB(s, t, i, h), this.striC(s, t, i, h), this.striD(s, t, i, h), this.striE(s, t, i, h), this.striF(s, t, i, h), this.striG(s, t, i, h), this.striH(s, t, i, h), this;
  }
  diamondAt(s, t, i, h) {
    return this.dtriA(s, t, i, h), this.dtriB(s, t, i, h), this.dtriC(s, t, i, h), this.dtriD(s, t, i, h), this.dtriE(s, t, i, h), this.dtriF(s, t, i, h), this.dtriG(s, t, i, h), this.dtriH(s, t, i, h), this;
  }
  shapeAt(s, t, i, h) {
    return h.shape ? this.shapeFnMap[h.shape].bind(this)(s, t, i, h.color ?? b.DEFAULT_VOXEL) : this.cubeAt(s, t, i, h.color ?? b.DEFAULT_VOXEL);
  }
}
export {
  E as VoxelModel
};

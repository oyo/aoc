var a = Object.defineProperty;
var c = (l, t, e) => t in l ? a(l, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : l[t] = e;
var u = (l, t, e) => c(l, typeof t != "symbol" ? t + "" : t, e);
class f {
  constructor(t) {
    u(this, "board", []);
    u(this, "dim", { x: 0, y: 0, z: 0 });
    u(this, "input");
    u(this, "DIM", 33);
    this.input = t ?? [".#.", "..#", "###"], this.init();
  }
  init() {
    const t = this.input, e = this.populate(this.DIM - 2, t);
    return this.dim = {
      z: e.length - 2,
      y: e[0].length - 2,
      x: e[0][0].length - 2
    }, this.board = [this.clone(e), this.clone(e)], this;
  }
  prepEmpty(t) {
    return new Array(t + 2).fill(!0).map(
      () => new Array(t + 2).fill(!0).map(() => new Array(t + 2).fill(0))
    );
  }
  populate(t, e) {
    const r = this.prepEmpty(t), n = (t >> 1) + 1, h = n - (e.length >> 1);
    for (let s = 0; s < e.length; s++)
      for (let i = 0; i < e.length; i++)
        r[n][h + s][h + i] = e[s][i] === "#" ? 1 : 0;
    return r;
  }
  clone(t) {
    return t.slice().map((e) => e.slice().map((r) => r.slice()));
  }
  adjacentCount(t, e, r, n) {
    return t[e - 1][r - 1][n - 1] + t[e - 1][r - 1][n] + t[e - 1][r - 1][n + 1] + t[e - 1][r][n - 1] + t[e - 1][r][n] + t[e - 1][r][n + 1] + t[e - 1][r + 1][n - 1] + t[e - 1][r + 1][n] + t[e - 1][r + 1][n + 1] + t[e][r - 1][n - 1] + t[e][r - 1][n] + t[e][r - 1][n + 1] + t[e][r][n - 1] + t[e][r][n + 1] + t[e][r + 1][n - 1] + t[e][r + 1][n] + t[e][r + 1][n + 1] + t[e + 1][r - 1][n - 1] + t[e + 1][r - 1][n] + t[e + 1][r - 1][n + 1] + t[e + 1][r][n - 1] + t[e + 1][r][n] + t[e + 1][r][n + 1] + t[e + 1][r + 1][n - 1] + t[e + 1][r + 1][n] + t[e + 1][r + 1][n + 1];
  }
  evalstep(t, e, r) {
    t.push(t.shift());
    const n = t[0], h = t[1];
    for (let s = 1; s < this.dim.z - 1; s++)
      for (let i = 1; i < this.dim.y - 1; i++)
        for (let o = 1; o < this.dim.x - 1; o++)
          n[s][i][o] = r(h[s][i][o], e(h, s, i, o));
    return this;
  }
  renderstep(t, e) {
    return this.evalstep(this.board, t, e), this;
  }
  step() {
    return this.renderstep(
      this.adjacentCount,
      (t, e) => t === 1 && (e < 2 || e > 3) ? 0 : e === 3 ? 1 : t
    );
  }
  count(t) {
    return t.reduce(
      (e, r) => e + r.reduce((n, h) => n + h.filter((s) => s === 1).length, 0),
      0
    );
  }
  getData() {
    return this.board[0];
  }
}
export {
  f as ConwayCubes
};

var r = Object.defineProperty;
var a = (h, t, i) => t in h ? r(h, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : h[t] = i;
var s = (h, t, i) => a(h, typeof t != "symbol" ? t + "" : t, i);
class o {
  constructor() {
    s(this, "listener", []);
    s(this, "v", []);
    s(this, "c", []);
    this.updateModel();
  }
  clear() {
    return this.v = [], this.c = [], this.fireModelChanged(), this;
  }
  getBoundingBox() {
    const t = this.v, i = { x: 1 / 0, y: 1 / 0, z: 1 / 0 }, n = { x: -1 / 0, y: -1 / 0, z: -1 / 0 };
    for (let e = 0; e < t.length; e += 3)
      i.x = Math.min(i.x, t[e]), i.y = Math.min(i.y, t[e + 1]), i.z = Math.min(i.z, t[e + 2]), n.x = Math.max(n.x, t[e]), n.y = Math.max(n.y, t[e + 1]), n.z = Math.max(n.z, t[e + 2]);
    return { min: i, max: n };
  }
  updateModel() {
    return this.fireModelChanged(), this;
  }
  addListener(t) {
    return this.listener.includes(t) || this.listener.push(t), t.modelChanged(this), this;
  }
  fireModelChanged() {
    this.listener.forEach((t) => t.modelChanged(this));
  }
}
export {
  o as Model
};

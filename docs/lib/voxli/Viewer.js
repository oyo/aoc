var n = Object.defineProperty;
var p = (s, t, o) => t in s ? n(s, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : s[t] = o;
var i = (s, t, o) => p(s, typeof t != "symbol" ? t + "" : t, o);
import { VoxelScene as d } from "./VoxelScene.js";
import { Simple3D as r } from "./Simple3D.js";
import { UserInput as a } from "./UserInput.js";
class l {
  constructor(t, o) {
    i(this, "input");
    i(this, "output");
    i(this, "model");
    const e = o ?? document.body;
    this.input = new a().bindTo(e).addListener(this), this.output = new r(e).setCamera({ fov: 60 }), this.model = Array.isArray(t) ? new d().addListener(this).setData(t) : t.addListener(this).updateModel(), this.focus();
  }
  focus() {
    var e;
    (e = this.output) == null || e.parent.focus();
    const t = this.model.dimension, o = Math.max(t.x, t.y, t.z);
    this.output.updateCameraPos({ z: -o * 1.5 });
  }
  keysChanged(t) {
    var u;
    if (t === 0) return;
    const o = 0.01 * (2 - this.output.cam.pos.z), e = { x: 0, y: 0, z: 0 };
    t & 1 && (e.x += -o), t & 2 && (e.y += o), t & 4 && (e.x += o), t & 8 && (e.y += -o), (u = this.output) == null || u.updateCameraPos(e);
  }
  mouseChanged(t) {
    var o;
    (o = this.output) == null || o.updateCameraRot({ x: t.v / 360, y: t.u / 360 });
  }
  zoomChanged(t) {
    var o;
    (o = this.output) == null || o.updateCameraPos({ z: -t * 0.2 });
  }
  modelChanged(t) {
    var o;
    (o = this.output) == null || o.setModel(t);
  }
}
export {
  l as Viewer
};

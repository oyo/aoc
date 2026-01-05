var l = Object.defineProperty;
var c = (h, t, i) => t in h ? l(h, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : h[t] = i;
var r = (h, t, i) => c(h, typeof t != "symbol" ? t + "" : t, i);
import { COLOR as g } from "./Types.js";
import { Model as d } from "./Model.js";
class v {
  constructor(t) {
    r(this, "parent");
    r(this, "cam", { fov: 60, pos: { x: 0, y: 0, z: 0 }, rot: { x: 0, y: 0 } });
    r(this, "background", g.DEFAULT_BACKGROUND);
    r(this, "rMatrix", new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
    r(this, "pMatrix", new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -1, 0, 0, 0, 1]));
    r(this, "uniRM", null);
    r(this, "canvas");
    r(this, "gl");
    r(this, "shader", null);
    r(this, "vertexPositionAttribute", 0);
    r(this, "vertexColorAttribute", 0);
    r(this, "model", new d());
    r(this, "resizeTimer", null);
    r(this, "numItems", 0);
    for (this.parent = t ?? document.body, this.canvas = document.createElement("canvas"); this.parent.firstChild; )
      this.parent.removeChild(this.parent.firstChild);
    this.parent.appendChild(this.canvas);
    try {
      this.gl = this.canvas.getContext("webgl") ?? new WebGLRenderingContext();
    } catch (i) {
      alert(`WebGL not initialized! ${i}`), this.gl = new WebGLRenderingContext();
      return;
    }
    this.setBackgroundColor(this.background), this.gl.clearDepth(1), this.gl.enable(this.gl.DEPTH_TEST), this.gl.enable(this.gl.CULL_FACE), this.gl.depthFunc(this.gl.LEQUAL), this.initShaders(), window.addEventListener("resize", this.requestResize.bind(this)), requestAnimationFrame(this.render.bind(this));
  }
  initShaders() {
    const t = this.gl.createProgram() ?? new WebGLProgram(), i = this.getShader(
      this.gl.VERTEX_SHADER,
      `attribute vec3 aPos;
attribute vec4 aCol;
uniform mat4 uMVMatrix,uPMatrix;
varying vec4 vColor;
void main(void) {
  gl_Position = uPMatrix * uMVMatrix * vec4(aPos, 1.0);
  vColor = aCol;
}`
    ), e = this.getShader(
      this.gl.FRAGMENT_SHADER,
      `varying lowp vec4 vColor;
void main(void) {
	gl_FragColor = vColor;
}`
    );
    this.gl.attachShader(t, i), this.gl.attachShader(t, e), this.gl.linkProgram(t), this.gl.getProgramParameter(t, this.gl.LINK_STATUS) || alert("Shaders not initialized!"), this.gl.useProgram(t), this.vertexPositionAttribute = this.gl.getAttribLocation(t, "aPos"), this.vertexColorAttribute = this.gl.getAttribLocation(t, "aCol"), this.uniRM = this.gl.getUniformLocation(t, "uMVMatrix"), this.shader = t, this.gl.enableVertexAttribArray(this.vertexPositionAttribute), this.gl.enableVertexAttribArray(this.vertexColorAttribute);
  }
  getShader(t, i) {
    const e = this.gl.createShader(t) ?? new WebGLShader();
    return this.gl.shaderSource(e, i), this.gl.compileShader(e), this.gl.getShaderParameter(e, this.gl.COMPILE_STATUS) || alert(`GLSL compile error:
` + this.gl.getShaderInfoLog(e)), e;
  }
  perspective(t, i, e, a) {
    const s = 1 / Math.tan(t * Math.PI / 360), o = 1 / (e - a), n = this.pMatrix;
    n[0] = s / i, n[5] = s, n[10] = (e + a) * o, n[14] = e * a * o * 2;
  }
  render() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    const t = Math.cos(this.cam.rot.x), i = Math.sin(this.cam.rot.x), e = Math.cos(this.cam.rot.y), a = Math.sin(this.cam.rot.y), s = this.rMatrix;
    s[0] = e, s[1] = i * a, s[2] = -t * a, s[5] = t, s[6] = i, s[8] = a, s[9] = -i * e, s[10] = t * e, s[12] = this.cam.pos.x, s[13] = this.cam.pos.y, s[14] = this.cam.pos.z, this.gl.uniformMatrix4fv(this.uniRM, !1, s), this.gl.drawArrays(this.gl.TRIANGLES, 0, this.numItems), requestAnimationFrame(this.render.bind(this));
  }
  requestResize() {
    this.resizeTimer && clearTimeout(this.resizeTimer), this.resizeTimer = setTimeout(this.resize.bind(this), 10);
  }
  resize() {
    const t = getComputedStyle(this.parent), i = parseFloat(t.paddingLeft) + parseFloat(t.paddingRight), e = parseFloat(t.paddingTop) + parseFloat(t.paddingBottom), a = parseFloat(t.borderLeftWidth) + parseFloat(t.borderRightWidth), s = parseFloat(t.borderTopWidth) + parseFloat(t.borderBottomWidth);
    this.canvas.width = this.parent.clientWidth - i - a, this.canvas.height = this.parent.clientHeight - e - s, this.perspective(
      this.cam.fov,
      this.canvas.width / this.canvas.height,
      -0.4,
      1e3
    ), this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height), this.shader && this.gl.uniformMatrix4fv(
      this.gl.getUniformLocation(this.shader, "uPMatrix"),
      !1,
      this.pMatrix
    );
  }
  setModel(t) {
    const i = (e, a, s) => {
      const o = this.gl.createBuffer();
      return this.gl.bindBuffer(this.gl.ARRAY_BUFFER, o), this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        new Float32Array(e),
        this.gl.STATIC_DRAW
      ), this.gl.vertexAttribPointer(s, a, this.gl.FLOAT, !1, 0, 0), o;
    };
    return this.model = t, i(t.c, 3, this.vertexColorAttribute), i(t.v, 3, this.vertexPositionAttribute), this.numItems = t.v.length / 3, this;
  }
  setBackgroundColor(t) {
    return this.background = t, this.gl.clearColor(t.r, t.g, t.b, t.a ?? 1), this;
  }
  setCamera(t) {
    return this.cam = { ...this.cam, ...t }, this.resize(), this;
  }
  setCameraPos(t) {
    return this.cam.pos = { ...this.cam.pos, ...t }, this;
  }
  setCameraRot(t) {
    return this.cam.rot = { ...this.cam.rot, ...t }, this;
  }
  updateCameraPos(t) {
    return this.cam.pos.x += t.x ?? 0, this.cam.pos.y += t.y ?? 0, this.cam.pos.z += t.z ?? 0, this.cam.pos.z > 0 && (this.cam.pos.z = 0), this;
  }
  updateCameraRot(t) {
    return this.cam.rot.y += t.y ?? 0, this.cam.rot.x += t.x ?? 0, this.cam.rot.x > Math.PI / 2 ? this.cam.rot.x = Math.PI / 2 : this.cam.rot.x < -Math.PI / 2 && (this.cam.rot.x = -Math.PI / 2), this;
  }
}
export {
  v as Simple3D
};

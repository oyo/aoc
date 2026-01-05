var u = Object.defineProperty;
var n = (i, e, s) => e in i ? u(i, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : i[e] = s;
var o = (i, e, s) => n(i, typeof e != "symbol" ? e + "" : e, s);
const m = [
  37,
  //left
  38,
  //up
  39,
  //right
  40
  //down
].concat(new Array(26).fill(0).map((i, e) => e + 65));
class a {
  constructor() {
    o(this, "mouse", {
      button: !1,
      x: 0,
      y: 0,
      u: 0,
      v: 0,
      w: 0,
      max: 70
    });
    o(this, "keyMap", this.generateKeyMap());
    o(this, "keyMask", 0);
    o(this, "listener", []);
    o(this, "keyTimer");
    o(this, "slowDownTimer");
  }
  bindTo(e) {
    const s = e ?? document.body;
    return s.addEventListener("mousedown", this.mouseDown.bind(this)), s.addEventListener("mouseup", this.mouseUp.bind(this)), s.addEventListener("mouseout", this.mouseUp.bind(this)), s.addEventListener("mousemove", this.mouseMove.bind(this)), s.addEventListener("keydown", this.keyDown.bind(this)), s.addEventListener("keyup", this.keyUp.bind(this)), s.addEventListener("wheel", this.mouseWheel.bind(this)), s.addEventListener("touchstart", this.touch2Mouse.bind(this), !0), s.addEventListener("touchmove", this.touch2Mouse.bind(this), !0), s.addEventListener("touchend", this.touch2Mouse.bind(this), !0), this;
  }
  generateKeyMap() {
    return m.reduce((e, s, t) => (e[s] = 1 << t, e), {});
  }
  touch2Mouse(e) {
    const s = e.changedTouches[0];
    let t;
    switch (e.type) {
      case "touchstart":
        t = "mousedown";
        break;
      case "touchend":
        t = "mouseup";
        break;
      case "touchmove":
        t = "mousemove";
        break;
      default:
        return;
    }
    const h = document.createEvent("MouseEvent");
    h.initMouseEvent(
      t,
      !0,
      !0,
      window,
      1,
      s.screenX << 1,
      s.screenY << 1,
      s.clientX << 1,
      s.clientY << 1,
      !1,
      !1,
      !1,
      !1,
      0,
      null
    ), s.target.dispatchEvent(h), e.preventDefault();
  }
  mouseWheel(e) {
    this.fireZoomChanged(e.deltaY), e.preventDefault();
  }
  mouseMove(e) {
    this.mouse.button && (this.mouse.u = e.clientX - this.mouse.x, this.mouse.v = e.clientY - this.mouse.y, this.mouse.max && (this.mouse.u > this.mouse.max ? this.mouse.u = this.mouse.max : this.mouse.u < -this.mouse.max && (this.mouse.u = -this.mouse.max), this.mouse.v > this.mouse.max ? this.mouse.v = this.mouse.max : this.mouse.v < -this.mouse.max && (this.mouse.v = -this.mouse.max)), this.move(), this.mouse.x = e.clientX, this.mouse.y = e.clientY, e.preventDefault());
  }
  slowDown() {
    this.mouse.u *= 0.98, this.mouse.v *= 0.9, this.mouse.w *= 0.9;
    let e = !0;
    (this.mouse.u > 1 || this.mouse.v > 1 || this.mouse.u < -1 || this.mouse.v < -1) && (this.move(), e = !1), (this.mouse.w > 1 || this.mouse.w) && (this.fireZoomChanged(this.mouse.w), e = !1), e && clearInterval(this.slowDownTimer);
  }
  move() {
    return this.fireMouseChanged(), this;
  }
  mouseDown(e) {
    this.mouse.button = !0, this.mouse.x = e.clientX, this.mouse.y = e.clientY, this.mouse.u = 0, this.mouse.v = 0, clearInterval(this.slowDownTimer), e.preventDefault();
  }
  mouseUp() {
    this.mouse.button = !1, this.slowDownTimer = setInterval(this.slowDown.bind(this), 20);
  }
  keyDown(e) {
    this.keyMask |= this.keyMap[e.keyCode], this.keyTimer || this.startKeyTimer();
  }
  keyUp(e) {
    this.keyMask = this.keyMask & ~this.keyMap[e.keyCode], this.keyMask === 0 && (clearInterval(this.keyTimer), this.keyTimer = void 0);
  }
  startKeyTimer() {
    this.keyTimer || (this.keyTimer = setInterval(this.fireKeysChanged.bind(this), 5));
  }
  setMove(e) {
    return this.mouse = {
      ...this.mouse,
      ...e
    }, this.mouseUp(), this.move();
  }
  addListener(e) {
    var s, t, h;
    return this.listener.includes(e) || this.listener.push(e), (s = e.keysChanged) == null || s.call(e, this.keyMask), (t = e.mouseChanged) == null || t.call(e, this.mouse), (h = e.zoomChanged) == null || h.call(e, this.mouse.w), this;
  }
  fireKeysChanged() {
    this.listener.forEach((e) => {
      var s;
      return (s = e.keysChanged) == null ? void 0 : s.call(e, this.keyMask);
    });
  }
  fireMouseChanged() {
    this.listener.forEach((e) => {
      var s;
      return (s = e.mouseChanged) == null ? void 0 : s.call(e, this.mouse);
    });
  }
  fireZoomChanged(e) {
    this.listener.forEach((s) => {
      var t;
      return (t = s.zoomChanged) == null ? void 0 : t.call(s, e);
    });
  }
}
export {
  m as KEYS,
  a as UserInput
};

const P = {

    prep: T => T.trim().split('\n').map(L => L.split('').map(n => Number.parseInt(n))),

    visible: (p, y, x) => {
        const v = p[y][x]
        let visible = true
        for (let iy = y - 1; iy >= 0 && visible; iy--)
            visible = p[iy][x] < v
        if (visible)
            return true
        visible = true
        for (let iy = y + 1; iy < p.length && visible; iy++)
            visible = p[iy][x] < v
        if (visible)
            return true
        visible = true
        for (let ix = x - 1; ix >= 0 && visible; ix--)
            visible = p[y][ix] < v
        if (visible)
            return true
        visible = true
        for (let ix = x + 1; ix < p.length && visible; ix++)
            visible = p[y][ix] < v
        if (visible)
            return true
    },

    score: (p, y, x) => {
        const v = p[y][x]
        const d = [1, 1, 1, 1]
        let visible = true
        let iy = y - 1
        for (; iy >= 0 && visible; iy--)
            visible = p[iy][x] < v
        d[0] = y - iy - 1
        visible = true
        iy = y + 1
        for (; iy < p.length && visible; iy++)
            visible = p[iy][x] < v
        d[1] = iy - y - 1
        visible = true
        let ix = x - 1
        for (; ix >= 0 && visible; ix--)
            visible = p[y][ix] < v
        d[2] = x - ix - 1
        visible = true
        ix = x + 1
        for (; ix < p.length && visible; ix++)
            visible = p[y][ix] < v
        d[3] = ix - x - 1
        return d.reduce((a, b) => a * b, 1)
    },

    part_1: T => {
        const p = P.prep(T)
        let s = 0
        for (let y = 0; y < p.length; y++)
            for (let x = 0; x < p[y].length; x++)
                s += P.visible(p, y, x) ? 1 : 0
        return s
    },

    part_2: p => {
        let s = 0
		P.best = [0, 0]
        for (let y = 0; y < p.length; y++)
            for (let x = 0; x < p[y].length; x++) {
                const vs = P.score(p, y, x)
                if (vs > s) {
                    s = vs
					P.best[0] = y
					P.best[1] = x
				}
            }
        return s
    },

	getData: () => ({ p: P.p, b: P.best }),

	step: () => {},

	init: T => {
		const p = P.p = P.prep(T)
		P.part_2(p)
		P.count = 0
		return P
	}

}

class QuadModel {

	col = { r: 1, g: 0.7, b: 0.5 }
	shade = { xm: .5, xp: .6, ym: .3, yp: .9, zm: .4, zp: .8 }

	constructor() {
		this.clear()
	}

	clear() {
		this.v = []
		this.c = []
	}

	quadXM(x, y, z, c) {
		c = c || this.col
		const y1 = y + 1, z1 = z + 1, f = this.shade.xm, s = [f * c.r, f * c.g, f * c.b]
		this.v.push(x, y, z, x, y, z1, x, y1, z1, x, y, z, x, y1, z1, x, y1, z)
		for (let i = 0; i < 6; i++)
			this.c.push(...s)
	}

	quadXP(x, y, z, c) {
		c = c || this.col
		const y1 = y + 1, z1 = z + 1, f = this.shade.xp, s = [f * c.r, f * c.g, f * c.b]
		this.v.push(x, y, z, x, y1, z1, x, y, z1, x, y, z, x, y1, z, x, y1, z1)
		for (let i = 0; i < 6; i++)
			this.c.push(...s)
	}

	quadYM(x, y, z, c) {
		c = c || this.col
		const x1 = x + 1, z1 = z + 1, f = this.shade.ym, s = [f * c.r, f * c.g, f * c.b]
		this.v.push(x, y, z, x1, y, z, x1, y, z1, x, y, z, x1, y, z1, x, y, z1)
		for (let i = 0; i < 6; i++)
			this.c.push(...s)
	}

	quadYP(x, y, z, c) {
		c = c || this.col
		const x1 = x + 1, z1 = z + 1, f = this.shade.yp, s = [f * c.r, f * c.g, f * c.b]
		this.v.push(x, y, z, x1, y, z1, x1, y, z, x, y, z, x, y, z1, x1, y, z1)
		for (let i = 0; i < 6; i++)
			this.c.push(...s)
	}

	quadZM(x, y, z, c) {
		c = c || this.col
		const x1 = x + 1, y1 = y + 1, f = this.shade.zm, s = [f * c.r, f * c.g, f * c.b]
		this.v.push(x, y, z, x, y1, z, x1, y1, z, x, y, z, x1, y1, z, x1, y, z)
		for (let i = 0; i < 6; i++)
			this.c.push(...s)
	}

	quadZP(x, y, z, c) {
		c = c || this.col
		const x1 = x + 1, y1 = y + 1, f = this.shade.zp, s = [f * c.r, f * c.g, f * c.b]
		this.v.push(x, y, z, x1, y1, z, x, y1, z, x, y, z, x1, y, z, x1, y1, z)
		for (let i = 0; i < 6; i++)
			this.c.push(...s)
	}

	cubeAt(x, y, z, c) {
		this.quadXP(x + 1, y, z, c)
		this.quadYP(x, y + 1, z, c)
		this.quadZP(x, y, z + 1, c)
		this.quadXM(x, y, z, c)
		this.quadYM(x, y, z, c)
		this.quadZM(x, y, z, c)
	}

}

class Scene extends QuadModel {

	listener = []

	constructor() {
		super()
	}

	setModel(model) {
		this.model = model
		this.create()
		this.fireSceneChanged()
		return this;
	}

	create() {
		this.clear()
		const data = this.model.getData()
		const p = data.p
		const b = data.b
		const c = { r: 0.2, g: 0.8, b: 0.2 }
		const cb = { r: 0.9, g: 0.9, b: 0.2 }
		const cw = { r: 0.8, g: 0.4, b: 0.2 }
		const dz = p.length, dz2 = dz >> 1
		const by = p[b[0]][b[1]]
		for (let z = 0; z < dz; z++) {
			for (let x = 0; x < p[z].length; x++) {
				const y = p[z][x]
				this.cubeAt(x - b[1], y-by, z - b[0], z === b[0] && x === b[1] ? cb : c)
				for (let iy=y-1; iy>=0; iy-- )
					this.cubeAt(x - b[1], iy-by, z - b[0], cw)
			}
		}
		this.fireSceneChanged()
	}

	addListener(l) {
		this.listener.push(l)
		return this
	}

	fireSceneChanged() {
		for (let l of this.listener)
			if (l.sceneChanged)
				l.sceneChanged(this)
	}

}

class AnimatedScene extends Scene {

	speed = 1000

	constructor() {
		super()
	}

	start() {
		this.stop()
		this.timer = setInterval(this.step.bind(this), this.speed)
		return this;
	}

	stop() {
		if (this.timer)
			clearInterval(this.timer)
		return this
	}

	step() {
		if (!this.model)
			return this
		this.model.step()
		this.create()
		this.fireSceneChanged()
		return this
	}

}


let gl
class Simple3D {

	cam = { fov: 50 }
	pos = { x: -0.5, y: -0.5, z: -8 }
	rot = { x: 0, y: 0/*, z: 0*/ }
	col = { r: 0.7, g: 0.85, b: 1, a: 1 } //{ r: 0.059, g: 0.059, b: 0.137, a: 1 }//{ r: 0, g: 0.1, b: 0.25, a: 1 } // { r: 0.9, g: 0.95, b: 1, a: 1 }
	rMatrix = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
	mode = true
	uniRM = false

	constructor() {
		this.canvas = document.createElement('canvas')
		try {
			gl = this.canvas.getContext('webgl')
		} catch (e) {
			alert('WebGL not initialized!')
		}
		gl.clearColor(this.col.r, this.col.g, this.col.b, this.col.a)
		gl.clearDepth(1)
		gl.enable(gl.DEPTH_TEST)
		gl.enable(gl.CULL_FACE)
		gl.depthFunc(gl.LEQUAL)
		document.body.appendChild(this.canvas)
		this.initShaders()
		this.resize()
		window.addEventListener('resize', this.requestResize.bind(this))
	}

	initShaders() {
		const sh = gl.createProgram()
		gl.attachShader(sh, this.getShader(gl, gl.VERTEX_SHADER,
			`attribute vec3 aPos;
attribute vec4 aCol;
uniform mat4 uMVMatrix,uPMatrix;
varying vec4 vColor;
void main(void) {
  gl_Position = uPMatrix * uMVMatrix * vec4(aPos, 1.0);
  vColor = aCol;
}`))
		gl.attachShader(sh, this.getShader(gl, gl.FRAGMENT_SHADER,
			`varying lowp vec4 vColor;
void main(void) {
	gl_FragColor = vColor;
}`))
		gl.linkProgram(sh)
		if (!gl.getProgramParameter(sh, gl.LINK_STATUS))
			alert('Shaders not initialized!')
		gl.useProgram(sh)
		this.vertexPositionAttribute = gl.getAttribLocation(sh, 'aPos')
		this.vertexColorAttribute = gl.getAttribLocation(sh, 'aCol')
		this.uniRM = gl.getUniformLocation(sh, 'uMVMatrix')
		this.shader = sh
		gl.enableVertexAttribArray(this.vertexPositionAttribute)
		gl.enableVertexAttribArray(this.vertexColorAttribute)
	}

	getShader(gl, type, source) {
		const s = gl.createShader(type)
		gl.shaderSource(s, source)
		gl.compileShader(s)
		if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
			alert('GLSL compile error:\n' + gl.getShaderInfoLog(s))
		return s
	}

	perspective(fov, aspect, near, far) {
		const f = 1.0 / Math.tan(fov * Math.PI / 360)
		const ri = 1 / (near - far)
		return [
			f / aspect, 0, 0, 0,
			0, f, 0, 0,
			0, 0, (near + far) * ri, -1,
			0, 0, near * far * ri * 2, 0
		]
	}

	render() {
		if (!this.scene)
			return
		const cx = Math.cos(this.rot.x),
			sx = Math.sin(this.rot.x),
			cy = Math.cos(this.rot.y),
			sy = Math.sin(this.rot.y),
			r = this.rMatrix
		r[0] = cy
		r[1] = sx * sy
		r[2] = -cx * sy
		r[5] = cx
		r[6] = sx
		r[8] = sy
		r[9] = -sx * cy
		r[10] = cx * cy
		r[12] = this.pos.x
		r[13] = this.pos.y
		r[14] = this.pos.z
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
		gl.uniformMatrix4fv(this.uniRM, false, r)
		gl.drawArrays(this.mode ? gl.TRIANGLES : gl.LINES, 0, this.numItems)
	}

	requestResize() {
		clearTimeout(this.resizeTimer)
		this.resizeTimer = setTimeout(this.resize.bind(this), 200)
	}

	resize() {
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight
		this.pMatrix = new Float32Array(this.perspective(this.cam.fov, this.canvas.width / this.canvas.height, 0.5, 1000))
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
		gl.uniformMatrix4fv(gl.getUniformLocation(this.shader, 'uPMatrix'), false, this.pMatrix)
		this.change = true
		this.render()
	}

	arrayToBuffer(arr, itemSize, ptr) {
		const buf = gl.createBuffer()
		gl.bindBuffer(gl.ARRAY_BUFFER, buf)
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arr), gl.STATIC_DRAW)
		buf.itemSize = itemSize
		buf.numItems = arr.length / buf.itemSize
		gl.vertexAttribPointer(ptr, buf.itemSize, gl.FLOAT, false, 0, 0)
		return buf
	}

	setScene(scene) {
		this.scene = scene
		this.arrayToBuffer(scene.c, 3, this.vertexColorAttribute)
		this.numItems = this.arrayToBuffer(scene.v, 3, this.vertexPositionAttribute).numItems
		this.render()
		return this
	}

	updatePos(c) {
		this.pos.x += c[0]
		this.pos.y += c[1]
		this.pos.z += c[2]
		if (this.pos.z > -2)
			this.pos.z = -2
		this.render()
		return this
	}

	updateRot(r) {
		this.rot.y += r[0] / 360
		this.rot.x += r[1] / 360
		if (this.rot.x > Math.PI / 2)
			this.rot.x = Math.PI / 2
		else if (this.rot.x < -Math.PI / 2)
			this.rot.x = -Math.PI / 2
		this.render()
		return this
	}

}

class UserInput {

	mouse = { button: false, x: 0, y: 0, u: -38, v: 12, w: 12, max: 70 }
	keyMask = 0
	listener = []

	constructor() {
		document.addEventListener('mousedown', this.mouseDown.bind(this))
		document.addEventListener('mouseup', this.mouseUp.bind(this))
		document.addEventListener('mouseout', this.mouseUp.bind(this))
		document.addEventListener('mousemove', this.mouseMove.bind(this))
		document.addEventListener('keydown', this.keyDown.bind(this))
		document.addEventListener('keyup', this.keyUp.bind(this))
		document.addEventListener('DOMMouseScroll', this.mouseWheel.bind(this))
		document.addEventListener('mousewheel', this.mouseWheel.bind(this))
		document.addEventListener('touchstart', this.touch2Mouse.bind(this), true);
		document.addEventListener('touchmove', this.touch2Mouse.bind(this), true);
		document.addEventListener('touchend', this.touch2Mouse.bind(this), true);
		this.mouseUp()
	}

	touch2Mouse(evt) {
		const touch = evt.changedTouches[0]
		let mouseEv
		switch (evt.type) {
			case 'touchstart': mouseEv = 'mousedown'; break
			case 'touchend': mouseEv = 'mouseup'; break
			case 'touchmove': mouseEv = 'mousemove'; break
			default: return
		}
		var mouseEvent = document.createEvent('MouseEvent')
		mouseEvent.initMouseEvent(mouseEv, true, true, window, 1, touch.screenX<<1, touch.screenY<<1, touch.clientX<<1, touch.clientY<<1, false, false, false, false, 0, null)
		touch.target.dispatchEvent(mouseEvent)
		evt.preventDefault()
	}

	mouseWheel(evt) {
		this.fireZoomChanged(evt.deltaY)
	}

	mouseMove(evt) {
		if (!this.mouse.button)
			return
		this.mouse.u = evt.clientX - this.mouse.x
		this.mouse.v = evt.clientY - this.mouse.y
		if (this.mouse.u > this.mouse.max)
			this.mouse.u = this.mouse.max
		else if (this.mouse.u < -this.mouse.max)
			this.mouse.u = -this.mouse.max
		if (this.mouse.v > this.mouse.max)
			this.mouse.v = this.mouse.max
		else if (this.mouse.v < -this.mouse.max)
			this.mouse.v = -this.mouse.max
		this.move()
		this.mouse.x = evt.clientX
		this.mouse.y = evt.clientY
	}

	slowDown() {
		this.mouse.u *= 0.98
		this.mouse.v *= 0.9
		this.mouse.w *= 0.9
		let stop = true
		if (this.mouse.u > 1 || this.mouse.v > 1 || this.mouse.u < -1 || this.mouse.v < -1) {
			this.move()
			stop = false
		}
		if (this.mouse.w > 1 || this.mouse.w) {
			this.fireZoomChanged(this.mouse.w)
			stop = false
		}
		if (stop)
			clearInterval(this.slowDownTimer)
	}

	move() {
		this.fireMouseChanged(this.mouse)
	}

	mouseDown(evt) {
		this.mouse.button = true
		this.mouse.x = evt.clientX
		this.mouse.y = evt.clientY
		this.mouse.u = 0
		this.mouse.v = 0
		clearInterval(this.slowDownTimer)
	}

	mouseUp(evt) {
		this.mouse.button = false
		this.slowDownTimer = setInterval(this.slowDown.bind(this), 20)
	}

	keyDown(evt) {
		//console.log(evt.keyCode)
		switch (evt.keyCode) {
			case 78: this.createData(); this.createScene(); break
			case 84: this.color = !this.color; this.createScene(); break
			case 86: this.color = this.volume = !this.volume; this.createScene(); break
			case 87: this.mode = !this.mode; break
			case 37: this.startKeyTimer(1); break
			case 40: this.startKeyTimer(2); break
			case 39: this.startKeyTimer(4); break
			case 38: this.startKeyTimer(8); break
			case 187: this.startKeyTimer(16); break
			case 189: this.startKeyTimer(32); break
		}
		this.change = true
	}

	keyUp(evt) {
		switch (evt.keyCode) {
			case 37: this.keyMask &= ~1; break //left
			case 40: this.keyMask &= ~2; break //down
			case 39: this.keyMask &= ~4; break //right
			case 38: this.keyMask &= ~8; break //up
			case 187: this.keyMask &= ~16; break //+
			case 189: this.keyMask &= ~32; break //-
		}
	}

	startKeyTimer(mask) {
		this.keyMask |= mask
		if (this.keyTimer)
			return
		this.keyTimer = setInterval(this.processKeys.bind(this), 20)
	}

	processKeys() {
		if (this.keyMask === 0) {
			clearInterval(this.keyTimer)
			this.keyTimer = null
		}
		this.fireKeysChanged(this.keyMask)
	}

	addListener(l) {
		this.listener.push(l)
		return this
	}

	fireKeysChanged() {
		for (let l of this.listener)
			if (l.keysChanged)
				l.keysChanged(this.keyMask)
	}

	fireMouseChanged() {
		for (let l of this.listener)
			if (l.mouseChanged)
				l.mouseChanged(this.mouse)
	}

	fireZoomChanged(y) {
		for (let l of this.listener)
			if (l.mouseChanged)
				l.zoomChanged(y)
	}

}


class Game {

	constructor(model) {
		this.input = new UserInput().addListener(this)
		this.output = new Simple3D()
		this.scene = new AnimatedScene().addListener(this).setModel(model).start()
	}

	keysChanged(keyMask) {
		const speed = 0.5
		const camEvent = [0, 0, 0]
		if (keyMask & 1) camEvent[0] = -speed
		if (keyMask & 2) camEvent[1] = -speed
		if (keyMask & 4) camEvent[0] = speed
		if (keyMask & 8) camEvent[1] = speed
		if (keyMask & 16) camEvent[2] = speed
		if (keyMask & 32) camEvent[2] = -speed
		this.output.updatePos(camEvent)
	}

	mouseChanged(vector) {
		this.output.updateRot([vector.u, vector.v])
	}

	zoomChanged(y) {
		this.output.updatePos([0, 0, -y * 0.2])
	}

	sceneChanged(scene) {
		this.output.setScene(scene)
	}

}

fetch('input')
	.then(response => response.text())
	.then(data => new Game(P.init(data)))

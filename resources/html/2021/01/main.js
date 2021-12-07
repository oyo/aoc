const P = {

	prep: T => T.trim().split('\n').map(L => L.trim()),

	prepEmpty: d => new Array(d + 2).fill(true).map(z => new Array(d + 2).fill(true).map(y => new Array(d + 2).fill('.'))),

	populate: (dim, p) => {
		const board = P.prepEmpty(dim)
		const z0 = (dim >> 1) + 1
		const o = z0 - (p.length >> 1)
		for (let y = 0; y < p.length; y++) {
			for (let x = 0; x < p.length; x++) {
				board[z0][o + y][o + x] = p[y][x]
			}
		}
		return board
	},

	clone: board => board.slice().map(y => y.slice().map(x => x.slice())),

	count: z => z.reduce((a, y) => a + y.reduce((b, x) => b + x.filter(c => c === '#').length, 0), 0),

	adjacentCount: (p, z, y, x) =>
		(p[z - 1][y - 1][x - 1] === '#' ? 1 : 0) +
		(p[z - 1][y - 1][x] === '#' ? 1 : 0) +
		(p[z - 1][y - 1][x + 1] === '#' ? 1 : 0) +
		(p[z - 1][y][x - 1] === '#' ? 1 : 0) +
		(p[z - 1][y][x] === '#' ? 1 : 0) +
		(p[z - 1][y][x + 1] === '#' ? 1 : 0) +
		(p[z - 1][y + 1][x - 1] === '#' ? 1 : 0) +
		(p[z - 1][y + 1][x] === '#' ? 1 : 0) +
		(p[z - 1][y + 1][x + 1] === '#' ? 1 : 0) +
		(p[z][y - 1][x - 1] === '#' ? 1 : 0) +
		(p[z][y - 1][x] === '#' ? 1 : 0) +
		(p[z][y - 1][x + 1] === '#' ? 1 : 0) +
		(p[z][y][x - 1] === '#' ? 1 : 0) +

		(p[z][y][x + 1] === '#' ? 1 : 0) +
		(p[z][y + 1][x - 1] === '#' ? 1 : 0) +
		(p[z][y + 1][x] === '#' ? 1 : 0) +
		(p[z][y + 1][x + 1] === '#' ? 1 : 0) +
		(p[z + 1][y - 1][x - 1] === '#' ? 1 : 0) +
		(p[z + 1][y - 1][x] === '#' ? 1 : 0) +
		(p[z + 1][y - 1][x + 1] === '#' ? 1 : 0) +
		(p[z + 1][y][x - 1] === '#' ? 1 : 0) +
		(p[z + 1][y][x] === '#' ? 1 : 0) +
		(p[z + 1][y][x + 1] === '#' ? 1 : 0) +
		(p[z + 1][y + 1][x - 1] === '#' ? 1 : 0) +
		(p[z + 1][y + 1][x] === '#' ? 1 : 0) +
		(p[z + 1][y + 1][x + 1] === '#' ? 1 : 0),

	update: (counter, transposer) => {
		P.board.push(P.board.shift())
		const p = P.board[0]
		const p1 = P.board[1]
		for (let z = 1; z < P.D.z - 1; z++)
			for (let y = 1; y < P.D.y - 1; y++)
				for (let x = 1; x < P.D.x - 1; x++)
					p[z][y][x] = transposer(p1[z][y][x], counter(p1, z, y, x))
		return P
	},

	step: () => P.update(P.adjacentCount, (s, c) =>
		s === '#' && (c < 2 || c > 3)
			? '.'
			: (
				c === 3
					? '#'
					: s
			)
	),

	getData: () => P.board[0],

	init: T => {
		const p = P.prep(T)
		const board = P.populate(31, p)
		P.D = {
			z: board.length - 2,
			y: board[0].length - 2,
			x: board[0][0].length - 2
		}
		P.board = [P.clone(board), P.clone(board)]
		return P
	}

}

class QuadModel {

	constructor() {
		this.clear()
	}

	clear() {
		this.vc = []
		this.idx = []
	}

	quadXM(x, y, z, c) {
		const y1 = y + 1, z1 = z + 1, i = this.idx.length
		this.vc.push(
			x,  y,  z, c, 0.7 * c, 0.5 * c,
			x,  y, z1, c, 0.7 * c, 0.5 * c,
			x, y1, z1, c, 0.7 * c, 0.5 * c,
			x, y1,  z, c, 0.7 * c, 0.5 * c
		)
		this.idx.push(i, i+1, i+2, i, i+2, i+3)
		console.log(this.vc.length+' '+this.idx.length)
	}

	quadXP(x, y, z, c) {
		const y1 = y + 1, z1 = z + 1
		this.v.push(x, y, z, x, y1, z1, x, y, z1, x, y, z, x, y1, z, x, y1, z1)
		for (let i = 0; i < 6; i++)
			this.c.push(c, 0.7 * c, 0.5 * c)
	}

	quadYM(x, y, z, c) {
		const x1 = x + 1, z1 = z + 1
		this.v.push(x, y, z, x1, y, z, x1, y, z1, x, y, z, x1, y, z1, x, y, z1)
		for (let i = 0; i < 6; i++)
			this.c.push(c, 0.7 * c, 0.5 * c)
	}

	quadYP(x, y, z, c) {
		const x1 = x + 1, z1 = z + 1
		this.v.push(x, y, z, x1, y, z1, x1, y, z, x, y, z, x, y, z1, x1, y, z1)
		for (let i = 0; i < 6; i++)
			this.c.push(c, 0.7 * c, 0.5 * c)
	}

	quadZM(x, y, z, c) {
		const x1 = x + 1, y1 = y + 1
		this.v.push(x, y, z, x, y1, z, x1, y1, z, x, y, z, x1, y1, z, x1, y, z)
		for (let i = 0; i < 6; i++)
			this.c.push(c, 0.7 * c, 0.5 * c)
	}

	quadZP(x, y, z, c) {
		const x1 = x + 1, y1 = y + 1
		this.v.push(x, y, z, x1, y1, z, x, y1, z, x, y, z, x1, y, z, x1, y1, z)
		for (let i = 0; i < 6; i++)
			this.c.push(c, 0.7 * c, 0.5 * c)
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
		const v = this.model.getData()
		const d = v.length
		const d2 = d / 2
		for (let z in v) {
			const z0 = z - d2
			const z1 = z0 + 1
			for (let y in v) {
				const y0 = y - d2
				const y1 = y0 + 1
				for (let x in v) {
					const x0 = x - d2
					const x1 = x0 + 1
					if (v[z][y][x] !== '.') {
						const c = (v[z][y][x] === '#' ? 0.8 : 0.2)
						//this.quadXP(x1, y0, z0, c * 0.6)
						//this.quadYP(x0, y1, z0, c * 0.7)
						//this.quadZP(x0, y0, z1, c * 0.8)
						this.quadXM(x0, y0, z0, c * 0.5)
						//this.quadYM(x0, y0, z0, c * 0.4)
						//this.quadZM(x0, y0, z0, c * 0.3)
					}
				}
			}
		}
		console.log(``)
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

	speed = 4000

	constructor() {
		super()
/*
		this.vc = [
			-0.5, -0.5, -0.5,   1, 1, 0,
			-0.5, 0.5, -0.5,    1, 1, 0,
			0.5, 0.5, -0.5,     1, 1, 0,
			0.5, -0.5, -0.5,    1, 1, 0,

			-0.5, -0.5, 0.5,    0, 0, 1,
			0.5, -0.5, 0.5,     0, 0, 1,
			0.5, 0.5, 0.5,      0, 0, 1,
			-0.5, 0.5, 0.5,     0, 0, 1,

			-0.5, -0.5, -0.5,   0, 1, 1,
			-0.5, -0.5, 0.5,    0, 1, 1,
			-0.5, 0.5, 0.5,     0, 1, 1,
			-0.5, 0.5, -0.5,    0, 1, 1,

			0.5, -0.5, -0.5,    1, 0, 0,
			0.5, 0.5, -0.5,     1, 0, 0,
			0.5, 0.5, 0.5,      1, 0, 0,
			0.5, -0.5, 0.5,     1, 0, 0,

			-0.5, -0.5, -0.5,   1, 0, 1,
			0.5, -0.5, -0.5,    1, 0, 1,
			0.5, -0.5, 0.5,     1, 0, 1,
			-0.5, -0.5, 0.5,    1, 0, 1,

			-0.5, 0.5, -0.5,    0, 1, 0,
			-0.5, 0.5, 0.5,     0, 1, 0,
			0.5, 0.5, 0.5,      0, 1, 0,
			0.5, 0.5, -0.5,     0, 1, 0
		];

		// Indexes (for drawing squares using triangles)
		this.idx = [
			0, 1, 2,
			0, 2, 3,

			4, 5, 6,
			4, 6, 7,

			8, 9, 10,
			8, 10, 11,

			12, 13, 14,
			12, 14, 15,

			16, 17, 18,
			16, 18, 19,

			20, 21, 22,
			20, 22, 23
		];
*/
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

	gl
	cam = { fov: 60 }
	pos = { x: 0, y: 0, z: -8 }
	rot = { x: 0.2, y: 0.4/*, z: 0*/ }
	rMatrix = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
	mode = true

	constructor() {
		this.canvas = document.createElement('canvas')
		try {
			gl = this.canvas.getContext('webgl')
			gl.clearColor(0.9, 0.95, 1, 1)
			gl.clearDepth(1)
			gl.enable(gl.DEPTH_TEST)
			gl.enable(gl.CULL_FACE)
			gl.depthFunc(gl.LEQUAL)
			this.initShaders()
		} catch (e) {
			alert('WebGL not initialized!')
		}
		document.body.appendChild(this.canvas)
		this.resize()
		window.addEventListener('resize', this.requestResize.bind(this))
	}

	initShaders() {

		const getShader = (type, source) => {
			const s = gl.createShader(type)
			gl.shaderSource(s, source)
			gl.compileShader(s)
			if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
				alert('GLSL compile error:\n' + gl.getShaderInfoLog(s))
			return s
		}
		const sh = this.shader = gl.createProgram()
		gl.attachShader(sh, getShader(gl.VERTEX_SHADER,
			`attribute vec3 aPos;
attribute vec4 aCol;
uniform mat4 uMVMatrix,uPMatrix;
varying vec4 vColor;
void main(void) {
  gl_Position = uPMatrix * uMVMatrix * vec4(aPos, 1.0);
  vColor = aCol;
}`))
		gl.attachShader(sh, getShader(gl.FRAGMENT_SHADER,
			`varying lowp vec4 vColor;
void main(void) {
	gl_FragColor = vColor;
}`))
		gl.linkProgram(sh)
		if (!gl.getProgramParameter(sh, gl.LINK_STATUS))
			alert('Shaders not initialized!')
		gl.useProgram(sh)		
		this.uniRM = gl.getUniformLocation(sh, 'uMVMatrix')
		gl.enableVertexAttribArray(this.vertexPosition = gl.getAttribLocation(sh, 'aPos'))
		gl.enableVertexAttribArray(this.vertexColor = gl.getAttribLocation(sh, 'aCol'))
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
		//gl.clear(gl.COLOR_BUFFER_BIT);
		gl.uniformMatrix4fv(this.uniRM, false, r)
		gl.drawElements(gl.LINES, 6 * 2 * 3, gl.UNSIGNED_SHORT, 0);

		// Call drawScene again in the next browser repaint
		//count += 0.01;
		//requestAnimationFrame(drawScene);
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

	setScene(scene) {
		this.scene = scene
		// Write a_Position and a_Color using gl.ARRAY_BUFFER
		gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(scene.vc), gl.STATIC_DRAW);

		gl.vertexAttribPointer(this.vertexPosition, 3, gl.FLOAT, false, 4 * (3 + 3), 0);

		gl.vertexAttribPointer(this.vertexColor, 3, gl.FLOAT, false, 4 * (3 + 3), 4 * 3);

		// Write indexes in gl.ELEMENT_ARRAY_BUFFER
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(scene.idx), gl.STATIC_DRAW);
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

	mouse = { button: false, x: 0, y: 0, u: 0, v: 0, max: 50 }
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
		this.mouse.u *= 0.97
		this.mouse.v *= 0.9
		if (this.mouse.u > 1 || this.mouse.v > 1 || this.mouse.u < -1 || this.mouse.v < -1) {
			this.move()
		} else
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
		this.scene = new AnimatedScene().addListener(this).setModel(model)//.start()
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

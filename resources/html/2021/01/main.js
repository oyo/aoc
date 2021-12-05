const P = {

	prep: T => T.split('\n'),

	prepEmpty: d => new Array(d+2).fill(true).map(z => new Array(d+2).fill(true).map(y => new Array(d+2).fill('.'))),

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

	clone: (board) => board.slice().map(y => y.slice().map(x => x.slice())),

	count: z => z.reduce((a, y) => a + y.reduce((b, x) => b + x.filter(c => c === '#').length,0),0),

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
		let board = P.populate(32 - 2, p)
		P.orig = board
		P.D = {
			z: board.length - 2,
			y: board[0].length - 2,
			x: board[0][0].length - 2
		}
		P.board = [P.clone(P.orig), P.clone(P.orig)]
		P.stepN = 0
		P.timer = setTimeout(P.step, 1000)
		return P
	}

}

class QuadModel {

	constructor() {
		this.v = []
		this.c = []	
	}

	clear() {
		this.v.clear()
		this.c.clear()
	}

	quadXM(x, y, z, c) {
		const y1 = y + 1, z1 = z + 1
		this.v.push(x, y, z, x, y, z1, x, y1, z1, x, y, z, x, y1, z1, x, y1, z)
		for (let i = 0; i < 6; i++)
			this.c.push(c, 0.7 * c, 0.5 * c, 1)
	}

	quadXP (x, y, z, c) {
		const y1 = y + 1, z1 = z + 1
		this.v.push(x, y, z, x, y1, z1, x, y, z1, x, y, z, x, y1, z, x, y1, z1)
		for (let i = 0; i < 6; i++)
			this.c.push(c, 0.7 * c, 0.5 * c, 1)
	}

	quadYM(x, y, z, c) {
		const x1 = x + 1, z1 = z + 1
		this.v.push(x, y, z, x1, y, z, x1, y, z1, x, y, z, x1, y, z1, x, y, z1)
		for (let i = 0; i < 6; i++)
			this.c.push(c, 0.7 * c, 0.5 * c, 1)
	}

	quadYP(x, y, z, c) {
		const x1 = x + 1, z1 = z + 1
		this.v.push(x, y, z, x1, y, z1, x1, y, z, x, y, z, x, y, z1, x1, y, z1)
		for (let i = 0; i < 6; i++)
			this.c.push(c, 0.7 * c, 0.5 * c, 1)
	}

	quadZM(x, y, z, c) {
		const x1 = x + 1, y1 = y + 1
		this.v.push(x, y, z, x, y1, z, x1, y1, z, x, y, z, x1, y1, z, x1, y, z)
		for (let i = 0; i < 6; i++)
			this.c.push(c, 0.7 * c, 0.5 * c, 1)
	}

	quadZP(x, y, z, c) {
		const x1 = x + 1, y1 = y + 1
		this.v.push(x, y, z, x1, y1, z, x, y1, z, x, y, z, x1, y, z, x1, y1, z)
		for (let i = 0; i < 6; i++)
			this.c.push(c, 0.7 * c, 0.5 * c, 1)
	}

}

class Scene extends QuadModel {

	constructor(voxel) {
		super()
		this.create(voxel)
	}

	create(voxel) {
		const v = voxel
		const d = v.length
		const d2 = d/2
		for (let z in v) {
			const z0 = z - d2
			const z1 = z0 + 1
			for (let y in v) {
				const y0 = y - d2
				const y1 = y0 + 1
				for (let x in v) {
					const x0 = x - d2
					const x1 = x0 + 1
					//if (filt[x][y][z])
					{
						if (v[z][y][x] !== '.') {
							const c = (v[z][y][x] === '#' ? 0.8 : 0.2)
							this.quadXP(x1, y0, z0, c * 0.6)
							this.quadYP(x0, y1, z0, c * 0.7)
							this.quadZP(x0, y0, z1, c * 0.8)
							this.quadXM(x0, y0, z0, c * 0.5)
							this.quadYM(x0, y0, z0, c * 0.4)
							this.quadZM(x0, y0, z0, c * 0.3)
						}
					}
				}
			}
		}
	}

}


var gl

const Viz = {
	mode: true,
	pos: { x: 0, y: 0, z: -24 },
	rot: { x: 0.2, y: 0.2/*, z: 0*/ },
	rMatrix: new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -100, 1]),
	uniRM: false,
	perspective: function (fovy, aspect, n, f) {
		var t = Math.tan(fovy * Math.PI / 360) * n,
			b = -t,
			l = aspect * b,
			r = aspect * t
		//return this.frustum(l, r, b, t, n, f)
		return [
			2 * n / (r - l), 0, (r + l) / (r - l), 0,
			0, 2 * n / (t - b), (t + b) / (t - b), 0,
			0, 0, -(f + n) / (f - n), -(2 * f * n) / (f - n),
			0, 0, -1, 0
		]
	},
	init: function (settings) {
		//Gradient.init()
		//this.rMatrix[14] = -24//-this.DIM - 40
		this.canvas = document.createElement('canvas')
		try {
			gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl')
		} catch (e) { }
		if (!gl)
			alert('WebGL not initialized!')
		gl.clearColor(0.9, 0.95, 1, 1)
		gl.clearDepth(1)
		gl.enable(gl.DEPTH_TEST)
		gl.enable(gl.CULL_FACE)
		gl.depthFunc(gl.LEQUAL)
		document.body.appendChild(this.canvas)
		this.initShaders()
		this.doResize()
		window.addEventListener('resize', this.resize.bind(this))
		return Viz
	},
	initShaders: function () {
		var sh = gl.createProgram()
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
`precision lowp float;
varying vec4 vColor;
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
	},
	getShader: function (gl, type, source) {
		var s = gl.createShader(type)
		gl.shaderSource(s, source)
		gl.compileShader(s)
		if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
			alert('GLSL compile error:\n' + gl.getShaderInfoLog(s))
		return s
	},
	arrayToBuffer: function (arr, itemSize, ptr) {
		var buf = gl.createBuffer()
		gl.bindBuffer(gl.ARRAY_BUFFER, buf)
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arr), gl.STATIC_DRAW)
		buf.itemSize = itemSize
		buf.numItems = arr.length / buf.itemSize
		gl.vertexAttribPointer(ptr, buf.itemSize, gl.FLOAT, false, 0, 0)
		return buf
	},
	setScene: function(scene) {
		this.scene = scene
		this.arrayToBuffer(scene.c, 4, this.vertexColorAttribute)
		this.numItems = this.arrayToBuffer(scene.v, 3, this.vertexPositionAttribute).numItems
		//console.log(this.si.cubes+' voxels, '+m.v.length+' vertices in '+(Date.now()-time)+'ms')
		this.render()
		return Viz
	},
	render: function () {
		if (!this.scene)
			return
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
		var cx = Math.cos(this.rot.x),
			sx = Math.sin(this.rot.x),
			cy = Math.cos(this.rot.y),
			sy = Math.sin(this.rot.y)
			r = this.rMatrix
		r[0] = cy; r[1] = sx * sy; r[2] = -cx * sy,
		r[5] = cx; r[6] = sx
		r[8] = sy; r[9] = -sx * cy; r[10] = cx * cy
		r[12] = this.pos.x
		r[13] = this.pos.y
		r[14] = this.pos.z
		gl.uniformMatrix4fv(this.uniRM, false, r)
		gl.drawArrays(this.mode ? gl.TRIANGLES : gl.LINES, 0, this.numItems)
	},
	resize: function () {
		clearTimeout(this.resizeTimer)
		var self = this
		this.resizeTimer = setTimeout(function () {
			self.doResize()
		}, 200)
	},
	doResize: function () {
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight
		this.pMatrix = new Float32Array(this.perspective(20, window.innerWidth / this.canvas.height, 1, 1000))
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
		gl.uniformMatrix4fv(gl.getUniformLocation(this.shader, 'uPMatrix'), false, this.pMatrix)
		this.change = true
		this.render()
	},

	updatePos: function(c) {
		this.pos.x += c[0]
		this.pos.y += c[1]
		this.pos.z += c[2]
		this.render()
		return this
	},

	updateRot: function(r) {
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

	constructor(controller) {
		this.controller = controller
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
		console.log(evt)
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
		this.controller.mouseDragChanged(this.mouse)
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
			case  78: this.createData(); this.createScene(); break
			case  84: this.color = !this.color; this.createScene(); break
			case  86: this.color = this.volume = !this.volume; this.createScene(); break
			case  87: this.mode = !this.mode; break
			case  37: this.startKeyTimer( 1); break
			case  40: this.startKeyTimer( 2); break
			case  39: this.startKeyTimer( 4); break
			case  38: this.startKeyTimer( 8); break
			case 187: this.startKeyTimer(16); break
			case 189: this.startKeyTimer(32); break
		}
		this.change = true
	}

	keyUp(evt) {
		switch (evt.keyCode) {
			case  37: this.keyMask &= ~1; break //left
			case  40: this.keyMask &= ~2; break //down
			case  39: this.keyMask &= ~4; break //right
			case  38: this.keyMask &= ~8; break //up
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
		this.controller.keysChanged(this.keyMask)
	}

}

class Game {

	constructor(model) {
		this.scene = new Scene(model.getData())
		this.input = new UserInput(this)
		this.output = Viz.init().setScene(this.scene)
	}

	keysChanged(keyMask) {
		const speed = 0.5
		const camEvent = [0,0,0]		
		if (keyMask &  1) camEvent[0] = -speed
		if (keyMask &  2) camEvent[1] = -speed
		if (keyMask &  4) camEvent[0] = speed
		if (keyMask &  8) camEvent[1] = speed
		if (keyMask & 16) camEvent[2] = speed
		if (keyMask & 32) camEvent[2] = -speed
		this.output.updatePos(camEvent)
	}

	mouseDragChanged(vector) {
		this.output.updateRot([vector.u,vector.v])
	}

}

new Game(P.init(
`.#.
..#
###`))

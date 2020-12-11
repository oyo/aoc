const P = {

  prep: T => {
      const p = T.split('\n').map(L => ('.' + L + '.').split(''))
      const f = new Array(p[0].length).fill('.')
      p.unshift(f)
      p.push(f)
      return p
  },

  adjacentCount: (p, y, x) => 
      (p[y - 1][x - 1] === '#' ? 1 : 0) +
      (p[y - 1][x    ] === '#' ? 1 : 0) +
      (p[y - 1][x + 1] === '#' ? 1 : 0) +
      (p[y    ][x - 1] === '#' ? 1 : 0) +
      (p[y    ][x + 1] === '#' ? 1 : 0) +
      (p[y + 1][x - 1] === '#' ? 1 : 0) +
      (p[y + 1][x    ] === '#' ? 1 : 0) +
      (p[y + 1][x + 1] === '#' ? 1 : 0),

  visibleCount: (p, y, x) =>
      P.visD(p, y, x, -1, -1) +
      P.visD(p, y, x, -1,  0) +
      P.visD(p, y, x, -1,  1) +
      P.visD(p, y, x,  0, -1) +
      P.visD(p, y, x,  0,  1) +
      P.visD(p, y, x,  1, -1) +
      P.visD(p, y, x,  1,  0) +
      P.visD(p, y, x,  1,  1),

  visD: (p, sy, sx, dy, dx) => {
      let seen = false
      for (
          let x = sx + dx, y = sy + dy;
          y > 0 && y < P.D.y - 1 && x > 0 && x < P.D.x - 1 && !seen;
          x += dx, y += dy
      ) {
          seen = (p[y][x] !== '.' ? p[y][x] : false)
      }
      return seen === '#' ? 1 : 0
  },

  dump: (p, i) => {
      for (let y = 1; y < P.D.y - 1; y++)
          console.log(p[y].join('').substring(1, P.D.x - 1))
      console.log()
  },

  step: (board, counter, transposer) => {
      board.push(board.shift())
      const p = board[0]
      const p1 = board[1]
      for (let y = 1; y < P.D.y - 1; y++)
          for (let x = 1; x < P.D.x - 1; x++)
              p[y][x] = transposer(p1[y][x], counter(p1, y, x))
  },

  renderstep: (counter, transposer) => {
    P.step(P.board, counter, transposer)
    P.step(P.board, counter, transposer)
    if ( P.board[0].reduce((a, y) => a + y.filter(c => c === '#').length, 0)
      === P.board[1].reduce((a, y) => a + y.filter(c => c === '#').length, 0)) {
      clearInterval(P.timer)
      P.init(P.orig)
    }
  },
  
  part_1_step: () => P.renderstep(P.adjacentCount, (s, c) =>
      s === 'L' && c === 0
      ? '#'
      : (
          s === '#' && c > 3
          ? 'L'
          : s
      )
  ),

  part_2_step: T => P.renderstep(P.visibleCount, (s, c) =>
      s === 'L' && c === 0
      ? '#'
      : (
          s === '#' && c > 4
          ? 'L'
          : s
      )
  ),

  init: (board) => {
    P.orig = board
    P.D = {
      y: board.length,
      x: board[0].length
    }
    P.board = [P.orig.slice().map(r => r.slice()), P.orig.slice().map(r => r.slice())]
    P.timer = setInterval(P.part_2_step, 200)
  }

}

var gl,
Gradient = {
	color: new Array(256),
	init: function(){
		var min=1e9,max=-1e9,dir=true;
		this.color[0] = 0;
		for (var i=1;i<256;i++) {
			dir = Math.random()>0.25?dir:!dir;
			var c = this.color[i-1]+(dir?0.1:-0.1)*Math.random();
			if (c<min)
				min=c;
			if (c>max)
				max=c;
			this.color[i] = c;
		}
		var d=max-min+0.2;
		for (var i=0;i<256;i++)
			this.color[i] = (this.color[(i+128)%256]-min)/d+0.2;
	}
};
function QuadModel(){
	this.v = [];
	this.c = [];
}
QuadModel.prototype = {
	clear: function() {
		this.v.clear();
		this.c.clear();
	},
	quadXM: function(x,y,z,c){
		var y1=y+1,z1=z+1;
		this.v.push(x,y,z, x,y,z1, x,y1,z1, x,y,z, x,y1,z1, x,y1,z);
		for (var i=0;i<6;i++)
			this.c.push(c,0.7*c,0.5*c,1);
	},
	quadXP: function(x,y,z,c){
		var y1=y+1,z1=z+1;
		this.v.push(x,y,z, x,y1,z1, x,y,z1, x,y,z, x,y1,z, x,y1,z1);
		for (var i=0;i<6;i++)
			this.c.push(c,0.7*c,0.5*c,1);
	},
	quadYM: function(x,y,z,c){
		var x1=x+1,z1=z+1;
		this.v.push(x,y,z, x1,y,z, x1,y,z1, x,y,z, x1,y,z1, x,y,z1);
		for (var i=0;i<6;i++)
			this.c.push(c,0.7*c,0.5*c,1);
	},
	quadYP: function(x,y,z,c){
		var x1=x+1,z1=z+1;
		this.v.push(x,y,z, x1,y,z1, x1,y,z, x,y,z, x,y,z1, x1,y,z1);
		for (var i=0;i<6;i++)
			this.c.push(c,0.7*c,0.5*c,1);
	},
	quadZM: function(x,y,z,c){
		var x1=x+1,y1=y+1;
		this.v.push(x,y,z, x,y1,z, x1,y1,z, x,y,z, x1,y1,z, x1,y,z);
		for (var i=0;i<6;i++)
			this.c.push(c,0.7*c,0.5*c,1);
	},
	quadZP: function(x,y,z,c){
		var x1=x+1,y1=y+1;
		this.v.push(x,y,z, x1,y1,z, x,y1,z, x,y,z, x1,y,z, x1,y1,z);
		for (var i=0;i<6;i++)
			this.c.push(c,0.7*c,0.5*c,1);
	}
}
	
const Viz = {
	DIM: 80,
	mode: true,
	volume: false,
	mouse: {button:false,x:0,y:0,u:0,v:0,max:50},
	keyMask: 0,
	rot: {x:0.5,y:1.2},
	pos: {x:0,y:0},
	rMatrix: new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,-100,1]),
	uniRM: false,
	perspective: function(fovy, aspect, n, f) {
		var t = Math.tan(fovy*Math.PI/360)*n,
			b = -t,
			l = aspect * b,
			r = aspect * t;
		//return this.frustum(l, r, b, t, n, f);
		return [
			2*n/(r-l),	0,			(r+l)/(r-l),	0,
			0,			2*n/(t-b),	(t+b)/(t-b),	0,
			0,			0,			-(f+n)/(f-n),	-(2*f*n)/(f-n),
			0,			0,			-1,				0
		];
	},
	init: function(input) {
		Gradient.init();
		this.rMatrix[14] = -this.DIM-40;
		this.canvas = document.createElement('canvas');
		try {
			gl=this.canvas.getContext('webgl')||this.canvas.getContext('experimental-webgl');
		} catch(e){}
		if (!gl)
			alert('WebGL not initialized!');
		gl.clearColor(0.9,0.95,1,1);
		gl.clearDepth(1);
		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);
		gl.depthFunc(gl.LEQUAL);
		this.initShaders();
		this.createData(input);
		this.createScene();
		this.doResize();
		this.run();
		var self = this;
		document.body.appendChild(this.canvas);
		document.addEventListener('mousedown', function(e){self.mouseDown(e);});
		document.addEventListener('mouseup', function(e){self.mouseUp(e);});
		document.addEventListener('mouseout', function(e){self.mouseUp(e);});
		document.addEventListener('mousemove', function(e){self.mouseMove(e);});
		document.addEventListener('keydown', function(e){self.keyDown(e);});
		document.addEventListener('keyup', function(e){self.keyUp(e);});
		document.addEventListener('DOMMouseScroll', function(e){self.mouseWheel(e);});
		document.addEventListener('mousewheel', function(e){self.mouseWheel(e);});
    window.addEventListener('resize', function(e){self.resize(e);});
	},
	initShaders: function()  {
		var sh = gl.createProgram();
		gl.attachShader(sh, this.getShader(gl, 'shader-vs'));
		gl.attachShader(sh, this.getShader(gl, 'shader-fs'));
		gl.linkProgram(sh);
		if (!gl.getProgramParameter(sh, gl.LINK_STATUS))
			alert('Shaders not initialized!');
		gl.useProgram(sh);
		this.vertexPositionAttribute = gl.getAttribLocation(sh, 'aPos');
		this.vertexColorAttribute = gl.getAttribLocation(sh, 'aCol');
		this.uniRM = gl.getUniformLocation(sh, 'uMVMatrix');
		this.shader = sh;
		gl.enableVertexAttribArray(this.vertexPositionAttribute);
		gl.enableVertexAttribArray(this.vertexColorAttribute);
	},
	getShader: function(gl,id) {
		var s,script = document.getElementById(id);
		if (script.type === 'x-shader/x-fragment')
			s = gl.createShader(gl.FRAGMENT_SHADER);
		else if (script.type === 'x-shader/x-vertex')
			s = gl.createShader(gl.VERTEX_SHADER);
		else
			return null;
		gl.shaderSource(s, script.firstChild.data);
		gl.compileShader(s);
		if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
			alert('GLSL compile error:\n' + gl.getShaderInfoLog(s));
		return s;
	},
	arrayToBuffer: function(arr,itemSize,ptr) {
		var buf = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buf);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arr), gl.STATIC_DRAW);
		buf.itemSize = itemSize;
		buf.numItems = arr.length/buf.itemSize;
		gl.vertexAttribPointer(ptr, buf.itemSize, gl.FLOAT, false, 0, 0);
		return buf;
	},
	createData: function(input) {
		var time = Date.now()
	},
	createScene: function() {
		var time = Date.now(),
			dat=P.board[0],
			x,y,z,x0,y0,z0,x1,y1,z1,
			c,d=this.DIM,d2=d/2,
			m = new QuadModel();
			//this.si.doFilterSphere();
			//filt = this.si.filter;
			for (x=0;x<d;x++) {
				x0=x-d2;x1=x0+1;
				for (z=0;z<d;z++) {
          z0=z-d2;z1=z0+1;
          y = d>>1;
          //if (filt[x][y][z])
          {
            //c=this.color?Gradient.color[~~(dat[x][y][z]*256)]:1;
            if (dat[z][x]!=='.') {
              c=(dat[z][x]==='L' ? 0.8 : 0.2);
              /*
              m.quadXP(x1,y0,0,c*0.6);
              m.quadYP(x0,y1,0,c*0.7);
              m.quadZP(x0,y0,1,c*0.8);
              m.quadXM(x0,y0,0,c*0.5);
              m.quadYM(x0,y0,0,c*0.4);
              m.quadZM(x0,y0,0,c*0.3);
              */
              m.quadXP(x1,0,z0,c*0.6);
              m.quadYP(x0,1,z0,c*0.7);
              m.quadZP(x0,0,z1,c*0.8);
              m.quadXM(x0,0,z0,c*0.5);
              m.quadYM(x0,0,z0,c*0.4);
              m.quadZM(x0,0,z0,c*0.3);
            }
          }
				}
			}
		this.arrayToBuffer(m.c,4,this.vertexColorAttribute);
		this.numItems = this.arrayToBuffer(m.v,3,this.vertexPositionAttribute).numItems;
		//console.log(this.si.cubes+' voxels, '+m.v.length+' vertices in '+(Date.now()-time)+'ms');
	},
	render: function() {
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		var cx = Math.cos(this.rot.x),
			sx = Math.sin(this.rot.x),
			cy = Math.cos(this.rot.y),
			sy = Math.sin(this.rot.y),
			r = this.rMatrix;
		r[0]=cy;r[1]=sx*sy;r[2]=-cx*sy,
		r[5]=cx;r[6]=sx;
		r[8]=sy;r[9]=-sx*cy;r[10]=cx*cy;
		gl.uniformMatrix4fv(this.uniRM, false, r);
		gl.drawArrays(this.mode?gl.TRIANGLES:gl.LINES, 0, this.numItems);
	},
	run: function() {
      this.createScene()
			this.render();
		var self = this;
		requestAnimationFrame(function(){
			self.run();
		});
	},
	resize: function() {
		clearTimeout(this.resizeTimer);
		var self = this;
		this.resizeTimer = setTimeout(function(){
			self.doResize();
		},200);
	},
	doResize: function() {
		this.canvas.width=window.innerWidth;
		this.canvas.height=window.innerHeight
		this.pMatrix = new Float32Array(this.perspective(20,window.innerWidth/this.canvas.height,1,1000));
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		gl.uniformMatrix4fv(gl.getUniformLocation(this.shader, 'uPMatrix'),false,this.pMatrix);
		this.change = true;
	},
	mouseWheel: function(evt)  {
		//this.rMatrix[14] += evt.wheelDelta/200.0;
		if (this.color) {
			if (evt.wheelDelta>0||evt.detail>0)
				for (var i=0;i<3;i++)
					Gradient.color.push(Gradient.color.shift());
			else
				for (var i=0;i<3;i++)
					Gradient.color.unshift(Gradient.color.pop());
		} else {
			this.si.thres += evt.detail?evt.detail/1000.0:evt.wheelDelta/10000.0;
			this.si.doFilter();
		}
		this.createScene();
		this.render();
	},
	mouseMove: function(evt) {
		if (this.mouse.button) {
			this.mouse.u = evt.clientX-this.mouse.x;
			this.mouse.v = evt.clientY-this.mouse.y;
			if (this.mouse.u>this.mouse.max)
				this.mouse.u=this.mouse.max;
			else if (this.mouse.u<-this.mouse.max)
				this.mouse.u=-this.mouse.max;
			if (this.mouse.v>this.mouse.max)
				this.mouse.v=this.mouse.max;
			else if (this.mouse.v<-this.mouse.max)
				this.mouse.v=-this.mouse.max;
			this.move();
			this.mouse.x=evt.clientX;
			this.mouse.y=evt.clientY;
		}
	},
	slowDown: function() {
		this.mouse.u *= 0.97;
		this.mouse.v *= 0.9;
		if (this.mouse.u>1||this.mouse.v>1||this.mouse.u<-1||this.mouse.v<-1) {
			this.move();
		} else
			clearInterval(this.slowDownTimer);
	},
	move: function() {
		this.rot.y+=this.mouse.u/360;
		this.rot.x+=this.mouse.v/360;
		if (this.rot.x>Math.PI/2)
			this.rot.x=Math.PI/2;
		else if (this.rot.x<-Math.PI/2)
			this.rot.x=-Math.PI/2;
		this.change = true;
	},
	mouseDown: function(evt) {
		this.mouse.button=true;
		this.mouse.x=evt.clientX;
		this.mouse.y=evt.clientY;
		this.mouse.u = 0;
		this.mouse.v = 0;
		clearInterval(this.slowDownTimer);
	},
	mouseUp: function(evt) {
		this.mouse.button=false;
		var self = this;
		this.slowDownTimer = setInterval(function(){
			self.slowDown();
		},20);
	},
	keyDown: function(e) {
		switch(e.keyCode) {
			case 78: this.createData(); this.createScene(); break;
			case 84: this.color=!this.color; this.createScene(); break;
			case 86: this.color=this.volume=!this.volume; this.createScene(); break;
			case 87: this.mode=!this.mode; break;
			case 37: this.startKeyTimer(1); break;
			case 40: this.startKeyTimer(2); break;
			case 39: this.startKeyTimer(4); break;
			case 38: this.startKeyTimer(8); break;
			case 107:
			case 187: this.mouseWheel({detail:-3}); break;
			case 109:
			case 189: this.mouseWheel({detail:3});
		}
		this.change = true;
	},
	keyUp: function(e) {
		switch(e.keyCode) {
			case 37: this.keyMask &= ~1; break;
			case 40: this.keyMask &= ~2; break; 
			case 39: this.keyMask &= ~4; break;
			case 38: this.keyMask &= ~8;
		}
	},
	startKeyTimer: function(mask){
		this.keyMask |= mask; 
		if (this.keyTimer)
			return;
		var self = this;
		this.keyTimer = setInterval(function(){
			self.processKeys();
		},20);
	},
	processKeys: function() {
		if (this.keyMask===0) {
			clearInterval(this.keyTimer);
			this.keyTimer = null;
		}
		if (this.keyMask&1)
			this.rMatrix[12]-=2;
		if (this.keyMask&2)
			this.rMatrix[13]-=2;
		if (this.keyMask&4)
			this.rMatrix[12]+=2;
		if (this.keyMask&8)
			this.rMatrix[13]+=2;
		this.change = true;
	}
}


fetch('../input')
  .then(response => response.text())
  .then(input => {
    P.init(P.prep(input))
    Viz.init()
  })

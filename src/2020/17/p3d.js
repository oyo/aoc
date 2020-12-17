const P = {

	prepEmpty: d => Array(d+2).fill(Array(d+2).fill(Array(d+2).fill('L'))),

	populateRandom: (z,r,s) => z.map(y => y.map(x => x.map(c => Math.random() < r ? s : c))),

	prep: T => {
		const p = T.split('\n').map(L => ('.' + L + '.').split(''))
		const f = new Array(p[0].length).fill('.')
		p.unshift(f)
		p.push(f)
		return p
	},

	adjacentCount: (p, z, y, x) => 
		(p[z - 1][y - 1][x - 1] === '#' ? 1 : 0) +
		(p[z - 1][y - 1][x    ] === '#' ? 1 : 0) +
		(p[z - 1][y - 1][x + 1] === '#' ? 1 : 0) +
		(p[z - 1][y    ][x - 1] === '#' ? 1 : 0) +
		(p[z - 1][y    ][x    ] === '#' ? 1 : 0) +
		(p[z - 1][y    ][x + 1] === '#' ? 1 : 0) +
		(p[z - 1][y + 1][x - 1] === '#' ? 1 : 0) +
		(p[z - 1][y + 1][x    ] === '#' ? 1 : 0) +
		(p[z - 1][y + 1][x + 1] === '#' ? 1 : 0) +
		(p[z    ][y - 1][x - 1] === '#' ? 1 : 0) +
		(p[z    ][y - 1][x    ] === '#' ? 1 : 0) +
		(p[z    ][y - 1][x + 1] === '#' ? 1 : 0) +
		(p[z    ][y    ][x - 1] === '#' ? 1 : 0) +

		(p[z    ][y    ][x + 1] === '#' ? 1 : 0) +
		(p[z    ][y + 1][x - 1] === '#' ? 1 : 0) +
		(p[z    ][y + 1][x    ] === '#' ? 1 : 0) +
		(p[z    ][y + 1][x + 1] === '#' ? 1 : 0) +
		(p[z + 1][y - 1][x - 1] === '#' ? 1 : 0) +
		(p[z + 1][y - 1][x    ] === '#' ? 1 : 0) +
		(p[z + 1][y - 1][x + 1] === '#' ? 1 : 0) +
		(p[z + 1][y    ][x - 1] === '#' ? 1 : 0) +
		(p[z + 1][y    ][x    ] === '#' ? 1 : 0) +
		(p[z + 1][y    ][x + 1] === '#' ? 1 : 0) +
		(p[z + 1][y + 1][x - 1] === '#' ? 1 : 0) +
		(p[z + 1][y + 1][x    ] === '#' ? 1 : 0) +
		(p[z + 1][y + 1][x + 1] === '#' ? 1 : 0),

  visibleCount: (p, z, y, x) =>
      P.visD(p, z, y, x, -1, -1, -1) +
      P.visD(p, z, y, x, -1, -1,  0) +
      P.visD(p, z, y, x, -1, -1,  1) +
      P.visD(p, z, y, x, -1,  0, -1) +
      P.visD(p, z, y, x, -1,  0,  0) +
      P.visD(p, z, y, x, -1,  0,  1) +
      P.visD(p, z, y, x, -1,  1, -1) +
      P.visD(p, z, y, x, -1,  1,  0) +
      P.visD(p, z, y, x, -1,  1,  1) +
      P.visD(p, z, y, x,  0, -1, -1) +
      P.visD(p, z, y, x,  0, -1,  0) +
      P.visD(p, z, y, x,  0, -1,  1) +
      P.visD(p, z, y, x,  0,  0, -1) +
      P.visD(p, z, y, x,  0,  0,  1) +
      P.visD(p, z, y, x,  0,  1, -1) +
      P.visD(p, z, y, x,  0,  1,  0) +
      P.visD(p, z, y, x,  0,  1,  1) +
      P.visD(p, z, y, x,  1, -1, -1) +
      P.visD(p, z, y, x,  1, -1,  0) +
      P.visD(p, z, y, x,  1, -1,  1) +
      P.visD(p, z, y, x,  1,  0, -1) +
      P.visD(p, z, y, x,  1,  0,  0) +
      P.visD(p, z, y, x,  1,  0,  1) +
      P.visD(p, z, y, x,  1,  1, -1) +
      P.visD(p, z, y, x,  1,  1,  0) +
      P.visD(p, z, y, x,  1,  1,  1),

  visD: (p, sy, sx, sz, dy, dx, dz) => {
      let seen = false
      for (
          let z = sz + dz, y = sy + dy, x = sx + dx;
          z > 0 && z < P.D.z - 1 && y > 0 && y < P.D.y - 1 && x > 0 && x < P.D.x - 1 && !seen;
          z +=dz, y += dy, x += dx
      ) {
          seen = (p[z][y][x] !== '.' ? p[z][y][x] : false)
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
	for (let z = 1; z < P.D.z - 1; z++)
		for (let y = 1; y < P.D.y - 1; y++)
			for (let x = 1; x < P.D.x - 1; x++)
				p[z][y][x] = transposer(p1[z][y][x], counter(p1, z, y, x))
  },

  clone: (board) => board.slice().map(y => y.slice().map(x => x.slice())),

  count: (board) => board.reduce((a, z) => a + z.reduce((a, y) => a + y.filter(c => c === '#'))).length,
  
  renderstep: (counter, transposer) => {
    P.step(P.board, counter, transposer)
    //P.step(P.board, counter, transposer)
	if ( P.count(P.board[0]) === P.count(P.board[1])) {
      clearInterval(P.timer)
      P.init(P.orig)
    }
  },
  
  part_1_step: () => P.renderstep(P.adjacentCount, (s, c) =>
      s === 'L' && c === 0
      ? '#'
      : (
          s === '#' && c > 16
          ? 'L'
          : s
      )
  ),

  part_2_step: T => P.renderstep(P.visibleCount, (s, c) =>
      s === 'L' && c === 0
      ? '#'
      : (
          s === '#' && c > 16
          ? 'L'
          : s
      )
  ),

	part_3_step: T => P.renderstep(P.adjacentCount, (s, c) =>
		s === '#' && c % 3 === 0 && c > 12
		? 'L'
		: (
			s === 'L' && c < 2
			? '#'
			: s
		)
	),

  init: (board) => {
    P.orig = board
    P.D = {
      z: board.length-2,
      y: board[0].length-2,
      x: board[0][0].length-2
    }
    P.board = [ P.clone(P.orig), P.clone(P.orig) ]
    P.timer = setInterval(P.part_3_step, 800)
  }

}
const P3 = {

	prepEmpty: d => {
		const za = new Array(d + 2)
		for (let z = 0; z < d + 2; z++) {
			const ya = new Array(d + 2)
			za[z] = ya
			for (let y = 0; y < d + 2; y++) {
				ya[y] = new Array(d + 2).fill('.')
			}
		}
		return za
	},

	populate: (dim, p) => {
		const board = P3.prepEmpty(dim)
		const z0 = (dim >> 1) + 1
		const o = z0 - (p.length >> 1)
		for (let y = 0; y < p.length; y++) {
			for (let x = 0; x < p.length; x++) {
				board[z0][o + y][o + x] = p[y][x]
			}
		}
		return board
	},

	prep: T => T.split('\n'),

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

	step: (board, counter, transposer) => {
		board.push(board.shift())
		const p = board[0]
		const p1 = board[1]
		for (let z = 1; z < P3.D.z - 1; z++)
			for (let y = 1; y < P3.D.y - 1; y++)
				for (let x = 1; x < P3.D.x - 1; x++)
					p[z][y][x] = transposer(p1[z][y][x], counter(p1, z, y, x))
	},

	clone: (board) => board.slice().map(y => y.slice().map(x => x.slice())),

	//countx: (board) => board.reduce((a, z) => a + z.reduce((a, y) => a + y.filter(c => c === '#')),0,0).length,
	count: (board) => {
		let c = 0
		for (let z = 1; z < P3.D.z - 1; z++)
			for (let y = 1; y < P3.D.y - 1; y++)
				for (let x = 1; x < P3.D.x - 1; x++)
					if (board[z][y][x] === '#')
						c++
		return c
	},

	renderstep: (counter, transposer) => {
		P3.stepN++
        P3.step(P3.board, counter, transposer)
        const count = P3.count(P3.board[0])
        //console.log(P3.stepN + ' ' + count)
        return count
	},

	part_step: () => P3.renderstep(P3.adjacentCount, (s, c) =>
		s === '#' && (c < 2 || c > 3)
			? '.'
			: (
				c === 3
					? '#'
					: s
			)
	),

	run: T => {
		const p = P3.prep(T)
		let board = P3.populate(22, p)
		P3.orig = board
		P3.D = {
			z: board.length - 2,
			y: board[0].length - 2,
			x: board[0][0].length - 2
		}
		P3.board = [P3.clone(P3.orig), P3.clone(P3.orig)]
		P3.stepN = 0
        let count = 0
        for (let i=0; i<6; i++)
            count = P3.part_step()
        return count
    }

}

const P4 = {

	prepEmpty: d => {
		const za = new Array(d + 2)
		for (let z = 0; z < d + 2; z++) {
			const ya = new Array(d + 2)
			za[z] = ya
			for (let y = 0; y < d + 2; y++) {
                const xa = new Array(d + 2)
                ya[y] = xa
                for (let x = 0; x < d + 2; x++) {
                    xa[x] = new Array(d + 2).fill('.')
                }
			}
		}
		return za
	},

	populate: (dim, p) => {
		const board = P4.prepEmpty(dim)
		const z0 = (dim >> 1) + 1
		const o = z0 - (p.length >> 1)
		for (let y = 0; y < p.length; y++) {
			for (let x = 0; x < p.length; x++) {
				board[z0][o + y][o + x][z0] = p[y][x]
			}
		}
		return board
	},

	prep: T => T.split('\n'),

	adjacentCount: (p, z, y, x, w) =>
        (p[z - 1][y - 1][x - 1][w - 1] === '#' ? 1 : 0) +
        (p[z - 1][y - 1][x    ][w - 1] === '#' ? 1 : 0) +
        (p[z - 1][y - 1][x + 1][w - 1] === '#' ? 1 : 0) +
        (p[z - 1][y    ][x - 1][w - 1] === '#' ? 1 : 0) +
        (p[z - 1][y    ][x    ][w - 1] === '#' ? 1 : 0) +
        (p[z - 1][y    ][x + 1][w - 1] === '#' ? 1 : 0) +
        (p[z - 1][y + 1][x - 1][w - 1] === '#' ? 1 : 0) +
        (p[z - 1][y + 1][x    ][w - 1] === '#' ? 1 : 0) +
        (p[z - 1][y + 1][x + 1][w - 1] === '#' ? 1 : 0) +
        (p[z    ][y - 1][x - 1][w - 1] === '#' ? 1 : 0) +
        (p[z    ][y - 1][x    ][w - 1] === '#' ? 1 : 0) +
        (p[z    ][y - 1][x + 1][w - 1] === '#' ? 1 : 0) +
        (p[z    ][y    ][x - 1][w - 1] === '#' ? 1 : 0) +
        (p[z    ][y    ][x    ][w - 1] === '#' ? 1 : 0) +
        (p[z    ][y    ][x + 1][w - 1] === '#' ? 1 : 0) +
        (p[z    ][y + 1][x - 1][w - 1] === '#' ? 1 : 0) +
        (p[z    ][y + 1][x    ][w - 1] === '#' ? 1 : 0) +
        (p[z    ][y + 1][x + 1][w - 1] === '#' ? 1 : 0) +
        (p[z + 1][y - 1][x - 1][w - 1] === '#' ? 1 : 0) +
        (p[z + 1][y - 1][x    ][w - 1] === '#' ? 1 : 0) +
        (p[z + 1][y - 1][x + 1][w - 1] === '#' ? 1 : 0) +
        (p[z + 1][y    ][x - 1][w - 1] === '#' ? 1 : 0) +
        (p[z + 1][y    ][x    ][w - 1] === '#' ? 1 : 0) +
        (p[z + 1][y    ][x + 1][w - 1] === '#' ? 1 : 0) +
        (p[z + 1][y + 1][x - 1][w - 1] === '#' ? 1 : 0) +
        (p[z + 1][y + 1][x    ][w - 1] === '#' ? 1 : 0) +
        (p[z + 1][y + 1][x + 1][w - 1] === '#' ? 1 : 0) + 

        (p[z - 1][y - 1][x - 1][w    ] === '#' ? 1 : 0) +
        (p[z - 1][y - 1][x    ][w    ] === '#' ? 1 : 0) +
        (p[z - 1][y - 1][x + 1][w    ] === '#' ? 1 : 0) +
        (p[z - 1][y    ][x - 1][w    ] === '#' ? 1 : 0) +
        (p[z - 1][y    ][x    ][w    ] === '#' ? 1 : 0) +
        (p[z - 1][y    ][x + 1][w    ] === '#' ? 1 : 0) +
        (p[z - 1][y + 1][x - 1][w    ] === '#' ? 1 : 0) +
        (p[z - 1][y + 1][x    ][w    ] === '#' ? 1 : 0) +
        (p[z - 1][y + 1][x + 1][w    ] === '#' ? 1 : 0) +
        (p[z    ][y - 1][x - 1][w    ] === '#' ? 1 : 0) +
        (p[z    ][y - 1][x    ][w    ] === '#' ? 1 : 0) +
        (p[z    ][y - 1][x + 1][w    ] === '#' ? 1 : 0) +
        (p[z    ][y    ][x - 1][w    ] === '#' ? 1 : 0) +
        //(p[z    ][y    ][x    ][w    ] === '#' ? 1 : 0) +
        (p[z    ][y    ][x + 1][w    ] === '#' ? 1 : 0) +
        (p[z    ][y + 1][x - 1][w    ] === '#' ? 1 : 0) +
        (p[z    ][y + 1][x    ][w    ] === '#' ? 1 : 0) +
        (p[z    ][y + 1][x + 1][w    ] === '#' ? 1 : 0) +
        (p[z + 1][y - 1][x - 1][w    ] === '#' ? 1 : 0) +
        (p[z + 1][y - 1][x    ][w    ] === '#' ? 1 : 0) +
        (p[z + 1][y - 1][x + 1][w    ] === '#' ? 1 : 0) +
        (p[z + 1][y    ][x - 1][w    ] === '#' ? 1 : 0) +
        (p[z + 1][y    ][x    ][w    ] === '#' ? 1 : 0) +
        (p[z + 1][y    ][x + 1][w    ] === '#' ? 1 : 0) +
        (p[z + 1][y + 1][x - 1][w    ] === '#' ? 1 : 0) +
        (p[z + 1][y + 1][x    ][w    ] === '#' ? 1 : 0) +
        (p[z + 1][y + 1][x + 1][w    ] === '#' ? 1 : 0) + 

        (p[z - 1][y - 1][x - 1][w + 1] === '#' ? 1 : 0) +
        (p[z - 1][y - 1][x    ][w + 1] === '#' ? 1 : 0) +
        (p[z - 1][y - 1][x + 1][w + 1] === '#' ? 1 : 0) +
        (p[z - 1][y    ][x - 1][w + 1] === '#' ? 1 : 0) +
        (p[z - 1][y    ][x    ][w + 1] === '#' ? 1 : 0) +
        (p[z - 1][y    ][x + 1][w + 1] === '#' ? 1 : 0) +
        (p[z - 1][y + 1][x - 1][w + 1] === '#' ? 1 : 0) +
        (p[z - 1][y + 1][x    ][w + 1] === '#' ? 1 : 0) +
        (p[z - 1][y + 1][x + 1][w + 1] === '#' ? 1 : 0) +
        (p[z    ][y - 1][x - 1][w + 1] === '#' ? 1 : 0) +
        (p[z    ][y - 1][x    ][w + 1] === '#' ? 1 : 0) +
        (p[z    ][y - 1][x + 1][w + 1] === '#' ? 1 : 0) +
        (p[z    ][y    ][x - 1][w + 1] === '#' ? 1 : 0) +
        (p[z    ][y    ][x    ][w + 1] === '#' ? 1 : 0) +
        (p[z    ][y    ][x + 1][w + 1] === '#' ? 1 : 0) +
        (p[z    ][y + 1][x - 1][w + 1] === '#' ? 1 : 0) +
        (p[z    ][y + 1][x    ][w + 1] === '#' ? 1 : 0) +
        (p[z    ][y + 1][x + 1][w + 1] === '#' ? 1 : 0) +
        (p[z + 1][y - 1][x - 1][w + 1] === '#' ? 1 : 0) +
        (p[z + 1][y - 1][x    ][w + 1] === '#' ? 1 : 0) +
        (p[z + 1][y - 1][x + 1][w + 1] === '#' ? 1 : 0) +
        (p[z + 1][y    ][x - 1][w + 1] === '#' ? 1 : 0) +
        (p[z + 1][y    ][x    ][w + 1] === '#' ? 1 : 0) +
        (p[z + 1][y    ][x + 1][w + 1] === '#' ? 1 : 0) +
        (p[z + 1][y + 1][x - 1][w + 1] === '#' ? 1 : 0) +
        (p[z + 1][y + 1][x    ][w + 1] === '#' ? 1 : 0) +
        (p[z + 1][y + 1][x + 1][w + 1] === '#' ? 1 : 0),

	step: (board, counter, transposer) => {
		board.push(board.shift())
		const p = board[0]
		const p1 = board[1]
		for (let z = 1; z < P4.D.z - 1; z++)
			for (let y = 1; y < P4.D.y - 1; y++)
				for (let x = 1; x < P4.D.x - 1; x++)
	    			for (let w = 1; w < P4.D.w - 1; w++)
					    p[z][y][x][w] = transposer(p1[z][y][x][w], counter(p1, z, y, x, w))
	},

	clone: (z) => z.slice().map(y => y.slice().map(x => x.slice().map(w => w.slice()))),

	//countx: (board) => board.reduce((a, z) => a + z.reduce((a, y) => a + y.filter(c => c === '#')),0,0).length,
	count: (board) => {
		let c = 0
		for (let z = 1; z < P4.D.z - 1; z++)
			for (let y = 1; y < P4.D.y - 1; y++)
				for (let x = 1; x < P4.D.x - 1; x++)
    				for (let w = 1; w < P4.D.w - 1; w++)
					    if (board[z][y][x][w] === '#')
					    	c++
		return c
	},

	renderstep: (counter, transposer) => {
		P4.stepN++
        P4.step(P4.board, counter, transposer)
        const count = P4.count(P4.board[0])
        //console.log(P4.stepN + ' ' + count)
        return count
	},

	part_2_step: () => P4.renderstep(P4.adjacentCount, (s, c) =>
		s === '#' && (c < 2 || c > 3)
			? '.'
			: (
				c === 3
					? '#'
					: s
			)
	),

    run: T => {
        const p = P4.prep(T)
        let board = P4.populate(22, p)
        P4.orig = board
        P4.D = {
            z: board.length - 2,
            y: board[0].length - 2,
            x: board[0][0].length - 2,
            w: board[0][0][0].length - 2
        }
        P4.board = [P4.clone(P4.orig), P4.clone(P4.orig)]
        P4.stepN = 0
        let count = 0
        for (let i=0; i<6; i++)
            count = P4.part_2_step()
        return count
    }

}

const P = {
    part_1: T => P3.run(T),
    part_2: T => P4.run(T)
}

exports.puzzle = P

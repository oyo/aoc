const P = {

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
		for (let z = 1; z < P.D.z - 1; z++)
			for (let y = 1; y < P.D.y - 1; y++)
				for (let x = 1; x < P.D.x - 1; x++)
					p[z][y][x] = transposer(p1[z][y][x], counter(p1, z, y, x))
	},

	clone: (board) => board.slice().map(y => y.slice().map(x => x.slice())),

	//countx: (board) => board.reduce((a, z) => a + z.reduce((a, y) => a + y.filter(c => c === '#')),0,0).length,
	count: (board) => {
		let c = 0
		for (let z = 1; z < P.D.z - 1; z++)
			for (let y = 1; y < P.D.y - 1; y++)
				for (let x = 1; x < P.D.x - 1; x++)
					if (board[z][y][x] === '#')
						c++
		return c
	},

	renderstep: (counter, transposer) => {
		P.stepN++
        P.step(P.board, counter, transposer)
        const count = P.count(P.board[0])
        console.log(P.stepN + ' ' + count)
        return count
	},

	part_1_step: () => P.renderstep(P.adjacentCount, (s, c) =>
		s === '#' && (c < 2 || c > 3)
			? '.'
			: (
				c === 3
					? '#'
					: s
			)
	),

	part_1: T => {
		const p = P.prep(T)
		let board = P.populate(60, p)
		P.orig = board
		P.D = {
			z: board.length - 2,
			y: board[0].length - 2,
			x: board[0][0].length - 2
		}
		P.board = [P.clone(P.orig), P.clone(P.orig)]
		P.stepN = 0
        let count = 0
        for (let i=0; i<6; i++)
            count = P.part_1_step()
        return count
    },

    part_2: T => {
        const p = P.prep(T)
        let board = P.populate(60, p)
        P.orig = board
        P.D = {
            z: board.length - 2,
            y: board[0].length - 2,
            x: board[0][0].length - 2,
            w: board[0][0][0].length - 2
        }
        P.board = [P.clone(P.orig), P.clone(P.orig)]
        P.stepN = 0
        let count = 0
        for (let i=0; i<6; i++)
            count = P.part_1_step()
        return count
    }

}

exports.puzzle = P

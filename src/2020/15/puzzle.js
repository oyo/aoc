const P = {

	run: (T, n) => {
		const p = T.split(',')
		const mem = new Array(30000000)
		const process = (number, index) => {
			const first = mem[number] === undefined
			const seen = mem[number]
			mem[number] = index
			return first ? 0 : index - seen
		}
		let last = 0
		for (let i = 0; i < p.length; i++)
			last = process(p[i], i)
		for (let i = p.length; i < n - 1; i++)
			last = process(last, i)
		return last
	},

	part_1: T => P.run(T, 2020),

	part_2: T => P.run(T, 30000000)

}

exports.puzzle = P

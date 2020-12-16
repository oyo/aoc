const P = {

    run: (T, n) => {
	const input = T.split(',')
	const record = new Array(30000000)
	const process = (number, index) => {
		const first = record[number] === undefined
		const seen = record[number]
		record[number] = index
		return first ? 0 : index - seen
	}
	let last = 0
	for (let i = 0; i < input.length; i++)
		last = process(input[i], i)
	for (let i = input.length; i < n - 1; i++)
		last = process(last, i)
        return last
    },

    part_1: T => P.run(T, 2020),

    part_2: T => P.run(T, 30000000)

}

exports.puzzle = P

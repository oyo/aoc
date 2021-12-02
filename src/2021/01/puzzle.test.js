const { puzzle } = require('./puzzle')

const INPUT =
`199
200
208
210
200
207
240
269
260
263`

it('solves part_1', () => expect(puzzle.part_1(INPUT)).toEqual(7))

it('solves part_2', () => expect(puzzle.part_2(INPUT)).toEqual(5))

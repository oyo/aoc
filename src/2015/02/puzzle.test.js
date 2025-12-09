const { puzzle } = require('./puzzle.js')

const INPUT = 
`2x3x4
1x1x10`

it ('solves part_1', () => expect(puzzle.part_1(INPUT)).toEqual(58+43))

it ('solves part_2', () => expect(puzzle.part_2(INPUT)).toEqual(34+14))

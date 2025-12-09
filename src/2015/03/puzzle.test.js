const { puzzle } = require('./puzzle.js')

const INPUT = '^v^v^v^v^v'

it ('solves part_1', () => expect(puzzle.part_1(INPUT)).toEqual(2))

it ('solves part_2', () => expect(puzzle.part_2(INPUT)).toEqual(11))

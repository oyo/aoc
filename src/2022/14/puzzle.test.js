const { puzzle } = require('./puzzle')

const INPUT = 
`498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`

it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(24))

it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(93))

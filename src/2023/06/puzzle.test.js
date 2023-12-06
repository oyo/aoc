const { puzzle } = require('./puzzle')

const INPUT = 
`Time:      7  15   30
Distance:  9  40  200`

it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(288))

it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(71503))

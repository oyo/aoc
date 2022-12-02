const { puzzle } = require('./puzzle')

const INPUT = 
`A Y
B X
C Z`

it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(15))

it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(12))

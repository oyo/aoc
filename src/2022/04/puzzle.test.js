const { puzzle } = require('./puzzle')

const INPUT = 
`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(2))

it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(4))

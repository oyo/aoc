const { puzzle } = require('./puzzle')

const INPUT = 
`3   4
4   3
2   5
1   3
3   9
3   3`

it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(11))

it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(31))

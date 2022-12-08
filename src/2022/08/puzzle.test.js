const { puzzle } = require('./puzzle')

const INPUT = 
`30373
25512
65332
33549
35390`

it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(21))

it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(8))

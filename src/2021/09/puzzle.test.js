const { puzzle } = require('./puzzle')

const INPUT = 
`2199943210
3987894921
9856789892
8767896789
9899965678`

it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(15))

it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(1134))

const { puzzle } = require('./puzzle')

const INPUT = 
`7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`

it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(2))

//it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(2))

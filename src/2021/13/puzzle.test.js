const { puzzle } = require('./puzzle')

const INPUT = 
`6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`

it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(17))

//it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(2))

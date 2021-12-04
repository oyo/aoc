const { puzzle } = require('./puzzle')

const INPUT = 
`turn on 4,0 through 5,0
turn on 3,1 through 6,1
turn on 2,2 through 7,2
turn on 1,3 through 8,3
turn on 0,4 through 9,4,
turn on 3,7 through 6,9
turn off 4,1 through 5,8
toggle 3,6 through 6,9`

it('solves 1', () => expect(puzzle.dim(10).part_1(INPUT)).toEqual(30))

it('solves 2', () => expect(puzzle.dim(10).part_2(INPUT)).toEqual(62))

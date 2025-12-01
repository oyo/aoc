const { puzzle } = require('./puzzle')

const INPUT = 
`L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`

it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(3))

it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(6))

const { puzzle } = require('./puzzle')

const INPUT = 
`00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`

it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(198))

it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(230))

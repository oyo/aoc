const { puzzle } = require('./puzzle')

const INPUT = 
`3-5
10-14
16-20
12-18

1
5
8
11
17
32`

it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(3))

it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(14))

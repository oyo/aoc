const { puzzle } = require('./puzzle')

const INPUT = 
`1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(24000))

it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(45000))

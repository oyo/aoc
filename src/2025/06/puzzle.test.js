const { puzzle } = require('./puzzle')

const INPUT = 
`123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  
`

it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(4277556))

it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(3263827))

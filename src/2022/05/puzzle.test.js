const { puzzle } = require('./puzzle')

const INPUT = 
`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual('CMZ'))

it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual('MCD'))

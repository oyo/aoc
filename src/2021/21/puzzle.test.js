const { puzzle } = require('./puzzle')

const INPUT = 
`Player 1 starting position: 4
Player 2 starting position: 8`

it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(739785))

//it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(444356092776315))

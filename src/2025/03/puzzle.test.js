const { puzzle } = require('./puzzle')

const INPUT = 
`987654321111111
811111111111119
234234234234278
818181911112111`

it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(357))

it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(3121910778619))

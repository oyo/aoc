const { puzzle } = require('./puzzle')

const INPUT = 
`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`

it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(6440))

it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(5905))

const { puzzle } = require('./puzzle')

const INPUT = 
`Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`

it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(31))

//it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(2))

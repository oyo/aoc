const { puzzle } = require('./puzzle')

const INPUT = 
`..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`

it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(13))

it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(43))

const { puzzle } = require('./puzzle')

const INPUT = `3,4,3,1,2`

it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(5934))

it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(26984457539))

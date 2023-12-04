const { puzzle } = require('./puzzle')

const INPUT = 
`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

//it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(4361))

it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(467835))

const { puzzle } = require('./puzzle')

const INPUT =
`7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`

it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(50))

it('calculates intersections', () => {
  expect(puzzle.checkIntersect([1, 1], [4, 4], [2, 2], [2, 5])).toEqual(true)
  expect(puzzle.checkIntersect([1, 1], [4, 4], [5, 2], [2, 2])).toEqual(true)
  expect(puzzle.checkIntersect([1, 1], [4, 4], [3, 0], [3, 5])).toEqual(true)
  expect(puzzle.checkIntersect([1, 1], [4, 4], [2, 2], [3, 3])).toEqual(true)
  expect(puzzle.checkIntersect([1, 1], [4, 4], [0, 0], [0, 5])).toEqual(false)
  expect(puzzle.checkIntersect([1, 1], [4, 4], [0, 0], [5, 0])).toEqual(false)
})

it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(24))

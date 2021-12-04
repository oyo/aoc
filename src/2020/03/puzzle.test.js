const { puzzle } = require('./puzzle.js')

const INPUT =
`..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`

it ('solves slope', () => {
    expect(puzzle.slope(INPUT.split('\n'),[7,1])).toEqual(4)
})

it ('solves part_1', () => {
    expect(puzzle.part_1(INPUT)).toEqual(7)
})

it ('solves part_2', () => {
    expect(puzzle.part_2(INPUT)).toEqual(336)
})

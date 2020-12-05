const { puzzle } = require('./puzzle.js')

it ('solves part_1', () => {
    expect(puzzle.matches_1(111111)).toBe(true)
    expect(puzzle.matches_1(223450)).toBe(false)
    expect(puzzle.matches_1(123789)).toBe(false)
})

it ('solves part_2', () => {
    //expect(puzzle.part_2('eins\nzwei')).toEqual(2)
})

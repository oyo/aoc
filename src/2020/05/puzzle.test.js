const { puzzle } = require('./puzzle.js')

it ('solves day 5', () => {
    expect(puzzle.part_1('BFFFBBFRRR')).toEqual(567)
    expect(puzzle.part_1('FFFBBBFRRR\nBBFFBBFRLL')).toEqual(820)
})

it ('solves part_2', () => {
    expect(puzzle.part_2('BBFFBBFRLL\nBBFFBBFRRL')).toEqual(821)
})

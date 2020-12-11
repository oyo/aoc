const { puzzle } = require('./puzzle')

const INPUT = [
    'L.LL.LL.LL',
    'LLLLLLL.LL',
    'L.L.L..L..',
    'LLLL.LL.LL',
    'L.LL.LL.LL',
    'L.LLLLL.LL',
    '..L.L.....',
    'LLLLLLLLLL',
    'L.LLLLLL.L',
    'L.LLLLL.LL',
].join('\n')

it ('solves part_1', () => {
    expect(puzzle.part_1(INPUT)).toEqual(37)
})

it ('solves part_2', () => {
    expect(puzzle.part_2(INPUT)).toEqual(26)
})

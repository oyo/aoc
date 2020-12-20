const { puzzle } = require('./puzzle')

const INPUT = [
    'Tile 1234:',
    '##########',
    '#....#....',
    '#....##...',
    '#.##..###.',
    '#.......#.',
    '.#........',
    '.......#..',
    '.##.....#.',
    '.####.....',
    '.#########',
].join('\n')

const BORDERS      = [1023, 513, 1022, 31]
const BORDERS_ROT  = [513, 1022, 31, 1023]
const BORDERS_FLIP = [1023, 992, 511, 513]

it ('prepares input', () => {
    expect(puzzle.prep(INPUT)).toEqual([['1234', BORDERS]])
})

it ('rotates correctly', () => {
    expect(puzzle.rotate(BORDERS.slice())).toEqual(BORDERS_ROT)
})

it ('flips correctly', () => {
    expect(puzzle.flip(BORDERS.slice())).toEqual(BORDERS_FLIP)
})

it ('solves part_1', () => {
    expect(puzzle.part_1(INPUT)).toEqual(1234)
})

it ('solves part_2', () => {
    //expect(puzzle.part_2(INPUT)).toEqual(2)
})

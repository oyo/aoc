const { puzzle } = require('./puzzle.js')

const INPUT=[
    'abc',
    '',
    'a',
    'b',
    'c',
    '',
    'ab',
    'ac',
    '',
    'a',
    'a',
    'a',
    'a',
    '',
    'b'
].join('\n')

it ('solves part_1', () => {
    expect(puzzle.part_1(INPUT)).toEqual(11)
})

it ('solves part_2', () => {
    expect(puzzle.part_2(INPUT)).toEqual(6)
})

const { puzzle } = require('./puzzle')

const INPUT = [
'F10',
'N3',
'F7',
'R90',
'F11',
].join('\n')

it ('solves part_1', () => {
    expect(puzzle.part_1(INPUT)).toEqual(25)
})

it ('solves part_2', () => {
    expect(puzzle.part_2(INPUT)).toEqual(286)
})

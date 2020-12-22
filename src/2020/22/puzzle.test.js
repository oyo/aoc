const { puzzle } = require('./puzzle')

const INPUT = [
    'Player 1:',
    '9',
    '2',
    '6',
    '3',
    '1',
    '',
    'Player 2:',
    '5',
    '8',
    '4',
    '7',
    '10',
].join('\n')

it ('solves part_1', () => {
    expect(puzzle.part_1(INPUT)).toEqual(306)
})

it ('solves part_2', () => {
    expect(puzzle.part_2(INPUT)).toEqual(291)
})

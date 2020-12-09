const { puzzle } = require('./puzzle')

const INPUT = [
    '35',
    '20',
    '15',
    '25',
    '47',
    '40',
    '62',
    '55',
    '65',
    '95',
    '102',
    '117',
    '150',
    '182',
    '127',
    '219',
    '299',
    '277',
    '309',
    '576',
].join('\n')

it ('solves part_1', () => {
    expect(puzzle.check(puzzle.prep(INPUT),5)).toEqual(127)
})

it ('solves part_2', () => {
    expect(puzzle.check2(puzzle.prep(INPUT),127)).toEqual(62)
})

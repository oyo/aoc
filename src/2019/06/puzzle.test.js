const { puzzle } = require('./puzzle.js')

const INPUT = [
    'COM)B',
    'B)C',
    'C)D',
    'D)E',
    'E)F',
    'B)G',
    'G)H',
    'D)I',
    'E)J',
    'J)K',
    'K)L',
].join('\n')

const INPUT_2 = [
    INPUT,
    'K)YOU',
    'I)SAN',
].join('\n')

it ('solves part_1', () => {
    expect(puzzle.part_1(INPUT)).toEqual(42)
})

it ('solves part_2', () => {
    expect(puzzle.part_2(INPUT_2)).toEqual(4)
})

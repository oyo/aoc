const { puzzle } = require('./puzzle')

const INPUT = [
    'forward 5',
    'down 5',
    'forward 8',
    'up 3',
    'down 8',
    'forward 2'
].join('\n')

it('solves part_1', () => expect(puzzle.part_1(INPUT)).toEqual(
    150
))

it('solves part_2', () => expect(puzzle.part_2(INPUT)).toEqual(
    900
))

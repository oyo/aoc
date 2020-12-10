const { puzzle } = require('./puzzle')

const INPUT = [
    '16',
    '10',
    '15',
    '5',
    '1',
    '11',
    '7',
    '19',
    '6',
    '12',
    '4'
].join('\n')

const INPUT_2 = [
    '28',
    '33',
    '18',
    '42',
    '31',
    '14',
    '46',
    '20',
    '48',
    '47',
    '24',
    '23',
    '49',
    '45',
    '19',
    '38',
    '39',
    '11',
    '1',
    '32',
    '25',
    '35',
    '8',
    '17',
    '7',
    '9',
    '4',
    '2',
    '34',
    '10',
    '3',
].join('\n')

it('solves part_1', () => {
    expect(puzzle.part_1(INPUT)).toEqual(35)
})

it('solves part_2', () => {
    expect(puzzle.part_2(INPUT_2)).toEqual(19208)
})

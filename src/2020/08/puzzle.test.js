const { puzzle } = require('./puzzle')

const INPUT = [
'nop +0',
'acc +1',
'jmp +4',
'acc +3',
'jmp -3',
'acc -99',
'acc +1',
'jmp -4',
'acc +6',
].join('\n')

it ('solves part_1', () => {
    expect(puzzle.part_1(INPUT)).toEqual(5)
})

it ('solves part_2', () => {
    expect(puzzle.part_2(INPUT)).toEqual(8)
})

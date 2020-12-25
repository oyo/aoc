const { puzzle } = require('./puzzle')

const INPUT = [
    '5764801',
    '17807724'
].join('\n')

it ('calculates the loop size', () => {
    expect(puzzle.loops(5764801)).toEqual(8)
    expect(puzzle.loops(17807724)).toEqual(11)
})

it ('calculates the encryption key', () => {
    expect(puzzle.key(5764801,11)).toEqual(14897079)
    expect(puzzle.key(17807724,8)).toEqual(14897079)
})

it ('solves part_1', () => {
    expect(puzzle.part_1(INPUT)).toEqual(14897079)
})

it ('solves part_2', () => {
    expect(puzzle.part_2(INPUT)).toEqual(0)
})

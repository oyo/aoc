const { puzzle } = require('./puzzle.js');

it ('calculates paper', () => {
    expect(puzzle.getPaper([2,3,4])).toEqual(58)
})

it ('calculates ribbon', () => {
    expect(puzzle.getRibbon([20,3,11])).toEqual(688)
    expect(puzzle.getRibbon([2,3,4])).toEqual(34)
    expect(puzzle.getRibbon([1,1,10])).toEqual(14)
})

it ('solves part_2', () => {
    expect(puzzle.part_2("2x3x4\n1x1x10")).toEqual(48)
})

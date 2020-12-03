const { puzzle } = require('./puzzle.js');

it ('calculates paper', () => {
    expect(puzzle.paper([2,3,4])).toEqual(58)
})

it ('calculates ribbon', () => {
    expect(puzzle.ribbon([20,3,11])).toEqual(688)
    expect(puzzle.ribbon([2,3,4])).toEqual(34)
    expect(puzzle.ribbon([1,1,10])).toEqual(14)
})

it ('solves part_2', () => {
    expect(puzzle.part_2("2x3x4\n1x1x10")).toEqual(48)
})

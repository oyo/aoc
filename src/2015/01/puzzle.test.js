const { puzzle } = require('./puzzle.js');

it ('solves part_1', () => {
    expect(puzzle.part_1('(')).toEqual(1)
    expect(puzzle.part_1(')')).toEqual(-1)
    expect(puzzle.part_1('()()')).toEqual(0)
    expect(puzzle.part_1('((())(()(')).toEqual(3)
})

it ('solves part_2', () => {
    expect(puzzle.part_2(')')).toEqual(1)
    expect(puzzle.part_2('()))')).toEqual(3)
    expect(puzzle.part_2('((())()))))((')).toEqual(9)
})

const { puzzle } = require('./puzzle.js');

it ('solves part_1', () => {
    expect(puzzle.part_1('abcdef')).toEqual(609043)
    expect(puzzle.part_1('pqrstuv')).toEqual(1048970)
})

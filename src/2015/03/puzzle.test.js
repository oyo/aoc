const { puzzle } = require('./puzzle.js');

it ('solves part_1', () => {
    expect(puzzle.part_1('^v^v^v^v^v')).toEqual(2)
})

it ('solves part_2', () => {
    expect(puzzle.part_2('^v^v^v^v^v')).toEqual(11)
})

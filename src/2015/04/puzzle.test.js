const { puzzle } = require('./puzzle.js');

it ('solves part_1', () => {
    expect(puzzle.part_1('abcdef609043').substring(0,5)).toEqual('00000')
    expect(puzzle.part_1('pqrstuv1048970').substring(0,5)).toEqual('00000')
})

const { puzzle } = require('./puzzle.js')

it ('solves part_1', () => {
    expect(puzzle.part_1('1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc')).toEqual(2)
})

it ('solves part_2', () => {
    expect(puzzle.part_2('1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc')).toEqual(1)
})

const { puzzle } = require('./puzzle.js')

it ('solves part_1', () => {
    expect(puzzle.part_1('1\n2019')).toEqual(2019)
    expect(puzzle.part_1('3\n1010\n355\n1010\n89')).toEqual(1020100)
})

it ('solves part_2', () => {
    expect(puzzle.part_2('1\n1\n2018')).toEqual(2018)
    expect(puzzle.part_2('3\n1000\n355\n1000\n89\n20')).toEqual(20000000)
})

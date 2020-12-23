const { puzzle } = require('./puzzle')

INPUT = '389125467'

it ('runs example', () => {
    expect(puzzle.output(puzzle.run(INPUT, 9, 10))).toEqual(92658374)
})

it ('solves part_1', () => {
    expect(puzzle.part_1(INPUT)).toEqual(67384529)
})

it ('solves part_2', () => {
    //expect(puzzle.part_2(INPUT)).toEqual(149245887792)
})

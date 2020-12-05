const { puzzle } = require('./puzzle.js')

const INPUT_1 = [
    'R75,D30,R83,U83,L12,D49,R71,U7,L72',
    'U62,R66,U55,R34,D71,R55,D58,R83'
].join('\n')

const INPUT_2 = [
    'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
    'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
].join('\n')

it ('solves part_1', () => {
    expect(puzzle.part_1(INPUT_1)).toEqual(159)
    expect(puzzle.part_1(INPUT_2)).toEqual(135)
})

it ('solves part_2', () => {
    expect(puzzle.part_2(INPUT_1)).toEqual(610)
    expect(puzzle.part_2(INPUT_2)).toEqual(410)
})

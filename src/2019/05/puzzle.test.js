const { puzzle } = require('./puzzle.js')

it ('parses operation', () => {
    expect(puzzle.op(1002)).toEqual({o:2,m:[false,true]})
})

it ('solves part_2', () => {
    expect(puzzle.run([3,9,8,9,10,9,4,9,99,-1,8],[8])).toEqual([1])
    expect(puzzle.run([3,9,8,9,10,9,4,9,99,-1,8],[2])).toEqual([0])
    expect(puzzle.run([3,9,7,9,10,9,4,9,99,-1,8],[8])).toEqual([0])
    expect(puzzle.run([3,9,7,9,10,9,4,9,99,-1,8],[2])).toEqual([1])
})

const { puzzle } = require('./puzzle')

const INPUT2 = 
`19
11`

const INPUT3 = 
`119
919
911`

const INPUT5 = 
`11111
99991
11111
19999
11111`

const INPUT = 
`1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`

it('solves 1', () => {
    expect(puzzle.part_1(INPUT2)).toEqual(2)
    expect(puzzle.part_1(INPUT3)).toEqual(4)
    expect(puzzle.part_1(INPUT5)).toEqual(16)
    expect(puzzle.part_1(INPUT)).toEqual(40)
})

it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(315))

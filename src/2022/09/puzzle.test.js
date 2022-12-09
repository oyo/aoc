const { puzzle } = require('./puzzle')

const INPUT = 
`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

const INPUT_2 = 
`R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`


it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(13))

it('solves 2', () => {
    expect(puzzle.part_2(INPUT)).toEqual(1)
    expect(puzzle.part_2(INPUT_2)).toEqual(36)
})
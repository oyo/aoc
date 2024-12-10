const { puzzle } = require('./puzzle')

const INPUT = 
`1110111
1111111
1112111
6543456
7111117
8111118
9111119`

const INPUT_1 =
`10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01`

const INPUT_2 = 
`89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`

it('solves 1', () => {
    expect(puzzle.part_1(INPUT)).toEqual(2)
    expect(puzzle.part_1(INPUT_1)).toEqual(3)
    expect(puzzle.part_1(INPUT_2)).toEqual(36)
})

it('solves 2', () => expect(puzzle.part_2(INPUT_2)).toEqual(81))

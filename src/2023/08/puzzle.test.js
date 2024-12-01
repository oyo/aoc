const { puzzle } = require('./puzzle')

const INPUTA =
`RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`

const INPUTB =
`LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`

const INPUT2 = 
`LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`

it('solves 1', () =>
    expect(puzzle.part_1(INPUTA)).toEqual(2) &&
    expect(puzzle.part_1(INPUTB)).toEqual(6)
)

//it('solves 2', () => expect(puzzle.part_2(INPUT2)).toEqual(6))

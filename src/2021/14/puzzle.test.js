const { puzzle } = require('./puzzle')

const INPUT = 
`NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`

//it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(1588))

it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(2188189693529))

const { puzzle } = require('./puzzle')

const INPUT1 = 
`start-A
start-b
A-c
A-b
b-d
A-end
b-end`

const INPUT2= 
`dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`

const INPUT3= 
`fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`

it('solves 1', () => {
    expect(puzzle.part_1(INPUT1)).toEqual(10)
    expect(puzzle.part_1(INPUT2)).toEqual(19)
    expect(puzzle.part_1(INPUT3)).toEqual(226)
})

it('solves 2', () => {
    expect(puzzle.part_2(INPUT1)).toEqual(36)
    expect(puzzle.part_2(INPUT2)).toEqual(103)
    expect(puzzle.part_2(INPUT3)).toEqual(3509)
})

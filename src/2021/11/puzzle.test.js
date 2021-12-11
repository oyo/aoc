require('./puzzle')

const INPUT =
`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`

const TEST1 = [
`11111
19991
19191
19991
11111`
,
`34543
40004
50005
40004
34543`
,
`45654
51115
61116
51115
45654`
]

it('steps', () => expect(P.doStep(P.prep(TEST1[0]))).toEqual(9))
it('steps', () => expect(P.doStep(P.prep(TEST1[1]))).toEqual(0))
it('solves 1', () => expect(P.part_1(INPUT)).toEqual(1656))
it('solves 2', () => expect(P.part_2(INPUT)).toEqual(195))

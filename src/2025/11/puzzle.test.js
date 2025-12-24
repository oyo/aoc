const { puzzle } = require('./puzzle')

const INPUT1 = 
`aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`

const INPUT2 = 
`svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`

it('solves 1', () => expect(puzzle.part_1(INPUT1)).toEqual(5))

it('solves 2', () => expect(puzzle.part_2(INPUT2)).toEqual(2))

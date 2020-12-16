const { puzzle } = require('./puzzle')

const MASK = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X'
const INPUT = [
    'mask = ' + MASK,
    'mem[8] = 11',
    'mem[7] = 101',
    'mem[8] = 0'
].join('\n')

const MASK_26 = '00000000000000000000000000000000X0XX'
const OUT_26 = [
    16n,
    17n,
    18n,
    19n,
    24n,
    25n,
    26n,
    27n,
].sort()

const INPUT_2 = [
    'mask = 000000000000000000000000000000X1001X',
    'mem[42] = 100',
    'mask = ' + MASK_26,
    'mem[26] = 1',
].join('\n')

it ('masks values', () => {
    expect(puzzle.value( 11, MASK)).toEqual( 73n)
    expect(puzzle.value(101, MASK)).toEqual(101n)
    expect(puzzle.value(  0, MASK)).toEqual( 64n)
})

it ('masks addresses', () => {
    expect(puzzle.addresses(26, MASK_26).sort()).toEqual(OUT_26)
})

it ('solves part_1', () => {
    expect(puzzle.part_1(INPUT)).toEqual(165)
})

it ('solves part_2', () => {
    expect(puzzle.part_2(INPUT_2)).toEqual(208)
})

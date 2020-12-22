const { tile } = require('./tile')
const T = tile

const INPUT = [
    'Tile 1111:',
    '....####..',
    '...#####..',
    '..######..',
    '.###.###..',
    '###..###..',
    '.....###..',
    '.....###..',
    '.....###..',
    '...#######',
    '...#######',
    '',
    'Tile 2222:',
    '....####..',
    '..########',
    '.###...###',
    '.###...###',
    '......###.',
    '.....###..',
    '....###...',
    '...###....',
    '.#########',
    '.#########',
    '',
    'Tile 1234:',
    '##########',
    '########..',
    '######....',
    '####......',
    '##........',
    '....##....',
    '....##....',
    '....##....',
    '..######..',
    '####..####',
].join('\n')

const BORDERS      = [1023, 513, 1022, 31]
const BORDERS_ROT  = [513, 1022, 31, 1023]
const BORDERS_FLIP = [1023, 992, 511, 513]

it ('creates tiles', () => {
    const tiles = T.fromText(INPUT)
    T.dump(tiles[0])
    T.dump(tiles[1])
    //T.dump(tiles[2])
    expect(tiles.length).toEqual(2)
    expect(tiles[0][0]).toEqual('1111')
    expect(tiles[1][0]).toEqual('1234')
})

/*
it ('rotates correctly', () => {
    expect(puzzle.rotate(BORDERS.slice())).toEqual(BORDERS_ROT)
})

it ('flips correctly', () => {
    expect(puzzle.flip(BORDERS.slice())).toEqual(BORDERS_FLIP)
})

it ('solves part_1', () => {
    expect(puzzle.part_1(INPUT)).toEqual(1234)
})

it ('solves part_2', () => {
    //expect(puzzle.part_2(INPUT)).toEqual(2)
})
*/
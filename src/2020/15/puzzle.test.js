const { puzzle } = require('./puzzle')

const TEST = {
    '0,3,6': 436,
    '1,3,2': 1,
    '2,1,3': 10,
    '1,2,3': 27,
    '2,3,1': 78,
    '3,2,1': 438,
    '3,1,2': 1836
}

it ('solves part_1', () => {
    Object.keys(TEST).forEach((a) => 
        expect(puzzle.part_1(a)).toEqual(TEST[a])
    )
})

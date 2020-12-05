const { puzzle } = require('./puzzle.js')

it ('solves fuel_1', () => {
    expect(puzzle.fuel_1(12)).toEqual(2)
    expect(puzzle.fuel_1(14)).toEqual(2)
    expect(puzzle.fuel_1(1969)).toEqual(654)
    expect(puzzle.fuel_1(100756)).toEqual(33583)
})

it ('solves fuel_2', () => {
    expect(puzzle.fuel_2(14)).toEqual(2)
    expect(puzzle.fuel_2(1969)).toEqual(966)
    expect(puzzle.fuel_2(100756)).toEqual(50346)
})

const { puzzle } = require('./puzzle')

const INPUT_1 = 
`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

const INPUT_2 = 
`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`

it('solves 1', () => expect(puzzle.part_1(INPUT_1)).toEqual(142))

it('solves 2', () => expect(puzzle.part_2(INPUT_2)).toEqual(281))

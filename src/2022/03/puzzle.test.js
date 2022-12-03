const { puzzle } = require('./puzzle')

const INPUT = 
`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

it('calcs prio', () => {
    expect(puzzle.prio('a')).toEqual(1)
    expect(puzzle.prio('z')).toEqual(26)
    expect(puzzle.prio('A')).toEqual(27)
    expect(puzzle.prio('Z')).toEqual(52)
})

it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(157))

it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(70))

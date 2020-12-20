const { puzzle } = require('./puzzle')

const INPUT = [
    '0: 4 1 5',
    '1: 2 3 | 3 2',
    '2: 4 4 | 5 5',
    '3: 4 5 | 5 4',
    '4: "a"',
    '5: "b"',
    '',
    'ababbb',
    'bababa',
    'abbbab',
    'aaabbb',
    'aaaabbb'
].join('\n')

const WORDS = {
    'ababbb': true,
    'bababa': false,
    'abbbab': true,
    'aaabbb': false,
    'aaaabbb': false
}

const REGEX = /^a((aa|bb)(ab|ba)|(ab|ba)(aa|bb))b$/

it ('matches regex', () => {
    Object.keys(WORDS).forEach(w =>
        expect(!!w.match(REGEX)).toEqual(WORDS[w])
    )
})

it ('solves part_1', () => {
    //expect(puzzle.part_1(INPUT)).toEqual(2)
})

it ('solves part_2', () => {
    //expect(puzzle.part_2(INPUT)).toEqual(2)
})

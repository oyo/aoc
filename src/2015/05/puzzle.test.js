const { puzzle } = require('./puzzle.js')

it ('finds nice', () => {
    expect(puzzle.nice('ugknbfddgicrmopn')).toBe(true)
    expect(puzzle.nice('aaa')).toBe(true)
    expect(puzzle.nice('jchzalrnumimnmhp')).toBe(false)
    expect(puzzle.nice('haegwjzuvuyypxyu')).toBe(false)
    expect(puzzle.nice('dvszwmarrgswjxmb')).toBe(false)
})

it ('finds nicer', () => {
    expect(puzzle.nicer('qjhvhtzxzqqjkmpb')).toBe(true)
    expect(puzzle.nicer('xxyxx')).toBe(true)
    expect(puzzle.nicer('uurcxstgmygtbstg')).toBe(false)
    expect(puzzle.nicer('ieodomkazucvgmuy')).toBe(false)
})


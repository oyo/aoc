const { puzzle } = require('./puzzle.js');

it ('finds nice', () => {
    expect(puzzle.isNice('ugknbfddgicrmopn')).toBe(true)
    expect(puzzle.isNice('aaa')).toBe(true)
    expect(puzzle.isNice('jchzalrnumimnmhp')).toBe(false)
    expect(puzzle.isNice('haegwjzuvuyypxyu')).toBe(false)
    expect(puzzle.isNice('dvszwmarrgswjxmb')).toBe(false)
})

it ('finds nicer', () => {
    expect(puzzle.isNicer('qjhvhtzxzqqjkmpb')).toBe(true)
    expect(puzzle.isNicer('xxyxx')).toBe(true)
    expect(puzzle.isNicer('uurcxstgmygtbstg')).toBe(false)
    expect(puzzle.isNicer('ieodomkazucvgmuy')).toBe(false)
})


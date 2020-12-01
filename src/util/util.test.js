const util = require('./util')

it ('derives a date from current day', () => {
    const today = new Date()
    const thisYear = today.getFullYear()
    const thisDay = today.getDate()
    const date = util.getAoCDate
    expect(date()).toEqual({ day: thisDay, year: thisYear })
    expect(date(25)).toEqual({ day: 25, year: thisYear })
    expect(date(1, 2015)).toEqual({ day: 1, year: 2015 })
})

it ('returns correct URL for day', () => {
    const url = util.getDailyURL
    const date = util.getAoCDate
    expect(url(date(1, 2015))).toBe('https://adventofcode.com/2015/day/1')
})

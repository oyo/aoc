const { puzzle } = require('./puzzle')

const INPUT = [
    'class: 1-3 or 5-7',
    'row: 6-11 or 33-44',
    'seat: 13-40 or 45-50',
    '',
    'your ticket:',
    '7,1,14',
    '',
    'nearby tickets:',
    '7,3,47',
    '40,4,50',
    '55,2,20',
    '38,6,12'    
].join('\n')


const INPUT_2 = [
    'class: 0-1 or 4-19',
    'departure row: 0-5 or 8-19',
    'departure seat: 0-13 or 16-19',
    '',
    'your ticket:',
    '11,12,13',
    '',
    'nearby tickets:',
    '3,9,18',
    '15,1,5',
    '5,14,9',
].join('\n')

it ('prepares input', () => {
    const p1 = puzzle.prep(INPUT)
    const p2 = puzzle.prep(INPUT_2)
    expect(p1.tickets.length).toEqual(4)
    expect(p2.tickets.length).toEqual(3)
})

it ('solves part_1', () => {
    expect(puzzle.part_1(INPUT)).toEqual(71)
})

it ('calculates matching indices', () => {
    const p = puzzle.prep(INPUT_2)
    expect(puzzle.matchIndex(p.rules[0], p.tickets)).toEqual([1,2])
    expect(puzzle.matchIndex(p.rules[1], p.tickets)).toEqual([0,1,2])
    expect(puzzle.matchIndex(p.rules[2], p.tickets)).toEqual([2])
})

it ('solves part_2', () => {
    expect(puzzle.part_2(INPUT_2)).toEqual(11*13)
})

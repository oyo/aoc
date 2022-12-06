const { puzzle } = require('./puzzle')

const INPUT = [
    ['mjqjpqmgbljsphdztnvjfqwrcgsmlb', 7, 19],
    ['bvwbjplbgvbhsrlpgdmjqwftvncz', 5, 23],
    ['nppdvjthqldpwncqszvftbrmjlhg', 6, 23],
    ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 10, 29],
    ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 11, 26],
]

it('solves 1', () => INPUT.forEach(m => expect(puzzle.part_1(m[0])).toEqual(m[1])))

it('solves 2', () => INPUT.forEach(m => expect(puzzle.part_2(m[0])).toEqual(m[2])))

const { puzzle } = require('./puzzle')

const INPUT = 
`[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`

const SCORES = {
    '])}>': 294,
    '}}]])})]': 288957,
    ')}>]})': 5566,
    '}}>}>))))': 1480781,
    ']]}}]}]}>': 995444,
}

it('solves 1', () => expect(puzzle.part_1(INPUT)).toEqual(26397))
it('calcs score', () => Object.entries(SCORES).forEach(e => expect(puzzle.score(e[0])).toEqual(e[1])))
it('solves 2', () => expect(puzzle.part_2(INPUT)).toEqual(288957))

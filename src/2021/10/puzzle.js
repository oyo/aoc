exports.puzzle = P = {

    prep: T => T.split('\n'),

    score1: {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
    },

    score: s => s.split('').reduce((o, c) => o * 5 + ' )]}>'.indexOf(c), 0),

    checkLine: l => {
        do {
            s = l.length
            l = l.replace(/(\[\]|\(\)|\<\>|\{\})/g, '')
        } while (l.length < s)
        return l;
    },

    part_1: T => P.prep(T)
        .map(l => P.checkLine(l).replace(/[\(\[\<\{]/g, ''))
        .filter(l => l.match(/[\)\]\>\}]/))
        .map(l => P.score1[l[0]])
        .reduce((a, b) => a + b),

    part_2: T => (r => r.map(l => P.score(
        l.split('').reduce((o, c) => ')]}>'['([{<'.indexOf(c)] + o, ''))
    ).sort((a, b) => a - b)[r.length >> 1]
    )(
        P.prep(T).map(l => P.checkLine(l)).filter(l => !l.match(/[\)\]\>\}]/))
    )

}

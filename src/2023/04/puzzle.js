const N = Number.parseInt

exports.puzzle = P = {

    prep: T => T.trim().split('\n').map(
        L => L.split(/(Card\s+\d+: | \| )/).filter(l => l.match(/^(\s*\d+\s*)+$/g)).map(n => n.trim().split(/\s+/g).map(n => N(n)))
    ),

    part_1: T => P.prep(T)
        .map(c => c.length === 2 ? c[0].filter(value => c[1].includes(value)) : [])
        .filter(r => r.length > 0)
        .reduce((a, c) => a + 2 ** (c.length - 1), 0),

    part_2: T => P.prep(T)

}

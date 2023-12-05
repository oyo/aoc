const N = Number.parseInt
const wins = c => c[0].filter(value => c[1].includes(value))

exports.puzzle = P = {

    prep: T => T.trim().split('\n').map(
        L => L.split(/(Card\s+\d+: | \| )/).filter(l => l.match(/^(\s*\d+\s*)+$/g)).map(n => n.trim().split(/\s+/g).map(n => N(n)))
    ),

    part_1: T => P.prep(T)
        .map(wins)
        .filter(r => r.length > 0)
        .reduce((a, c) => a + 2 ** (c.length - 1), 0),

    part_2: T => {
        const s = P.prep(T).map(c => c.concat([1]))
        for (let v = 0; v < s.length; v++) {
            const cards = wins(s[v]).length
            for (let vw = 1; vw <= cards; vw++) {
                s[v + vw][2] += s[v][2]
            }
            console.log(s.map(r => r[2]))
        }
        return s.reduce((a, c) => a + c[2], 0)
    }
}

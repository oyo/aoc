function* roll() {
    var v = 0;
    while (v < v + 1)
        yield v++ % 100 + 1;
}

exports.puzzle = P = {

    prep: T => T.split('\n').map(L => ({ s: 0, p: L.split(': ')[1] * 1 })),

    round: g => [0, 1, 2].reduce(s => s + g.next().value, 0),

    part_1: T => {
        const p = P.prep(T)
        const g = roll()
        let c = 0
        let r = 0
        while (p[0].s < 1000 && p[1].s < 1000) {
            p[c].p = (((p[c].p - 1) + P.round(g)) % 10) + 1
            p[c].s += p[c].p
            //console.log(`player ${c}: ${p[c].p} = ${p[c].s}`)
            c = (c + 1) % 2
            r += 3
        }
        return p[c].s * r
    },

    part_2: T => {
        const p = P.prep(T)
        const r = [1, 2, 3].flatMap(i => [1, 2, 3].flatMap(j => [1, 2, 3].flatMap(k => i + j + k)))
        console.log(r)
        const g = [3, 4, 5, 6, 7, 8, 9].map(s => [s, r.filter(a => a === s).length])
        console.log(g)
        return g
    }

}

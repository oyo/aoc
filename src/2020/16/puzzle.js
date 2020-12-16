const _ = require('lodash')

const P = {

    prep: T => (p => ({
        rules: P.prepRules(p[0]),
        my: P.prepTicket(p[2])[0],
        tickets: P.prepTicket(p[4])
    }))(
        T.split(/\n+(your|nearby) tickets?:\n+/).map(L => L.split('\n'))
    ),

    prepRules: R => R.map(l => l.split(/(-|: | or )/)),

    prepTicket: R => R.map(l => l.split(/,/).map(a => a * 1)),

    transpose: m => m[0].map((x, i) => m.map(x => x[i] * 1)),

    errors: (t, r) => t.reduce((b, v) => b +
        ((r.reduce((a, f) => a ||
            (v >= f[2] * 1 && v <= f[4] * 1) ||
            (v >= f[6] * 1 && v <= f[8] * 1), false))
                ? 0
                : v),
        0),

    matchIndex: (f, tt) => {
        const result = tt.reduce((b, ti, i) => {
            let c = (ti.reduce((a, v) => a &&
                ((v >= f[2] * 1 && v <= f[4] * 1) ||
                    (v >= f[6] * 1 && v <= f[8] * 1)), true))
            if (c)
                b.push(i)
            return b
        }, [])
        return result
    },

    part_1: T => (p => p.tickets.reduce((a, t) => a + P.errors(t, p.rules), 0))(P.prep(T)),

    part_2: T => {
        const p = P.prep(T)
        const transValids = P.transpose(p.tickets.filter(t => P.errors(t, p.rules) === 0))
        let ri = p.rules.map(r => [r[0], P.matchIndex(r, transValids)])
        const rulesindex = new Array(p.rules.length)
        while (ri.length > 0) {
            ri.filter(r => r[1].length === 1)
                .forEach(r => {
                    const idx = r[1][0]
                    rulesindex[idx] = r[0]
                    ri = ri.map(y => [y[0], y[1].filter(fi => fi !== idx)])
                })
            ri = ri.filter(r => r[1].length > 0)
        }
        return rulesindex
            .map((r, i) => [r, p.my[i]])
            .reduce((a, r) => a * (r[0].match(/^departure /) ? r[1] : 1), 1)
    }

}

exports.puzzle = P
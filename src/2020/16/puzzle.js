const P = {

    prep: T => (p => ({
        rules: P.prepRules(p[0]),
        my: P.prepTicket(p[2])[0],
        tickets: P.prepTicket(p[4])
    }))(
        T.split(/\n+(your|nearby) tickets?:\n+/).map(L => L.split('\n'))
    ),

    prepRules: R => R.map(l => l.split(/(-|: | or )/))
        .map(l => [l[0], 1 * l[2], 1 * l[4], 1 * l[6], 1 * l[8]]),

    prepTicket: R => R.map(l => l.split(/,/).map(a => a * 1)),

    transpose: m => m[0].map((x, i) => m.map(x => x[i] * 1)),

    errors: (ticket, rules) => ticket.reduce((b, v) => b +
        ((rules.reduce((a, field) => a ||
            (v >= field[1] && v <= field[2]) ||
            (v >= field[3] && v <= field[4]), false))
            ? 0
            : v),
        0),

    matchIndex: (field, tickets) => P.transpose(tickets)
        .reduce((b, ti, i) => {
            const c = (ti.reduce((a, v) => a && (
                (v >= field[1] && v <= field[2]) ||
                (v >= field[3] && v <= field[4])), true))
            if (c)
                b.push(i)
            return b
        }, []),

    part_1: T => (p => p.tickets.reduce((a, t) => a + P.errors(t, p.rules), 0))(P.prep(T)),

    part_2: T => {
        const p = P.prep(T)
        let ri = p.rules.map(r => [
            r[0],
            P.matchIndex(r, p.tickets.filter(t => P.errors(t, p.rules) === 0))
        ])
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
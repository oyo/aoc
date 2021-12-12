exports.puzzle = P = {

    prep: T => T.split('\n').map(L => L.split('-')).flatMap(L => [L, L.slice().reverse()]),

    visit: (l, p, m, t) => {
        if (m[m.length - 1] === 'end') {
            l.push(m)
            return l
        }
        const max = m.filter(w => m[m.length - 1][0] >= 'a' && w === m[m.length - 1]).length === 2 ? 1 : t
        p.filter(e =>
            e[0] === m[m.length - 1] && (
                e[1][0] < 'a' || (
                    e[1] !== 'start' &&
                    m.filter(w => w === e[1]).length < max
                )
            )
        )
            .map(s => m.slice(0, m.length - 1).concat(s))
            .map(o => P.visit(l, p, o, max))
        return l
    },

    part_1: T => P.visit([], P.prep(T), ['start'], 1).length,

    part_2: T => P.visit([], P.prep(T), ['start'], 2).length,

}

exports.puzzle = P = {

    prep: T => T.split('\n').map(L => L.split('-')).flatMap(L => [L, L.slice().reverse()]),

    pathRek: (l, p, m, t) => {
        if (m[m.length - 1] === 'end') {
            l.push(m.slice())
            return l
        }
        p.filter(e =>
            e[0] === m[m.length - 1] && (
                e[1][0] < 'a' || (
                    e[1] !== 'start' &&
                    m.filter(w => w === e[1]).length < t
                )
            )
        )
            .map(s => m.slice(0, m.length - 1).concat(s))
            .map(o => P.pathRek(l, p, o, o.filter(w => o[o.length - 1][0] >= 'a' && w === o[o.length - 1]).length === 2 ? 1 : t))
        return l
    },

    part_1: T => P.pathRek([], P.prep(T), ['start'], 1).length,

    part_2: T => P.pathRek([], P.prep(T), ['start'], 2).length,

}

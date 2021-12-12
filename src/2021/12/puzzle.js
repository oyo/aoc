exports.puzzle = P = {

    prep: T => T.split('\n').map(L => L.split('-')).reduce((o, e) => {
        const k = e[0]
        const v = e[1]
        if (v !== 'start' && k !== 'end') o[k] = (o[k] || []).concat([v])
        if (k !== 'start' && v !== 'end') o[v] = (o[v] || []).concat([k])
        return o
    }, {}),

    visit: (l, p, g, t) => {
        const from = p[p.length - 1]
        if (from === 'end') {
            l.push(p)
            return l
        }
        const max = p.filter(w => from[0] >= 'a' && w === from).length === 2 ? 1 : t
        return g[from]
            .filter(to => to[0] < 'a' || p.filter(w => w === to).length < max)
            .map(w => P.visit(l, p.concat(w), g, max))[0]
    },

    part_1: T => P.visit([], ['start'], P.prep(T), 1).length,

    part_2: T => P.visit([], ['start'], P.prep(T), 2).length

}

const P = {

    prep: T => T.replace(/ /g, '').split('\n'),

    sub: {
        paren: /\(([0-9+*]+)\)/,
        ltor: /^(\d+([+*])\d+)/,
        add: /(\d+[+]\d+)/,
        mul: /(\d+[*]\d+)/
    },

    eval1: e => {
        let g
        while (g = e.match(P.sub.paren))
            e = e.replace(P.sub.paren, P.eval1(g[1]))
        while (g = e.match(P.sub.ltor)) {
            const t = g[1].split(/[+*]/)
            e = e.replace(P.sub.ltor, g[2]==='+' ? 1*t[0]+1*t[1] : t[0]*t[1])
        }
        return e * 1
    },

    eval2: e => {
        let g
        while (g = e.match(P.sub.paren))
            e = e.replace(P.sub.paren, P.eval2(g[1]))
        while (g = e.match(P.sub.add)) {
            const t = g[1].split('+')
            e = e.replace(P.sub.add, 1*t[0]+1*t[1])
        }
        while (g = e.match(P.sub.mul)) {
            const t = g[1].split('*')
            e = e.replace(P.sub.mul, t[0]*t[1])
        }
        return e * 1
    },

    part_1: T => P.prep(T).map(e => P.eval1(e)).reduce((a, b) => a + b),

    part_2: T => P.prep(T).map(e => P.eval2(e)).reduce((a, b) => a + b)

}

exports.puzzle = P
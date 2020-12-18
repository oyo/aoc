const P = {

    prep: T => T.replace(/ /g, '').split('\n'),

    eval1: e => {
        let g
        const rg = /\(([0-9+*]+)\)/
        while (g = e.match(rg))
            e = e.replace(rg, P.eval1(g[1]))
        let o
        const ro = /^(\d+[+*]\d+)/
        while (o = e.match(ro))
            e = e.replace(ro, eval(o[1]))
        return e * 1
    },

    eval2: e => {
        let g
        const rg = /\(([0-9+*]+)\)/
        while (g = e.match(rg))
            e = e.replace(rg, P.eval2(g[1]))
        let a
        const ra = /(\d+[+]\d+)/
        while (a = e.match(ra))
            e = e.replace(ra, eval(a[1]))
        let m
        const rm = /(\d+[*]\d+)/
        while (m = e.match(rm))
            e = e.replace(rm, eval(m[1]))
        return e * 1
    },

    part_1: T => P.prep(T).map(e => P.eval1(e)).reduce((a, b) => a + b),

    part_2: T => P.prep(T).map(e => P.eval2(e)).reduce((a, b) => a + b)

}

exports.puzzle = P
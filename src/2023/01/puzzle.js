exports.puzzle = P = {

    prep: T => T.trim().split('\n'),

    calc: T => T.map(L => Number.parseInt(L[0] + L[L.length - 1])).reduce((a, c) => a + c, 0),

    part_1: T => P.calc(P.prep(T).map(L => L.split('').filter(C => C.match(/\d/)))),

    part_2: T => {
        const D = [/\d/g, /one/g, /two/g, /three/g, /four/g, /five/g, /six/g, /seven/g, /eight/g, /nine/g]
        const DA = [/_/, /^one/, /^two/, /^three/, /^four/, /^five/, /^six/, /^seven/, /^eight/, /^nine/]
        const p = P.prep(T)
        const m = p
            .map(L => D.map(R => [...L.matchAll(R)].map(r => r.index)).flat())
            .map(L => L.filter(d => d > -1)).map(L => [Math.min.apply(null, L), Math.max.apply(null, L)])
        return P.calc(p
            .map((L, i) => [L.slice(m[i][0]), L.slice(m[i][1])])
            .map(L => L.map(w => DA.reduce((a, c, i) => a.replace(c, i), w)[0]))
        )
    }

}

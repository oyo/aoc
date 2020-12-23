const P = {

    prep: T => T.split('\n\n').map(L => L.split('\n').slice(1).map(n => n * 1)),

    part_1: T => {
        let p = P.prep(T)
        while (p[0].length > 0) {
            const c0 = p[0].shift()
            const c1 = p[1].shift()
            if (c0 > c1) {
                p[0].push(c0)
                p[0].push(c1)
            } else {
                p[1].push(c1)
                p[1].push(c0)
            }
            p = p.sort((a, b) => a.length - b.length)
        }
        return p[1].reduce((a, n, i) => a + (p[1].length - i) * n, 0)
    },

    game: (p, l) => {
        const h = []
        let i = 1
        while (p[0].length > 0 && p[1].length > 0) {
            const c = p[0].join(',') + '  ' + p[1].join(',')
            //console.log(('' + l).padStart(l,' ') + '.' + i++)
            if (h.indexOf(c) >= 0) {
                p.push(0)
                return p
            }
            h.push(c)
            const c0 = p[0].shift()
            const c1 = p[1].shift()
            const w = (p[0].length >= c0 && p[1].length >= c1)
                ? P.game([
                    p[0].slice(0, c0),
                    p[1].slice(0, c1)
                ], l + 1)[2]
                : (c0 > c1 ? 0 : 1)
            if (w === 0) {
                p[0].push(c0)
                p[0].push(c1)
            } else {
                p[1].push(c1)
                p[1].push(c0)
            }
        }
        p.push(p[0].length === 0 ? 1 : 0)
        return p
    },

    part_2: T => {
        const r = P.game(P.prep(T), 1)
        const w = r[r[2]];
        return w.reduce((a, n, i) => a + (w.length - i) * n, 0)
    }

}

exports.puzzle = P
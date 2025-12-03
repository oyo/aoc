const N = n => Number.parseInt(n)

exports.puzzle = P = {

    prep: T => T.trim().split('\n').map(L => L.split('').map(N)),

    fv1: b => {
        const o = b.filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => b - a)
        let m = o[0]
        let i = b.indexOf(m)
        if (i === b.length - 1) {
            m = o[1]
            i = b.indexOf(m)
        }
        const r = b.slice(i + 1)
        const n = Math.max(...r)
        return m * 10 + n
    },

    fv2: b => {
        let o = [...b].sort((a, b) => b - a)
        let c = [...b]
        let d = []
        let oi = 0
        while (d.length < 12) {
            const n = o[oi]
            const i = c.indexOf(n)
            if (i >= 0 && i < c.length - (11 - d.length)) {
                d.push(n)
                o.splice(oi, 1)
                c = c.slice(i + 1)
                oi = 0
            } else
                oi++
        }
        return N(d.join(''))
    },

    run: (T, R) => P.prep(T).reduce((a, c) => a + R(c), 0),

    part_1: T => P.run(T, P.fv1),

    part_2: T => P.run(T, P.fv2)

}

const _ = require('lodash')

exports.puzzle = P = {

    prep: T => {
        const l = T.split('\n')
        P.N = l.length
        P.L = l[0].length
        return l.map(L => parseInt(L, 2))
    },

    part_1: T => {
        const p = P.prep(T)
        const c = new Array(P.L).fill(0)
        for (let i = 0; i < P.N; i++) {
            const n = p[i]
            for (let j = 0; j < P.L; j++) {
                c[j] += (n >> (P.L - j - 1)) & 1
            }
        }
        const b = c.map(d => d > P.N / 2 ? '1' : '0').join('')
        const g = parseInt(b, 2)
        const e = ~g & (Math.pow(2, P.L) - 1)
        return g * e
    },

    divideByBit: (p, i) => p.reduce((c, n) => {
        c[(n >> (P.L - i - 1)) & 1].push(n)
        return c
    }, [[], []]).sort((a, b) => a.length - b.length),

    part_2: T => P.divideByBit(P.prep(T), 0).map((d, k) => {
        for (let i = 1; d.length > 1; i++)
            d = P.divideByBit(d, i)[k]
        return d[0]
    }).reduce((a, b) => a * b)

}

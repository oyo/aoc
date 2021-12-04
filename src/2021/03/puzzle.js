exports.puzzle = P = {

    prep: T => {
        const l = T.split('\n')
        P.L = l[0].length
        return l.map(L => parseInt(L, 2))
    },

    countBits: (p, i) => p.reduce((c, n) => {
        c[(n >> (P.L - i - 1)) & 1]++
        return c
    }, [0, 0]),

    divideByBit: (p, i) => p.reduce((c, n) => {
        c[(n >> (P.L - i - 1)) & 1].push(n)
        return c
    }, [[], []]).sort((a, b) => a.length - b.length),

    part_1: T => {
        const g = (p => (new Array(P.L).fill(0))
            .map((x, i) => P.countBits(p, i))
            .reduce((o, a, i) => {
                return a[0] > a[1] ? o : o | (1 << (P.L - i - 1))
            }, 0))(P.prep(T))
        return g * (~g & ((1<<P.L) - 1))
    },

    part_2: T => P.divideByBit(P.prep(T), 0).map((d, k) => {
        for (let i = 1; d.length > 1; i++)
            d = P.divideByBit(d, i)[k]
        return d[0]
    }).reduce((a, b) => a * b)

}

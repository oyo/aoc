const N = n => Number.parseInt(n)

exports.puzzle = P = {

    prep: T => T.trim().split(',').map(L => L.split('-').map(N)),

    checkN: (id, n) => new RegExp('^(' + id.slice(0, n) + ')+$').test(id)
        ? N(id)
        : 0,

    isInvalid1: (id) => {
        id = id.toString()
        const lid = id.length
        const mid = lid / 2
        if (lid % 2 !== 0)
            return 0
        return P.checkN(id, mid)
    },

    isInvalid2: (id) => {
        id = id.toString()
        const lid = id.length
        let invalid = 0
        for (let i = 1; i <= lid / 2 && !invalid; i++)
            if (lid % i === 0)
                invalid = P.checkN(id, i)
        return invalid
    },

    checkRange: ([a, b], inv) => {
        let s = 0
        for (let id = a; id <= b; id++)
            s += inv(id)
        return s
    },

    run: (T, inv) => P.prep(T).reduce((a, c) => a + P.checkRange(c, inv), 0),

    part_1: T => P.run(T, P.isInvalid1),

    part_2: T => P.run(T, P.isInvalid2),

}

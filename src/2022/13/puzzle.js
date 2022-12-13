exports.puzzle = P = {

    prep: T => T.trim().split('\n\n').map(L => L.split('\n').map(L => JSON.parse(L))),

    compare: (L, R) => {
        const lu = L === undefined
        const ru = R === undefined
        if (lu && ru)
            return 0
        if (lu)
            return 1
        if (ru)
            return -1
        const ln = Number.isInteger(L)
        const rn = Number.isInteger(R)
        if (ln && rn)
            return Math.sign(R - L)
        const la = Array.isArray(L)
        const ra = Array.isArray(R)
        if (ln && ra)
            return P.compare([L], R)
        if (la && rn)
            return P.compare(L, [R])
        let cmp = 0
        let n = Math.max(L.length, R.length)
        for (let i = 0; cmp === 0 && i < n; i++)
            cmp = P.compare(L[i], R[i])
        return cmp
    },

    part_1: T => P.prep(T)
        .map((s, i) => [P.compare(s[0], s[1]), i + 1])
        .filter((q, i) => q[0] === 1)
        .map(q => q[1])
        .reduce((a, b) => a + b, 0),

    part_2: T => {
        const s = P.prep(T)
            .flat(1)
            .concat([[[2]], [[6]]])
            .sort((a, b) => P.compare(b, a))
            .map(s => JSON.stringify(s))
        return (s.indexOf('[[2]]') + 1) * (s.indexOf('[[6]]') + 1)
    }

}
2
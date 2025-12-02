const N = n => Number.parseInt(n)

exports.puzzle = P = {

    prep: T => T.trim().split(',').map(L => L.split('-')),

    checkRE: (id, n) => {
        const p = id.slice(0, n)
        const r = new RegExp('^(' + p + ')+$')
        if (r.test(id))
            return N(id)
        return 0
    },

    isInvalid1: (a) => {
        a = a.toString()
        const la = a.length
        if (la % 2 !== 0) return false
        const mid = la / 2
        const eq = N(a.slice(0, mid)) === N(a.slice(mid))
        //console.log(a, eq)
        return eq
    },

    checkRange: ([a, b]) => {
        //console.log([a, b])
        const la = a.length
        const lb = b.length
        if (la === lb && la % 2 !== 0 && lb % 2 !== 0)
            return 0
        if (la === lb && la % 2 === 0 && lb % 2 === 0) {
            //console.log(la, lb)
            const mid = la / 2
            const a1 = N(a.slice(0, mid))
            const a2 = N(a.slice(mid))
            const b1 = N(b.slice(0, mid))
            const b2 = N(b.slice(mid))
            if (a1 === b1) {
                const inv = N([a.slice(0, mid), a.slice(0, mid)].join(''))
                if (a2 <= inv && b2 >= inv)
                    return inv
            }
        }
        let s = 0
        for (let i = N(a); i <= N(b); i++) {
            if (P.isInvalid1(i))
                s += i
        }
        //console.log('sum', s)
        return s
    },

    isInvalid2: (id) => {
        id = id.toString()
        const lid = id.length
        let invalid = 0
        for (let i = 1; i <= ~~(lid / 2) && !invalid; i++)
            if (lid % i === 0)
                invalid = P.checkRE(id, i)
        return invalid
    },

    checkRange2: ([a, b]) => {
        let s = 0
        for (let id = N(a); id <= N(b); id++)
            s += P.isInvalid2(id)
        return s
    },

    part_1: T => P.prep(T).reduce((a, c) => a + P.checkRange(c), 0),

    part_2: T => P.prep(T).reduce((a, c) => a + P.checkRange2(c), 0)

}

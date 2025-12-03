const N = n => Number.parseInt(n)

exports.puzzle = P = {

    prep: T => T.trim().split('\n').map(L => L.split('').map(N)),

    jolt: (l, b) => {
        const d = []
        for (
            let o = [...b].sort((a, b) => b - a), oi = 0;
            d.length < l;
            oi++
        ) {
            const n = o[oi]
            const i = b.indexOf(n)
            if (i >= 0 && i < b.length - (l - d.length - 1)) {
                d.push(n)
                o.splice(oi, 1)
                b = b.slice(i + 1)
                oi = -1
            }
        }
        return N(d.join(''))
    },

    part_1: T => P.prep(T).reduce((a, c) => a + P.jolt(2, c), 0),

    part_2: T => P.prep(T).reduce((a, c) => a + P.jolt(12, c), 0)

}

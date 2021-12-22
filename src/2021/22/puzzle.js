N = BigInt

exports.puzzle = P = {

    D: 101,
    D2: 50,

    prep: T => ({
        s: T.split('\n').map(L => L.split(/[ ,]/).map(t => {
            if (t === 'on')
                return true
            if (t === 'off')
                return false
            const c = t.split(/(=|\.\.)/)
            return [c[2] * 1 + P.D2, c[4] * 1 + P.D2]
        })),
        b: P.empty(P.D)
    }),

    empty: d =>
        new Array(d).fill().map((_, z) =>
            new Array(d).fill().map((_, y) =>
                0n)),

    pad: v => (new Array(P.D).fill('0').join('')
        + v.toString(2)).substr(-P.D),

    toString: z => z.reduce((o, y) => o + y.reduce((o, x) => o + P.pad(x) + '\n', '') + '\n\n', ''),

    count: b => {
        let s = 0
        for (let z = 0; z < P.D; z++) {
            for (let y = 0; y < P.D; y++) {
                const n = b[z][y].toString(2).replace(/0/g, '').length
                s += n
            }
        }
        return s
    },

    onoff: (b, c) => {
        const xr = c[1]
        const yr = c[2]
        const zr = c[3]
        const m = ((1n << N(1 + xr[1] - xr[0])) - 1n) << N(P.D - xr[1] - 1)
        if (c[0]) {
            for (let z = zr[0]; z <= zr[1]; z++)
                for (let y = yr[0]; y <= yr[1]; y++)
                    b[z][y] |= m
        } else {
            for (let z = zr[0]; z <= zr[1]; z++)
                for (let y = yr[0]; y <= yr[1]; y++)
                    b[z][y] &= ~m
        }
    },

    part_1: T => {
        const p = P.prep(T)
        const r = p.s.filter(c => c[1][0] >= 0 && c[2][0] >= 0 && c[3][0] >= 0 && c[1][1] < P.D && c[2][1] < P.D && c[3][1] < P.D)
        for (let c of r)
            P.onoff(p.b, c)
        return P.count(p.b)
    },

    part_2: T => {
        const p = P.prep(T)
        return p.length
    }

}

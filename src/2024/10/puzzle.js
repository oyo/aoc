const N = n => Number.parseInt(n)

exports.puzzle = P = {

    prep: T => P.border(T.trim().split('\n').map(L => L.split('').map(N))),

    border: p => [Array(p[0].length + 2).fill(-1)]
        .concat(
            p.map(r => [-1].concat(r).concat([-1]))
        )
        .concat(
            [Array(p[0].length + 2).fill(-1)]
        ),

    check: (p, y, x, n, peaks) => {
        const c = p[y][x]
        if (n === 9 && c === 9) {
            peaks.add(y * 1000 + x)
            return 1
        }
        if (c !== n)
            return 0
        const N = P.check(p, y - 1, x, n + 1, peaks)
        const S = P.check(p, y + 1, x, n + 1, peaks)
        const W = P.check(p, y, x - 1, n + 1, peaks)
        const E = P.check(p, y, x + 1, n + 1, peaks)
        const s = N + S + W + E
        return s
    },

    trails: (T, distinct) => {
        const p = P.prep(T)
        let s = 0
        for (let y = 1; y < p.length - 1; y++) {
            for (let x = 1; x < p[y].length - 1; x++) {
                const n = p[y][x]
                if (n === 0) {
                    const peaks = new Set()
                    const score = P.check(p, y, x, 0, peaks)
                    s += distinct ? score : peaks.size
                }
            }
        }
        return s
    },

    part_1: T => P.trails(T, false),

    part_2: T => P.trails(T, true)

}

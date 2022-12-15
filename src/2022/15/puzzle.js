exports.puzzle = P = {

    env: [2000000, 4000000],

    prep: T => T.trim().split('\n')
        .map(L => L.split(/[^-\d]+/).slice(1).map(N => Number.parseInt(N)))
        .map(a => a.concat([Math.abs(a[0] - a[2]) + Math.abs(a[1] - a[3])])),

    exclude: (y, a) => (d => [a[0] - d, a[0] + d])(a[4] - Math.abs(y - a[1])),

    intersect: (a, b) =>
        (a[0] + 1 >= b[0] && a[0] - 1 <= b[1]) ||
        (a[1] + 1 >= b[0] && a[1] - 1 <= b[1]) ||
        (b[0] + 1 >= a[0] && b[0] - 1 <= a[1]) ||
        (b[1] + 1 >= a[0] && b[1] - 1 <= a[1])
        ? [Math.min(a[0], b[0]), Math.max(a[1], b[1])]
        : false,

    intersectAny: (p, s) => {
        let l0 = 0, l1 = 1
        while (l0 !== l1) {
            l0 = s.length
            for (let i = 0; i < s.length; i++) {
                const c = P.intersect(p, s[i])
                if (c) {
                    p = c
                    s.splice(i--, 1)
                }
            }
            l1 = s.length
        }
        return [...s, p]
    },

    scan: (p, y) => {
        let s = p.map(a => P.exclude(y, a)).filter(b => b[0] <= b[1])
        for (let r = 0; r < 2 && s.length > 1; r++)
            s = P.intersectAny(s.shift(), s)
        return [y, s]
    },

    part_1: T => (s => s[1][0][1] - s[1][0][0])(P.scan(P.prep(T), P.env[0])),

    part_2: T => (
        p => (
            r => (r[0][1][0][1] + 1) * 4000000 + r[0][0]
        )(
            new Array(P.env[1] + 1)
                .fill(0)
                .map((_, y) => P.scan(p, y))
                .filter(s => s[1].length > 1)
        )
    )(P.prep(T))

}

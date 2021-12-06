exports.puzzle = P = {

    prep: T => T.split(',').map(n => n * 1),

    groupBy: f => [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => f.filter(v => v === i).length),

    sim: (f, n) => {
        const g = P.groupBy(f)
        for (let i = 0; i < n; i++) {
            const m = g.shift()
            g.push(m)
            g[6] += m
        }
        return g.reduce((a, b) => a + b, 0)
    },

    part_1: T => P.sim(P.prep(T), 80),

    part_2: T => P.sim(P.prep(T), 256)

}

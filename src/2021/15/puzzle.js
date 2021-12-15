const H = 9

exports.puzzle = P = {

    prep: (T, N) => {
        const p = T.split('\n')
        const dy = p.length
        const dx = p[0].length
        return new Array(dy * N).fill().map((_, y) =>
            new Array(dx * N).fill().map((_, x) =>
                ({ y: y, x: x, v: (p[y % dy][x % dx] * 1 - 1 + (~~(y / dy)) + (~~(x / dx))) % H + 1 })
            )
        )
    },

    toString: b => b.reduce((o, y) => o + y.reduce((o, x) => o + ' ' + x.v, '') + '\n', ''),

    // super slow shortest path implementation - takes about 6 min for part 2
    dijkstra: (p, s, t) => {
        const q = p.flat().map(v => { v.d = 1e9; return v })
        s.d = 0
        while (q.length > 0) {
            const u = q.reduce((p, c) => p.d < c.d ? p : c)
            if (u === t)
                return p
            const idx = q.indexOf(u)
            q.splice(idx, 1)
            const x = u.x
            const y = u.y
            const n = []
            if (y < p.length - 1 && q.indexOf(p[y + 1][x]) >= 0) n.push(p[y + 1][x])
            if (x < p[y].length - 1 && q.indexOf(p[y][x + 1]) >= 0) n.push(p[y][x + 1])
            if (y > 0 && q.indexOf(p[y - 1][x]) >= 0) n.push(p[y - 1][x])
            if (x > 0 && q.indexOf(p[y][x - 1]) >= 0) n.push(p[y][x - 1])
            for (let v of n) {
                const alt = u.d + v.v
                if (alt < v.d) {
                    v.d = alt
                    v.p = u
                }
            }
        }
        return p
    },

    path: (s, t) => {
        const q = []
        let u = t
        if (u.p || u === s) {
            while (u) {
                q.unshift(u)
                u = u.p
            }
        }
        return q
    },

    run: p => {
        const s = p[0][0]
        const py = p[p.length - 1]
        const t = py[py.length - 1]
        P.dijkstra(p, s, t)
        return P.path(s, t).reduce((s, u) => s + u.v, 0) - s.v
    },

    part_1: T => P.run(P.prep(T, 1)),

    part_2: T => P.run(P.prep(T, 5))

}

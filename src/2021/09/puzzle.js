exports.puzzle = P = {

    prep: T => P.addBorder(T.trim().split('\n').map(L => L.split('').map(n => n * 1)), 1, 10),

    addBorder: (p, o, d) =>
        new Array(p.length + (o << 1)).fill().map((_, y) =>
            new Array(p[0].length + (o << 1)).fill().map((_, x) =>
                p[y - o] !== undefined && p[y - o][x - o] !== undefined ? p[y - o][x - o] : d)),

    toString: b => b.reduce((o, y) => o + y.reduce((o, x) => o + x + ' ', '') + '\n', ''),

    clone: b => b.slice().map(y => y.slice()),

    lowPoint: (b, y, x) =>
        b[y][x] < b[y - 1][x] &&
            b[y][x] < b[y + 1][x] &&
            b[y][x] < b[y][x - 1] &&
            b[y][x] < b[y][x + 1]
            ? b[y][x] + 1
            : 0,

    lowPoints: p => {
        const r = { sum: 0, low: [] }
        for (let y = 1; y < p.length - 1; y++)
            for (let x = 1; x < p[y].length - 1; x++) {
                const l = P.lowPoint(p, y, x)
                if (l > 0) {
                    r.sum += l
                    r.low.push({ x: x, y: y, z: l })
                }
            }
        return r
    },

    fillRek: (p, p1, c, h) => {
        if (p1[c.y][c.x] >= h)
            return 0
        p1[c.y][c.x] = h
        return c.s = 1
            + P.fillRek(p, p1, { x: c.x + 1, y: c.y }, h)
            + P.fillRek(p, p1, { x: c.x - 1, y: c.y }, h)
            + P.fillRek(p, p1, { x: c.x, y: c.y - 1 }, h)
            + P.fillRek(p, p1, { x: c.x, y: c.y + 1 }, h)
    },

    fillTo: (p, h) => P
        .lowPoints(p).low
        .filter(c => c.z < h)
        .map(c => {
            P.fillRek(p, P.clone(p), c, h)
            return c
        })
        // count for part 2 result
        .sort((a, b) => b.s - a.s)
        .slice(0, 3)
        .reduce((o, c) => o * c.s, 1),

    part_1: T => P.lowPoints(P.prep(T)).sum,

    part_2: T => P.fillTo(P.prep(T), 9)

}

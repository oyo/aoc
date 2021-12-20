exports.puzzle = P = {

    prep: T => {
        const s = T.trim().split('\n\n')
        const b = P.addBorder(s[1].split('\n').map(L => L.split('')), 60, '.')
        return {
            a: BigInt('0b' + s[0].replace(/\./g, '0').replace(/#/g, '1')),
            b: [b, P.clone(b)]
        }
    },

    addBorder: (p, o, d) =>
        new Array(p.length + (o << 1)).fill().map((_, y) =>
            new Array(p[0].length + (o << 1)).fill().map((_, x) =>
                p[y - o] !== undefined && p[y - o][x - o] !== undefined ? p[y - o][x - o] : d)),

    clone: b => b.slice().map(y => y.slice()),

    toString: b => b.reduce((o, y) => o + y.reduce((o, x) => o + x, '') + '\n', ''),

    enhance: (a, p, y, x) => Number((a >> (511n - BigInt(
        (p[y - 1][x - 1] === '#' ? (1 << 8) : 0) |
        (p[y - 1][x] === '#' ? (1 << 7) : 0) |
        (p[y - 1][x + 1] === '#' ? (1 << 6) : 0) |
        (p[y][x - 1] === '#' ? (1 << 5) : 0) |
        (p[y][x] === '#' ? (1 << 4) : 0) |
        (p[y][x + 1] === '#' ? (1 << 3) : 0) |
        (p[y + 1][x - 1] === '#' ? (1 << 2) : 0) |
        (p[y + 1][x] === '#' ? (1 << 1) : 0) |
        (p[y + 1][x + 1] === '#' ? 1 : 0)
    ))) & 1n),

    clearBorder: p => {
        const c = p[2][2]
        let s = 0
        for (let n = 1; n < p.length - 1; n++) {
            if (p[n][1] === '#') s++
            if (p[n][p.length - 2] === '#') s++
            if (p[1][n] === '#') s++
            if (p[p.length - 2][n] === '#') s++
            p[1][n] = p[p.length - 2][n] = p[n][1] = p[n][p.length - 2] = c
        }
        return s
    },

    doStep: p => {
        const b = p.b.pop()
        p.b.unshift(b)
        let s = 0
        for (let y = 1; y < b.length - 1; y++) {
            for (let x = 1; x < b[y].length - 1; x++) {
                const l = P.enhance(p.a, p.b[1], y, x)
                s += l
                b[y][x] = l ? '#' : '.'
            }
        }
        return s - P.clearBorder(b)
    },

    doSteps: (p, n) => {
        let fc = 0
        for (let i = 0; i < n; i++)
            fc = P.doStep(p)
        return fc
    },

    part_1: T => P.doSteps(P.prep(T), 2),

    part_2: T => P.doSteps(P.prep(T), 50)

}

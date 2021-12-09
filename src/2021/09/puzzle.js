exports.puzzle = P = {

    prep: T => T.trim().split('\n').map(L => L.split('').map(n => n * 1)),

    prepEmpty: d => new Array(d.y).fill().map(y => new Array(d.x).fill(100)),

    populate: (dim, p) => {
        const board = P.prepEmpty(dim)
        const o = 1
        for (let y = 0; y < p.length; y++) {
            for (let x = 0; x < p[y].length; x++) {
                board[o + y][o + x] = p[y][x]
            }
        }
        return board
    },

    dump: () => {
        let s = ''
        for (p of P.board) {
            for (let y = 1; y < P.D.y - 1; y++) {
                for (let x = 1; x < P.D.x - 1; x++) {
                    s += ' ' + p[y][x]
                }
                s += '\n'
            }
            s += '\n'
        }
        console.log(s)
    },

    clone: board => board.slice().map(y => y.slice()),

    count: y => y.reduce((b, x) => b + x.filter(c => c === '#').length, 0),

    lowPoint: (b, y, x) =>
        b[y][x] < b[y - 1][x] &&
            b[y][x] < b[y + 1][x] &&
            b[y][x] < b[y][x - 1] &&
            b[y][x] < b[y][x + 1]
            ? b[y][x] + 1
            : 0,

    isBasin: (b, y, x) =>
        b[y][x] < 9
            ? 1
            : 0,

    lowPoints: () => {
        const p = P.board[0]
        const p1 = P.clone(p)
        P.board.push(p1)
        let s = 0
        let low = []
        for (let y = 1; y < P.D.y - 1; y++)
            for (let x = 1; x < P.D.x - 1; x++) {
                p1[y][x] = P.lowPoint(p, y, x)
                s += p1[y][x]
                if (p1[y][x] > 0)
                    low.push({ x: x, y: y, z: p[y][x] })
            }
        return { low: low, s: s }
    },

    fillRek: (p,p1,c,h) => {
        //console.log(c)
        if (p1[c.y][c.x] >= h)
            return 0
        p1[c.y][c.x] = h
        c.s = 1
            + P.fillRek(p,p1, { x: c.x+1, y: c.y }, h)
            + P.fillRek(p,p1, { x: c.x-1, y: c.y }, h)
            + P.fillRek(p,p1, { x: c.x, y: c.y-1 }, h)
            + P.fillRek(p,p1, { x: c.x, y: c.y+1 }, h)
        return c.s
    },

    fillTo: (l, h) => {
        const p = P.board[0]
        const p1 = P.clone(p)
        P.board.push(p1)
        const r = l.filter(c => c.z<h).reduce((s,c) => {
            return s + P.fillRek(p,p1,c,h)
        }, 0)
        return l
    },

    part_1: T => {
        const p = P.prep(T)
        //console.log(p)
        P.D = {
            y: p.length + 2,
            x: p[0].length + 2
        }
        const board = P.populate(P.D, p)
        P.board = [P.clone(board)]
        const s = P.lowPoints()
        return s.s
    },

    part_2: T => {
        const p = P.prep(T)
        //console.log(p)
        P.D = {
            y: p.length + 2,
            x: p[0].length + 2
        }
        const board = P.populate(P.D, p)
        P.board = [P.clone(board)]
        const s = P.lowPoints()
        const r = P.fillTo(s.low, 9)
        const l = r.sort((a,b) => b.s-a.s).slice(0,3).reduce((o,c) => o*c.s, 1)
        //P.dump()
        return l
    }

}

exports.puzzle = P = {

    prep: T => T.trim().split('\n').map(L => L.split(' -> ').map(L => L.split(',').map(N => Number.parseInt(N)))),

    maxY: ps => Math.max(...ps.flat(2).filter((_, i) => i % 2 !== 0)),

    dump: b => console.log(b.map(r => r.join('')).join('\n')),

    drawPath: (b, p) => {
        for (let i = 1; i < p.length; i++) {
            let x = x0 = p[i - 1][0]
            let y = y0 = p[i - 1][1]
            b[y][x - P.X0] = '#'
            let x1 = p[i][0]
            let y1 = p[i][1]
            let hv = x0 === x1
            let s = hv ? (y0 > y1 ? -1 : 1) : (x0 > x1 ? -1 : 1)
            if (hv)
                for (; y !== y1; y += s)
                    b[y][x - P.X0] = '#'
            else
                for (; x !== x1; x += s)
                    b[y][x - P.X0] = '#'
            b[y][x - P.X0] = '#'
        }
    },

    createMap: (ps, bottom) => {
        const b = new Array(P.maxY(ps) + 2).fill().map(n => new Array(P.W).fill('.').slice())
        if (bottom)
            b.push(new Array(P.W).fill('#').slice())
        ps.forEach(p => P.drawPath(b, p))
        return b
    },

    drop: b => {
        let x = 500 - P.X0
        let y = 0
        let fall = true
        try {
            for (; fall && y <= b.length;) {
                if (b[y + 1][x] === '.') {
                    y++
                } else if (b[y + 1][x - 1] === '.') {
                    y++
                    x--
                } else if (b[y + 1][x + 1] === '.') {
                    y++
                    x++
                } else {
                    fall = false
                }
            }
            b[y][x] = 'o'
            return y !== 1
        } catch (e) {
            return false
        }
    },

    part_1: T => {
        P.X0 = 490
        P.W = 80
        const ps = P.prep(T)
        const b = P.createMap(ps)
        let n = 0
        for (; P.drop(b); n++)
            ;
        P.dump(b)
        return n
    },

    part_2: T => {
        P.X0 = 320
        P.W = 360
        const ps = P.prep(T)
        const b = P.createMap(ps, true)
        let n = 0
        for (; P.drop(b); n++)
            ;
        P.dump(b)
        return n + 1
    }

}

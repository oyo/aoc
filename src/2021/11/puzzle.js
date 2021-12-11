exports.puzzle = P = {

    prep: T => P.addBorder(T.split('\n').map(L => L.split('').map(n => n * 1)), 1, 1e4),

    addBorder: (p, o, d) =>
        new Array(p.length + (o << 1)).fill().map((_, y) =>
            new Array(p[0].length + (o << 1)).fill().map((_, x) =>
                p[y - o] !== undefined && p[y - o][x - o] !== undefined ? p[y - o][x - o] : d)),

    //clone: b => b.slice().map(y => y.slice()),
    //toString: b => b.reduce((o, y) => o + y.reduce((o, x) => o + (x < 0 ? ' -' : (x >= 1e4 ? ' .' : (x > 9 ? x : ' ' + x))), '') + '\n', ''),

    flash: (p, y, x) => {
        p[y - 1][x - 1]++
        p[y - 1][x]++
        p[y - 1][x + 1]++
        p[y][x - 1]++
        p[y][x] = -1e6
        p[y][x + 1]++
        p[y + 1][x - 1]++
        p[y + 1][x]++
        p[y + 1][x + 1]++
    },

    doStep: p => {
        //console.log(P.toString(p))
        const r = { sum: 0, low: [] }
        for (let y = 1; y < p.length - 1; y++)
            for (let x = 1; x < p[y].length - 1; x++) {
                p[y][x]++
            }
        let hasFlashed
        let fc = 0
        do {
            hasFlashed = false
            for (let y = 1; y < p.length - 1; y++) {
                for (let x = 1; x < p[y].length - 1; x++) {
                    if (p[y][x] > 9) {
                        hasFlashed = true
                        fc++
                        P.flash(p, y, x)
                    }
                }
            }
        } while (hasFlashed)
        for (let y = 1; y < p.length - 1; y++) {
            for (let x = 1; x < p[y].length - 1; x++) {
                if (p[y][x] < 0) {
                    p[y][x] = 0
                }
            }
        }
        //console.log(P.toString(p))
        return fc
    },

    doSteps: (p, n) => {
        let fc = 0
        for (let i = 0; i < n; i++)
            fc += P.doStep(p)
        return fc
    },

    doStepsAll: p => {
        let n = (p.length - 2) * (p[0].length - 2)
        for (let i = 0; ; i++)
            if (P.doStep(p) === n)
                return i + 1
    },

    part_1: T => P.doSteps(P.prep(T), 100),

    part_2: T => P.doStepsAll(P.prep(T))

}

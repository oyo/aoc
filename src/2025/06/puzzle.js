const N = n => Number.parseInt(n)

exports.puzzle = P = {

    prep: T => T.trim().split('\n').map(L => L.trim().split(/ +/)),

    prep2: T => T.split('\n'),

    part_1: T => {
        let p = P.prep(T)
        let op = p.pop()
        p = p.map(l => l.map(N))
        let s = 0
        for (let i = 0; i < op.length; i++) {
            let sc = 0
            if (op[i] === '+') {
                sc = 0
                for (let c = 0; c < p.length; c++) {
                    sc += p[c][i]
                }
            } else {
                sc = 1
                for (let c = 0; c < p.length; c++)
                    sc *= p[c][i]
            }
            s += sc
        }
        return s
    },

    part_2: T => {
        let p = P.prep2(T)
        p.pop()
        let op = p.pop()
        if (p.length < 4)
            p.push(new Array(op.length + 1).join(' '))
        let o = []
        let s = 0
        let sc = 0
        for (let c = op.length - 1; c >= 0; c--) {
            const n = N(p[0][c] + p[1][c] + p[2][c] + p[3][c])
            o.push(n)
            if (op[c] === '+') {
                sc = o.reduce((a, c) => a + c, 0)
                s += sc
                o = []
                c--
            } if (op[c] === '*') {
                sc = o.reduce((a, c) => a * c, 1)
                s += sc
                o = []
                c--
            }
        }
        return s
    }

}

const N = n => Number.parseInt(n)
const traN = a => a[0].map((_, c) => a.map(r => N(r[c])))
const rop = (p, o) => o === '+'
    ? p.reduce((a, c) => a + c, 0)
    : p.reduce((a, c) => a * c, 1)

exports.puzzle = P = {

    part_1: T => (
        p => (
            (o, q) => o.reduce((a, c, i) => a + rop(q[i], c), 0)
        )(
            p.pop(), traN(p)
        )
    )(
        T.trim().split('\n').map(L => L.trim().split(/ +/))
    ),

    part_2: T => {
        let p = T.split('\n').slice(0, -1)
        let o = p.pop()
        if (p.length < 4)
            p.push(new Array(o.length + 1).join(' '))
        let s = 0
        for (let r = [], i = o.length - 1; i >= 0; i--) {
            r.push(N(p[0][i] + p[1][i] + p[2][i] + p[3][i]))
            o[i] !== ' ' && (
                s += rop(r, o[i]),
                r = [],
                i--
            )
        }
        return s
    }

}

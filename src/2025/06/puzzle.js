const N = n => Number.parseInt(n)
const transN = a => a[0].map((_, c) => a.map(r => N(r[c])))

exports.puzzle = P = {

    part_1: T => (
        p => (
            (op, q) => op.reduce((ao, co, i) =>
                ao + (
                    co === '+'
                        ? q[i].reduce((a, c) => a + c, 0)
                        : q[i].reduce((a, c) => a * c, 1)

                ), 0)
        )(
            p.pop(), transN(p)
        ))(
            T.trim().split('\n').map(L => L.trim().split(/ +/))
        ),

    part_2: T => {
        let p = T.split('\n').slice(0, -1)
        let op = p.pop()
        if (p.length < 4)
            p.push(new Array(op.length + 1).join(' '))
        let s = 0
        for (let o = [], i = op.length - 1; i >= 0; i--) {
            o.push(N(p[0][i] + p[1][i] + p[2][i] + p[3][i]))
            op[i] !== ' ' && (
                s += op[i] === '+'
                    ? o.reduce((a, c) => a + c, 0)
                    : o.reduce((a, c) => a * c, 1),
                o = [],
                i--
            )
        }
        return s
    }

}

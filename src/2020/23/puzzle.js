const P = {

    list: (T, i) => (i <= T.length) ? T[i - 1] : i,

    output: l => {
        let s = '', n = l.n
        while (n !== l) {
            s += n.v
            n = n.n
        }
        return 1 * s
    },

    run: (T, N, L) => {
        let l = {}
        for (let i = 1; i <= N; i++)
            l[i] = { v: i }
        for (let i = 1; i <= N; i++)
            l[P.list(T, i)].n = l[P.list(T, i % N + 1)]
        let c = l[P.list(T, 1)]
        for (let i = 1; i <= L; i++) {
            let p = c.n, v = c.v, d
            c = (c.n = p.n.n.n)
            do
                d = l[v = (v + N - 2) % N + 1]
            while (d === p || d === p.n || d === p.n.n)
            p.n.n.n = d.n
            d.n = p
        }
        return l[1]
    },

    part_1: T => P.output(P.run(T, 9, 1e2)),

    part_2: T => (r => r.v * r.n.v)(P.run(T, 1e6, 1e7).n)

}

exports.puzzle = P
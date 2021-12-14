exports.puzzle = P = {

    prep: (T, n) => {
        const p = T.split('\n\n')
        const q = {
            s: p[0],
            a: p[1].split('\n').map(l => l.split(' -> '))
        }
        q.o = q.a.reduce((o, a) => {
            const k = a[0]
            const v = a[1]
            const c = new Array(n + 1).fill(0)
            c[0] = (q.s.match(new RegExp(`(?=${k})`, 'g')) || []).length
            o[k] = {
                v: v,
                n: [k[0] + v, v + k[1]],
                c: c
            }
            return o
        }, {})
        q.c = T.replace(/[\s->]/g, '').split('').reduce((o, c) => {
            if (!o.hasOwnProperty(c))
                o[c] = new Array(n + 1).fill(0)
            o[c][0] = (q.s.match(new RegExp(c, 'g')) || []).length
            return o
        }, {})
        return q
    },

    step: (o, n) => Object.keys(o).map(k => [0, 1].map(l => o[o[k].n[l]].c[n + 1] += o[k].c[n])),

    count: (p, n) => Object.keys(p.o).reduce((o, k) => {
        [0, 1].map(l => o[k[l]] = o[k[l]] + p.o[k].c[n])
        p.c[p.o[k].v][n + 1] += p.o[k].c[n]
        return o
    }, {}),

    run: (T, n) => {
        const p = P.prep(T, n)
        for (let i = 0; i < n; i++) {
            P.step(p.o, i)
            P.count(p, i)
        }
        const s = Object.keys(p.c).map(k => [k, p.c[k].reduce((a, b) => a + b)]).sort((a, b) => a[1] - b[1])
        return s[s.length - 1][1] - s[0][1]
    },

    part_1: T => P.run(T, 10),

    part_2: T => P.run(T, 40)

}

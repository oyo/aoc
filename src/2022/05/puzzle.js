exports.puzzle = P = {

    prep: T => T.split('\n\n').map(L => L.split('\n')),

    parseCrates: C => C.map(c => c.match(/.{3,4}/g).map(d => d.replace(/[ \[\]]/g, ''))),

    transposeCrates: C => C[0].reduce((a, _, c) => {
        a[c] = C.reduce((b, _, r) => {
            b[C.length - r - 1] = C[r][c]
            return b
        }, []).filter(E => E)
        return a
    }, []),

    parseMoves: M => M
        .map(m => m.split(/move | from | to /).slice(1).map(o => Number.parseInt(o)))
        .filter(n => n.length > 0),

    move1: (C, M) => {
        for (let i = 0; i < M[0]; i++)
            C[M[2] - 1].push(C[M[1] - 1].pop())
        return C
    },

    moveN: (C, M) => {
        const n = M[0]
        const s = M[1] - 1
        const t = M[2] - 1
        C[t] = C[t].concat(C[s].splice(-n, n))
        return C
    },

    process: (T, move) => (([c, m]) => {
        const d = P.transposeCrates(P.parseCrates(c.slice(0, -1)))
        P.parseMoves(m).forEach(n => move(d, n))
        return d.map(d => d.at(-1)).join('')
    })(P.prep(T)),

    part_1: T => P.process(T, P.move1),

    part_2: T => P.process(T, P.moveN)

}

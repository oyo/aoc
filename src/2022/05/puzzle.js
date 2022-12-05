exports.puzzle = P = {

    prep: T => T.split('\n\n').map(L => L.split('\n')),

    parseCrates: C => C.map(c => c.match(/.{3,4}/g).map(d => d.replace(/[ \[\]]/g, ''))),

    transposeCrates: C => {
        const o = C[0].map(c => [])
        for (let c = 0; c < o.length; c++)
            for (let r = C.length - 1; r >= 0; r--)
                o[c][r] = C[r][c]
        return o.map(D => D.reverse().filter(E => E))
    },

    parseMoves: M => M.map(m => m.split(/(move | from | to )/))
        .filter(n => n.length > 6)
        .map(n => [n[2], n[4], n[6]].map(o => Number.parseInt(o))),

    move1: (C, M) => {
        for (let i = 0; i < M[0]; i++)
            C[M[2] - 1].push(C[M[1] - 1].pop())
        return C
    },

    moveN: (C, M) => {
        const n = M[0]
        const s = M[1] - 1
        const t = M[2] - 1
        C[t] = C[t].concat(C[s].splice(C[s].length - n, n))
        return C
    },

    process: (T, move) => (([c, m]) => {
        const d = P.transposeCrates(P.parseCrates(c.slice(0, c.length - 1)))
        P.parseMoves(m).forEach(n => move(d, n))
        return d.map(d => d.pop()).join('')
    })(P.prep(T)),

    part_1: T => P.process(T, P.move1),

    part_2: T => P.process(T, P.moveN)

}

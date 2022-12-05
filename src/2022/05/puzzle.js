exports.puzzle = P = {

    prep: T => T.split('\n\n').map(L => L.split('\n')),

    parseCrates: C => C.map(c => c.match(/.{3,4}/g).map(d => d.replace(/[ \[\]]/g,''))),

    transposeCrates: C => {
        const o = C[0].map(c => new Array(C.length).fill(''))
        for (let c=0; c < o.length; c++) {
            for (let r = C.length-1; r>=0; r--) {
                o[c][r] = C[r][c]
            }
        }
        return o.map(D => D.reverse().filter(E => E !== ''))
    },

    parseMoves: M => M.map(m => m.split(/(move | from | to )/)).filter(n => n.length>6).map(n => [n[2], n[4], n[6]].map(o => Number.parseInt(o))),

    move: (C, M) => {
        const n = M[0]
        for (let i=0; i<n; i++) {
            C[M[2]-1].push(C[M[1]-1].pop())
        }
        return C
    },

    move2: (C, M) => {
        const n = M[0]
        const s = M[1]-1
        let t = M[2]-1
        const mc = C[s].splice(C[s].length-n,n)
        C[t] = C[t].concat(mc)
        return C
    },

    part_1: T => {
        const p = P.prep(T)
        const d = P.parseCrates(p[0].slice(0, p[0].length-1))
        let c = P.transposeCrates(d)
        const m = P.parseMoves(p[1])
        for (let i=0; i<m.length; i++)
            c = P.move(c, m[i])
        const r = c.map(d => d.pop())
        return r.join('')
    },

    part_2: T => {
        const p = P.prep(T)
        const d = P.parseCrates(p[0].slice(0, p[0].length-1))
        let c = P.transposeCrates(d)
        const m = P.parseMoves(p[1])
        for (let i=0; i<m.length; i++)
            c = P.move2(c, m[i])
        const r = c.map(d => d.pop())
        return r.join('')
    }

}

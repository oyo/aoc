const N = n => Number.parseInt(n)

exports.puzzle = P = {

    prep: T => T.trim().split('\n').map(L => L.split(' ').map(N)),

    part_1: T => {
        const p = P.prep(T)
        const d = p.map(r => r.map((n, i) => n - r[i - 1]).slice(1))
        const s = d.map((r, i) => r.filter(n => n !== 0 && Math.abs(n) < 4)).filter((r, i) => r.length === d[i].length)
        const m = s.map((r, i) => r.map(n => n === 0 ? 0 : n / Math.abs(n)))
        const f = m.filter((r, i, l) => Math.abs(r.reduce((a, o) => a + o, 0)) === r.length)
        return f.length
    },

    part_2: T => {
        const p = P.prep(T)
        return p.length
    }

}

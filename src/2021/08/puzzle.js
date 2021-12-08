exports.puzzle = P = {

    prep: T => T.split('\n').map(L => L.split(' | ').map(p => p.split(' '))),

    findSegmentMapping: s => {
        const w = s.sort((a, b) => a.length - b.length).map(w => w.split(''))
        const k = Object.values(w.flatMap(v => v).reduce((o, c) => {
            if (o.hasOwnProperty(c))
                o[c][0]++
            else
                o[c] = [1, c]
            return o
        }, [])).reduce((o, a) => { o[a[0]].push(a[1]); return o }, [0, 0, 0, 0, [], 0, [], [], [], []])
        return [
            w[1].filter(n => !w[0].includes(n))[0],
            k[6][0],
            w[0].filter(n => n !== k[9][0])[0],
            k[7].filter(n => w[2].includes(n))[0],
            k[4][0],
            k[9][0],
            k[7].filter(n => !w[2].includes(n))[0]
        ]
    },

    findDigit: (w, r) => {
        switch (w.length) {
            case 2: return 1
            case 3: return 7
            case 4: return 4
            case 7: return 8
            case 5: return w.includes(r[1]) ? 5 : (w.includes(r[4]) ? 2 : 3)
            case 6: return !w.includes(r[2]) ? 6 : (!w.includes(r[4]) ? 9 : 0)
        }
    },

    findCode: u => u[1].map(v => P.findDigit(v, P.findSegmentMapping(u[0]))).join('') * 1,

    part_1: T => P.prep(T).map(L => L[1].map(s => s.length).filter(c => c !== 5 && c !== 6).length).reduce((a, b) => a + b),

    part_2: T => P.prep(T).map(u => P.findCode(u)).reduce((a, b) => a + b)

}

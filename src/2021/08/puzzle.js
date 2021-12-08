const _ = require('lodash')

exports.puzzle = P = {

    prep: T => T.split('\n').map(L => L.split(' | ').map(p => p.split(' '))),

    part_1: T => T.split('\n').map(L => L.split(' | ')[1].split(' ').map(s => s.length).filter(c => c === 2 || c === 3 || c === 4 || c === 7).length).reduce((a, b) => a + b),

    findSegmentMapping: s => {
        const w = s.sort((a, b) => a.length - b.length).map(w => w.split('').sort())
        const k = Object.values(w.flatMap(v => v).reduce((o, c, i) => {
            if (o.hasOwnProperty(c))
                o[c][0]++
            else
                o[c] = [1, c]
            return o
        }, []))
        const r = [
            w[1].filter(n => !w[0].includes(n))[0],
            k.filter(n => n[0] === 6)[0][1],
            0,
            0,
            k.filter(n => n[0] === 4)[0][1],
            k.filter(n => n[0] === 9)[0][1],
            0
        ]
        r[2] = w[0].filter(n => n !== r[5])[0]
        const c7 = k.filter(n => n[0] === 7).map(n => n[1])
        r[3] = c7.filter(n => w[2].includes(n))[0]
        r[6] = c7.filter(n => !w[2].includes(n))[0]
        return r
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

    findDigits: (w, r) => w.map(v => P.findDigit(v, r)),

    findCode: u => u[1].map(v => P.findDigit(v, P.findSegmentMapping(u[0]))).join('') * 1,

    part_2: T => P.prep(T).map(u => P.findCode(u)).reduce((a, b) => a + b)

}

const N = Number.parseInt

const CARD = '23456789TJQKA'
const CARD2 = 'J23456789TQKA'

exports.puzzle = P = {

    prep: T => T.trim().split('\n').map(L => L.split(/\s+/)).map((v) => [v[0], N(v[1])]),

    count: h => h.split('').reduce((a, c, i, o) => {
        const cnt = o.filter(cc => cc === c).length;
        (a[cnt] = a[cnt] || new Set()).add(c)
        return a
    }, {}),

    count2: h => h === 'JJJJJ'
        ?  { '5': new Set().add('J') }
        : h.split('').reduce((a, c, i, o) => {
        if (c === 'J')
            return a
        const cnt = o.filter(cc => cc === c || cc === 'J').length;
        (a[cnt] = a[cnt] || new Set()).add(c)
        return a
    }, {}),

    strength: h => {
        if (h['5'])
            return 6
        if (h['4'])
            return 5
        if (h['3'])
            return h['2'] ? 4 : 3
        if (h['2'])
            return [...h['2']].length === 2 ? 2 : 1
        return 0
    },

    strength2: h => {
        if (h['5'])
            return 6
        if (h['4'])
            return 5
        if (h['3'])
            return ((h.J === 0 && h['2']) || (h.J === 1 && [...h['3']].length === 2)) ? 4 : 3
        if (h['2'])
            return (h.J === 0 && [...h['2']].length === 2) ? 2 : 1
        return 0
    },

    order: (a, b) => {
        const cmp = a[3] - b[3]
        if (cmp !== 0)
            return cmp
        let v = 0
        for (let i = 0; v === 0 && i < 5; i++) {
            v = CARD.indexOf(a[0][i]) - CARD.indexOf(b[0][i])
        }
        return v
    },

    order2: (a, b) => {
        const cmp = a[3] - b[3]
        if (cmp !== 0)
            return cmp
        let v = 0
        for (let i = 0; v === 0 && i < 5; i++) {
            v = CARD2.indexOf(a[0][i]) - CARD2.indexOf(b[0][i])
        }
        return v
    },

    part_1: T => {
        const p = P.prep(T)
        const q = p.map(h => [...h, P.count(h[0])])
        const r = q.map(h => [...h, P.strength(h[2])])
        const s = r.sort(P.order)
        return s.reduce((a, c, i) => a + (i + 1) * c[1], 0)
    },

    part_2: T => {
        const p = P.prep(T)
        const q = p.map(h => [...h, P.count2(h[0])])
        q.forEach(h => h[2].J = h[0].split('').filter(cc => cc === 'J').length)
        const r = q.map(h => [...h, P.strength2(h[2])])
        const s = r.sort(P.order2)
        return s.reduce((a, c, i) => a + (i + 1) * c[1], 0)
    }

}

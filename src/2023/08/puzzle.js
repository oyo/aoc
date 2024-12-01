const _ = require('lodash')
const N = Number.parseInt

exports.puzzle = P = {

    prep: T => T.trim().split('\n\n').map(B => B.split('\n')),

    part_1: T => {
        const p = P.prep(T)
        const w = p[0][0].split('')
        const m = p[1].map(L => L.split(/( = \(|, |\))/)).map(L => [L[0], L[2], L[4]])
            .reduce((a,c) => {
                const key = c.shift()
                a[key] = c
                return a
            }, {})
        let i = 0
        let l = 'AAA'
        for (; l !== 'ZZZ'; i++) {
            const lr = w[i % w.length]
            //console.log(lr, w[i % w.length])
            l = m[l][lr === 'L' ? 0 : 1]
            //console.log(l)
        }
        return i
    },

    part_2: T => {
        const p = P.prep(T)
        const w = p[0][0].split('')
        console.log(w)
        const q = p[1].map(L => L.split(/( = \(|, |\))/)).map(L => [L[0], L[2], L[4]])
        console.log(q)
        const l = q.flatMap(r => r[0]).filter(r => r[2] === 'A')
        console.log(l)
        const lp = l.map(k => {
            for (; j < l.length; j++) {
                const lr = w[i % w.length]
                l[j] = m[l[j]][lr === 'L' ? 0 : 1]
                //console.log(l)
            }
        })
        const m = q.reduce((a,c) => {
                const key = c.shift()
                a[key] = c
                return a
            }, {})
        console.log(m)
        let i = 0
        const allZ = l => {
            //console.log('check', l)
            let allz = true
            for (let i = 0; (i < l.length) && allz; i++)
                allz = l[i].charAt(2) === 'Z'
            return allz
        }
        for (; !allZ(l); i++) {
            for (let j = 0; j < l.length; j++) {
                const lr = w[i % w.length]
                l[j] = m[l[j]][lr === 'L' ? 0 : 1]
                //console.log(l)
            }
        }
        return i
    }

}

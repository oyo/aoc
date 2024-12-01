const _ = require('lodash')
const N = Number.parseInt
const tp = a => a[0].map((_, c) => a.map(r => r[c]));

exports.puzzle = P = {

    prep: T => T.trim().split('\n'),

    part_1: T => {
        const p = P.prep(T)
        console.log(p.filter(L => !L.includes('#')))
        console.log(tp(p.map(l => l.split(''))).map(l => l.join('')).filter(L => !L.includes('#')))
        return p.length
    },

    part_2: T => {
        const p = P.prep(T)
        return p.length
    }

}

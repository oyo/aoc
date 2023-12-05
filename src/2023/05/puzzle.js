const _ = require('lodash')
const N = n => Number.parseInt(n)
const chunks = (array, chunkSize = 2) => {
    const result = []
    for (let i = 0; i < array.length; i += chunkSize)
        result.push(array.slice(i, i + chunkSize))
    return result
}

exports.puzzle = P = {

    prep: T => T.trim()
        .split(/\n\n/)
        .map(C => C.split(/\n/))
        .map((m, i) => i === 0
            ? m[0].replace(/^.*:\s+/, '').split(/\s+/).map(N)
            : m.slice(1).map(v => v.split(/\s+/).map(N))
        ),

    part_1: T => {
        const p = P.prep(T)
        let s = p.shift()
        return Math.min.apply(null, p.reduce((a, c) => {
            const q = a.map(seed => c.filter(r => seed >= r[1] && seed < r[1] + r[2]))
            return a.map((s, i) => q[i].length === 0 ? s : s + (q[i][0][0] - q[i][0][1]))
        }, s))
    },

    part_2: T => {
        const p = P.prep(T)
        let s = chunks(p.shift()).map(c => new Array(c[1]).fill().map((_, i) => c[0] + i)).flat()
        s = p.reduce((a, c) => {
            const q = a.map(seed => c.filter(r => seed >= r[1] && seed < r[1] + r[2]))
            return a.map((s, i) => q[i].length === 0 ? s : s + (q[i][0][0] - q[i][0][1]))
        }, s)
        return Math.min.apply(null, s)
    }

}

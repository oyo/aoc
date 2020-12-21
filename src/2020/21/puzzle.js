const _ = require('lodash')

const P = {

    prep: T => T.split('\n')
        .map(L => L.split(/ \(contains |\)/)
        .map(a => a.split(/,? /)))
        .map(a => [a[1],a[0]]),

    filt: (p,n) => _.intersection(...p.filter(a => a[0].indexOf(n) >= 0).map(b => b[1])),

    identify: p => {
        let a = _.uniq(p.flatMap(a => a[0]))
            .map(n => [n, P.filt(p,n)])
        let allindex = []
        // TODO:
        // not needed for part_1
        while (a.length > 0) {
            a.filter(r => r[1].length === 1)
                .forEach(r => {
                    const idx = r[1][0]
                    allindex.push([idx, r[0]])
                    a = a.map(y => [y[0], y[1].filter(fi => fi !== idx)])
                })
            a = a.filter(r => r[1].length > 0)
        }
        return allindex
    },

    part_1: T => (
        p => p.flatMap(a => a[1])
            .filter(l =>
                !P.identify(p).flatMap(c =>
                    c[0]).includes(l)
            ).length
        )(P.prep(T)),

    part_2: T => P.identify(P.prep(T)).sort((a,b) => a[1].localeCompare(b[1])).flatMap(c => c[0]).join(',')

}

exports.puzzle = P
const _ = require('lodash')

const P = {

    prep_1: T => T.split('\n').map(L => L
        .split(/(s? contain )|(s?, )|(s?\.)/)
        .filter(b => b && b.match(/^.*bag$/) && !b.match(/no other/))
        .map(b => b.substring(0,b.length-4).replace(/^\d /,''))),

    prep_2: T => T.split('\n').map(L => L
        .split(/(s? contain )|(s?, )|(s?\.)/)
        .filter(b => b && b.match(/^.*bag$/) && !b.match(/no other/))
        .flatMap(b => [b.substring(0,b.length-4)]
            .flatMap(c => c.match(/^\d+ /) ? new Array(c.substring(0,2).trim()*1).fill(c.substring(2).trim()) : c)
        )),

    part_1: T => {
        const p = P.prep_1(T)
        let t = ['shiny gold']
        let u = []
        let all = false
        while (!all) {
            u = p.filter(a => _.intersection(t,a).length>0).map(a => a[0])
            all = t.length === u.length
            t = _.union(t,u)
        }
        return t.length-1
    },

    getBagsRek: (B, n) => B[n].length + B[n].reduce((a,b) => a + P.getBagsRek(B, b), 0),

    part_2: T => P.getBagsRek(
        P.prep_2(T).reduce((b,a) => {
            b[ a.shift() ] = a
            return b
        },{}),
        'shiny gold'
    )

}

exports.puzzle = P
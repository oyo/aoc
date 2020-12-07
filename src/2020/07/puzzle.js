const _ = require('lodash')

const P = {

    prep_1: T => T.split('\n').map(L => L
        .split(/(s? contain )|(s?, )|(s?\.)/)
        .filter(b => b && b.match(/^.*bag$/) && !b.match(/no other/))
        .map(b => b.substring(0,b.length-4).replace(/^\d /,''))),

    prep_2: T => T.split('\n').map(L => L
        .split(/(s? contain )|(s?, )|(s?\.)/)
        .filter(b => b && b.match(/^.*bag$/) && !b.match(/no other/))
        .map(b => b.substring(0,b.length-4))
        .flatMap(b => b.match(/^\d+ /)
            ? new Array(b.substring(0,2).trim()*1).fill(b.substring(2).trim())
            : b
        ))
        .reduce((b,a) => {
            b[ a.shift() ] = a
            return b
        },{}),

    canFindIn: (B, n) => {
        let t = [n]
        let u = []
        let all = false
        while (!all) {
            u = B.filter(a => _.intersection(t,a).length>0).map(a => a[0])
            all = t.length === u.length
            t = _.union(t,u)
        }
        return t
    },

    countRek: (B, n) => B[n].length + B[n].reduce((a,b) => a + P.countRek(B, b), 0),

    part_1: T => P.canFindIn(P.prep_1(T), 'shiny gold').length - 1,

    part_2: T => P.countRek(P.prep_2(T), 'shiny gold')

}

exports.puzzle = P
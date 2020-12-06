const _ = require('lodash')

const P = {

    prep: T => T.replace(/\n/g,' ').split(/  /).map(L => L.split(' ')),

    part_1: T => P.prep(T).map(g => _.union(g.flatMap(a => a.split(''))).length).reduce((a,b) => a+b),
 
    part_2: T => P.prep(T).map(g => _.intersection(...g.map(a => a.split(''))).length).reduce((a,b) => a+b)

}

exports.puzzle = P
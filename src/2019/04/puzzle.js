const _ = require('lodash')

const P = {

    matches_1: n => {
        let inc=true;
        let dbl=false;
        const v = ''+n;
        for (let i=0; i<6 && inc; i++) {
            inc = inc && v.charAt(i)>=v.charAt(i-1);
            dbl = dbl || v.charAt(i)===v.charAt(i-1);
        }
        return inc && dbl
    },

    matches_2: n => {
        return P.matches_1(n) && true
    },

    part_1: T => {
        const r = T.split('-')
        return _.range(r[0],r[1]).filter(n => P.matches_1(n)).length
    },

    part_2: T => {
        const p = P.prep(T)
        return p.length
    }

}

exports.puzzle = P
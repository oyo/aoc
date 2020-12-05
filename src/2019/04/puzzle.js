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

    matches_2: n => P.matches_1(n)
        && (''+n).replace(/(?:(?!(\d)\1{1}).)/g,'').replace(/(\d)\1+/g,'').length > 0,

    part_1: T => (r => _.range(r[0],r[1]).filter(n => P.matches_1(n)).length)(T.split('-')),

    part_2: T => (r => _.range(r[0],r[1]).filter(n => P.matches_2(n)).length)(T.split('-'))

}

exports.puzzle = P
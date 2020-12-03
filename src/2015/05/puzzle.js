const _ = require('lodash');

const P = {

    nice: s => 
        !s.match(/(ab|cd|pq|xy)/) &&
        s.replace(/[bcdfghjklmnpqrstvwxyz]/g,'').length > 2 &&
        !!s.match(/(.)\1/),

    nicer: s => 
        !!s.match(/(.).\1/) &&
        !!s.match(/(..).*\1/),

    part_1: T => T.split('\n').filter(L => P.nice(L)).length,

    part_2: T => T.split('\n').filter(L => P.nicer(L)).length

}

exports.puzzle = P
const _ = require('lodash');

const puzzle = {

    isNice: (s) => 
        !s.match(/(ab|cd|pq|xy)/) &&
        s.replace(/[bcdfghjklmnpqrstvwxyz]/g,'').length > 2 &&
        !!s.match(/(.)\1/),

    isNicer: (s) => 
        !!s.match(/(.).\1/) &&
        !!s.match(/(..).*\1/),


    part_1: (input) => _.filter(input.split('\n'), (line) => puzzle.isNice(line)).length,

    part_2: (input) => _.filter(input.split('\n'), (line) => puzzle.isNicer(line)).length

}

exports.puzzle = puzzle
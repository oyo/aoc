const _ = require('lodash')

const P = {

    prep: T => T.replace(/[FL]/g,'0').replace(/[BR]/g,'1').split('\n').sort() .map(S => parseInt(S,2)),

    part_1: T => _.max(P.prep(T)),

    part_2: T => _.max(_.pullAll([...Array(P.part_1(T)).keys()],P.prep(T)))

}

exports.puzzle = P
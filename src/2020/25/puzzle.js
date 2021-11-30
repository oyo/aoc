const _ = require('lodash')

const P = {

    prep: T => T.split('\n').map(L => L * 1),

    loops: pk => {
        let i = 0
        for (let v = 1, s = 7; (pk - v) !== 0; i++)
            v = (v * s) % 20201227
        return i
    },

    key: (s, l) => {
        let v = 1
        for (let i = 0; i < l; i++)
            v = (v * s) % 20201227
        return v
    },

    part_1: T => (p => P.key(p[0], P.loops(p[1])))(P.prep(T)), // or P.key(p[1],l0)

    part_2: T => 0

}

exports.puzzle = P
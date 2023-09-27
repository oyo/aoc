const _ = require('lodash')

exports.puzzle = P = {

    prep: T => T.trim().split('\n').map(L => L.split(',')),

    part_1: T => {
        const p = P.prep(T)
        return '-'
    },

    part_2: T => {
        const p = P.prep(T)
        return '-'
    }

}

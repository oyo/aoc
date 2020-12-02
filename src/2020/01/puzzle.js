const _ = require('lodash');

const P = {

    prep: T => _.map(T.split('\n'), L => parseInt(L)),

    part_1: T => {
        const p = P.prep(T) 
        return _.max(p.flatMap(i => 
            p.map(j => i + j === 2020 ? i * j : 0 )
        ))
    },

    part_2: T => {
        const p = P.prep(T) 
        return _.max(p.flatMap(i => 
            p.flatMap(j => 
                p.map(k => i + j + k === 2020 ? i * j * k : 0 )
            )
        ))
    }

}

exports.puzzle = P
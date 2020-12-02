const _ = require('lodash');

const puzzle = {

    prep: (input) => _.map(input.split('\n'), line => parseInt(line)),

    part_1: (input) => {
        const p = puzzle.prepa(input) 
        const r = _.max(p.flatMap(i => 
            p.map(j => i + j === 2020 ? i * j : 0 )
        ))
        return r
    },

    part_2: (input) => {
        const p = puzzle.prep(input) 
        const r = _.max(p.flatMap(i => 
            p.flatMap(j => 
                p.map(k => i + j + k === 2020 ? i * j * k : 0 )
            )
        ))
        return r
    }

}

exports.puzzle = puzzle
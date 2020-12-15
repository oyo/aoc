require('lodash.product');
const _ = require('lodash');

const puzzle = {

    prepare: (input) => _.map(input.split('\n'), line => parseInt(line)),

    part_1: (input) => {
        const p = puzzle.prepare(input) 
        return _.filter(_.product(p, p), (v) => _.sum(v) === 2020)[0].reduce( (a, b) => a * b )
    },

    part_2: (input) => {
        const p = puzzle.prepare(input)
        return _.filter(_.product(p, p, p), (v) => _.sum(v) === 2020)[0]
            .reduce( (a, b) => a * b )
    }

}

exports.puzzle = puzzle
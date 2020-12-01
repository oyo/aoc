const _ = require('lodash');

const puzzle = {

    part_1: (input) => {
        const split = _.map(input.split('\n'), (line) => line.split(','))
        return input.length
    },

    part_2: (input) => {
        const characters = _.uniq(input.trim().split('').sort()).join('')
        return characters.length + ' unique'
    }

}

exports.puzzle = puzzle
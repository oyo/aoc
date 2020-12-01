const _ = require('lodash');

exports.puzzle = {

    part_1: (input) => {
        let floor = 0
        _.each(input.trim(), c => floor += c==='(' ? 1 : -1)
        return floor
    },

    part_2: (input) => {
        let floor = 0
        let pos = 0
        _.each(input.trim(), (c, i) => {
            if ((floor += c==='(' ? 1 : -1) === -1) {
                pos = i+1
                return false
            }
        })
        return pos
    }

}

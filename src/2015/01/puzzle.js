const _ = require('lodash');

exports.puzzle = {

    part_1: T => {
        let floor = 0
        _.each(T, c => floor += c==='(' ? 1 : -1)
        return floor
    },

    part_2: T => {
        let floor = 0
        let pos = 0
        _.each(T, (c, i) => {
            if ((floor += c==='(' ? 1 : -1) === -1) {
                pos = i+1
                return false
            }
        })
        return pos
    }

}

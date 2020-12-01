const { multiply } = require('lodash');
const _ = require('lodash');

const puzzle = {

    parse: (input) => _.map(input.trim().split('\n'), line => line.split('x').map(m => parseInt(m))),

    getPaper: (box) => { 
        const a = [
            box[0] * box[1],
            box[1] * box[2],
            box[0] * box[2]
        ]
        return 2 * (a[0] + a[1] + a[2]) + _.min(a)
    },

    getRibbon: (box) => {
        const slack = box.reduce((a, b) => a * b)
        const sbox = _.sortBy(box)
        return 2 * (sbox[0] + sbox[1]) + slack
    },

    part_1: (input) => {
        const boxes = puzzle.parse(input)
        let paper = 0
        _.each(boxes, (box) => paper += puzzle.getPaper(box))
        return paper
    },

    part_2: (input) => {
        const boxes = puzzle.parse(input)
        let ribbon = 0
        _.each(boxes, (box) => ribbon += puzzle.getRibbon(box))
        return ribbon
    }

}

exports.puzzle = puzzle
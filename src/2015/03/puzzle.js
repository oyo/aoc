const _ = require('lodash');

const puzzle = {

    nSantas: (input, n) => {
        let start = 500500
        let s = new Array(n).fill(start)
        let coords = [start]
        _.each(input, (c,i) => {
            const ci = i % n
            switch (c) {
                case '>': s[ci] += 1000; break
                case '<': s[ci] -= 1000; break
                case '^': s[ci] ++; break
                case 'v': s[ci] --; break
            }
            coords.push(s[ci])
        })
        return _.uniq(_.sortBy(coords)).length
    },

    part_1: (input) => puzzle.nSantas(input, 1),

    part_2: (input) => puzzle.nSantas(input, 2)

}

exports.puzzle = puzzle
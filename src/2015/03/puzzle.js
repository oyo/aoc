const _ = require('lodash');

const P = {

    santas: (T, n) => {
        let start = 500500
        let s = new Array(n).fill(start)
        let coords = [start]
        _.each(T, (c,i) => {
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

    part_1: T => P.santas(T, 1),

    part_2: T => P.santas(T, 2)

}

exports.puzzle = P
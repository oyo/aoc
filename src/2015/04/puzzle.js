const _ = require('lodash');
const crypto = require('crypto');

const puzzle = {

    hashWithLeading0: (input, l) => {
        const h = (v) => crypto.createHash('md5').update(v).digest('hex')
        const cmp = new Array(l).fill('0').join('')
        let n = 0
        while (true) {
            const m = h(input + (++n))
            if (m.substr(0,l) === cmp)
                break;
        }
        return n;
    },

    part_1: (input) => puzzle.hashWithLeading0(input, 5),

    part_2: (input) => puzzle.hashWithLeading0(input, 6)

}

exports.puzzle = puzzle
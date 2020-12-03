const crypto = require('crypto');

const P = {

    hash: (T, l) => {
        const h = v => crypto.createHash('md5').update(v).digest('hex')
        const z = new Array(l).fill('0').join('')
        let n = 0
        while (true) {
            const m = h(T + ++n)
            if (m.substr(0,l) === z)
                break;
        }
        return n;
    },

    part_1: T => P.hash(T, 5),

    part_2: T => P.hash(T, 6)

}

exports.puzzle = P
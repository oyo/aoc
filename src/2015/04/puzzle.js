const crypto = require('crypto')

exports.puzzle = P = {

    hash: (T, l) => {
        T = T.trim()
        const p = new RegExp('^0{' + l + '}')
        const h = v => crypto.createHash('md5').update(v).digest('hex')
        let n = 0
        while (true)
            if (p.test(h(T + ++n)))
                break
        return n
    },

    part_1: T => P.hash(T, 5),

    part_2: T => P.hash(T, 6)

}

const _ = require('lodash');

const P = {

    prep: T => T.split('\n').map(L => L.split('x').map(m => parseInt(m))),

    paper: B => { 
        const a = [
            B[0] * B[1],
            B[1] * B[2],
            B[0] * B[2]
        ]
        return 2 * (a[0] + a[1] + a[2]) + _.min(a)
    },

    ribbon: B => {
        const slack = B.reduce((a, b) => a * b)
        const sbox = _.sortBy(B)
        return 2 * (sbox[0] + sbox[1]) + slack
    },

    part_1: T => {
        let paper = 0
        P.prep(T).forEach(B => paper += P.paper(B))
        return paper
    },

    part_2: T => {
        let ribbon = 0
        P.prep(T).forEach(B => ribbon += P.ribbon(B))
        return ribbon
    }

}

exports.puzzle = P
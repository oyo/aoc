const N = n => Number.parseInt(n)

const P = {

    prep: T => T.trim().split('\n').map(L => L.split('x').map(N).sort()),

    paper: B => (a = [B[0] * B[1],B[1] * B[2],B[0] * B[2]], 3*a[0] + 2*a[1] + 2*a[2]),

    ribbon: B => {
        const slack = B.reduce((a, b) => a * b)
        const sbox = _.sortBy(B)
        return 2 * (sbox[0] + sbox[1]) + slack
    },

    part_1: T => p = P.prep(T).reduce((a, c) => a + P.paper(c), 0),

    part_2: T => {
        let ribbon = 0
        P.prep(T).forEach(B => ribbon += P.ribbon(B))
        return ribbon
    }

}

exports.puzzle = P
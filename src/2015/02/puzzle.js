const N = n => Number.parseInt(n)

exports.puzzle = P = {

    prep: T => T.trim().split('\n').map(L => L.split('x').map(N).sort((a, b) => a - b)),

    paper: B => (a = [B[0] * B[1], B[1] * B[2], B[0] * B[2]], 3 * a[0] + 2 * a[1] + 2 * a[2]),

    ribbon: B => 2 * B[0] + 2 * B[1] + B[0] * B[1] * B[2],

    part_1: T => P.prep(T).reduce((a, c) => a + P.paper(c), 0),

    part_2: T => P.prep(T).reduce((a, c) => a + P.ribbon(c), 0)

}

exports.puzzle = P = {

    slope: (R, d) => {
        let count = 0
        let x = -d[0]
        R.forEach((r, y) => count += !(y % d[1]) && r[x = (x + d[0]) % r.length] === '#' ? 1 : 0)
        return count
    },

    part_1: T => P.slope(T.split('\n'), [3, 1]),

    part_2: T => [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
        .map(s => P.slope(T.split('\n'), s))
        .reduce((a, b) => a * b)

}

exports.puzzle = P = {

    different: (p, n) => {
        let i = 0
        for (let f = 0; i < p.length - n && f !== n; i++)
            f = [...new Set(p.substring(i, i + n))].length
        return i + n - 1
    },

    part_1: T => P.different(T, 4),

    part_2: T => P.different(T, 14)

}

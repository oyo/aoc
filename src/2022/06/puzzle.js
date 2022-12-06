exports.puzzle = P = {

    prep: T => T.trim(),

    different: (T, n) => {
        const p = P.prep(T)
        let i = 0
        for (let f = 0; i < p.length - n && f !== n; i++)
            f = [...new Set(p.substring(i, i + n))].length
        return i + n - 1
    },

    part_1: T => P.different(T, 4),

    part_2: T => P.different(T, 14)

}

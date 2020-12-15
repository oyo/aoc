const P = {

    run: (T, n) => {
        const mem = new Map()
        T.split(',').forEach((n, i) => mem.set(n * 1, [i + 1]))
        let last = mem[6]
        for (let i = 7; i < n; i++) {
            const num = mem.has(last)
                ? i - mem.get(last)
                : 0
            mem.set(last, i)
            last = num
        }
        return last
    },

    part_1: T => P.run(T, 2020),

    part_2: T => P.run(T, 30000000)

}

exports.puzzle = P
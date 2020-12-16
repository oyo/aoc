const P = {

    run: (T, n) => {
        const p = T.split(',')
        const mem = new Map()
        p.forEach((n, i) => mem.set(n * 1, [i + 1]))
        let last = mem[p.length-1]
        for (let i = p.length; i < n; i++) {
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
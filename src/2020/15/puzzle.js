const P = {

    run: (T, n) => {
        const p = T.split(',')
        let i = p.length
        let last = p[p.length - 1]
        const mem = p.reduce((a, n, i) => {
            a[n] = [i + 1, i + 1];
            return a
        }, {})
        let num = 0
        while (i++ < n) {
            if (i % 1000000 === 0)
                console.log(i)
            const lmem = mem[last]
            num = lmem[1] - lmem[0]
            let nmem = mem[num]
            if (!nmem) {
                nmem = [i, i]
                mem[num] = nmem
            } else {
                nmem[0] = nmem[1]
                nmem[1] = i
            }
            last = num
        }
        return num
    },

    part_1: T => P.run(T, 2020),

    part_2: T => P.run(T, 30000000)

}

exports.puzzle = P
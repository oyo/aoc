exports.puzzle = P = {

    santas: (T, n) => {
        const start = 500500
        const s = new Array(n).fill(start)
        const coords = T.split('').reduce((a, c, i) => {
            const ci = i % n
            switch (c) {
                case '>': s[ci] += 1000; break
                case '<': s[ci] -= 1000; break
                case '^': s[ci]++; break
                case 'v': s[ci]--; break
            }
            a.push(s[ci])
            return a
        }, [start])
        return new Set([...coords]).size
    },

    part_1: T => P.santas(T, 1),

    part_2: T => P.santas(T, 2)

}

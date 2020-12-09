const P = {

    prep: T => T.split('\n').map(L => L * 1),

    sumOf2Prev: (p, l) => {
        for (let i = l; i < p.length; i++) {
            const a = p.slice(i - l, i)
            let okay = false;
            for (let x = 0; x < l - 1 && !okay; x++)
                for (let y = x + 1; y < l && !okay; y++)
                    okay = a[x] + a[y] === p[i]
            if (!okay)
                return p[i]
        }
        return 0
    },

    sumOfRangeBounds: (p, n) => {
        for (let x = 0; x < p.length - 1; x++) {
            for (let y = x + 1, lower = true; y < p.length && lower; y++) {
                const s = p.slice(x, y)
                const sum = s.reduce((a, b) => a + b)
                if (sum > n)
                    lower = false
                else if (sum === n) {
                    const q = s.sort((a, b) => a - b)
                    return Math.min(...q) + Math.max(...q)
                }
            }
        }
        return 0
    },

    part_1: T => P.sumOf2Prev(P.prep(T), 25),

    part_2: T => P.sumOfRangeBounds(P.prep(T), 1124361034)

}

exports.puzzle = P
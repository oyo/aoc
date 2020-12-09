const P = {

    prep: T => T.split('\n').map(L => L * 1),

    notSumOf2Prev: (p, l) => {
        for (let i = l; i < p.length; i++) {
            const a = p.slice(i - l, i)
            let nok = true;
            for (let x = 0; x < l - 1 && nok; x++)
                for (let y = x + 1; y < l && nok; y++)
                    nok = a[x] + a[y] !== p[i]
            if (nok)
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
                else if (sum === n)
                    return Math.min(...s) + Math.max(...s)
            }
        }
        return 0
    },

    part_1: T => P.notSumOf2Prev(P.prep(T), 25),

    part_2: T => P.sumOfRangeBounds(P.prep(T), P.part_1(T))

}

exports.puzzle = P
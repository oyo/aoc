const P = {

    prep: T => (s => s.map((a, i) => i === 0 ? a : a - s[i - 1]))(T.split('\n').map(L => L * 1).sort((a, b) => a - b)),

    part_1: T => (d => (d.filter(a => a === 1).length * (d.filter(a => a === 3).length + 1)))(P.prep(T)),

    dp: (p, n) => {
        if (n === p.length - 1)
            return 1
        if (P.DP[n])
            return P.DP[n]
        let sum = 0
        for (let i = n + 1; i < p.length; i++)
            if (p[i] - p[n] <= 3)
                sum += P.dp(p, i)
        P.DP[n] = sum
        return sum
    },

    part_2: T => {
        const p = T.split('\n').map(L => L * 1).sort((a, b) => a - b)
        p.unshift(0)
        P.DP = {}
        return P.dp(p, 0)
    }

}

exports.puzzle = P
const N = n => Number.parseInt(n)

exports.puzzle = P = {

    prep: T => (d => [
        d[0].split('\n').map(L => L.split('-').map(N)),
        d[1].split('\n').map(N)
    ])(T.trim().split('\n\n')),

    part_1: T => (p => p[1].reduce((a, c) => {
        for (let r of p[0])
            if (c >= r[0] && c <= r[1])
                return a + 1
        return a
    }, 0))(P.prep(T)),

    part_2: T => P.prep(T)[0]
        .sort((a, b) => a[0] - b[0])
        .reduce((a, c, i) => {
            if (i === 0)
                return [c]
            let o = true
            for (let i = 0; i < a.length && o; i++)
                if ((c[0] >= a[i][0] && c[0] <= a[i][1] + 1) ||
                    (c[1] >= a[i][0] && c[1] <= a[i][1])) {
                    a[i] = [Math.min(a[i][0], c[0]), Math.max(a[i][1], c[1])]
                    o = false
                }
            if (o)
                a.push(c)
            return a
        }, [])
        .reduce((a, c) => a + (c[1] - c[0]) + 1, 0)

}

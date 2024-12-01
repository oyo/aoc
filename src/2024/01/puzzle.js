exports.puzzle = P = {

    prep: T => T
        .trim()
        .split('\n')
        .map(L => L
            .split(/\s+/)
            .map(n => Number.parseInt(n))
        )
        .reduce((a, o) => {
            a[0].push(o[0])
            a[1].push(o[1])
            return a
        }, [[], []])
        .map(k => k.sort()),

    part_1: T => (s => s[0]
        .reduce(
            (a, _, i) => a + Math.abs(s[0][i] - s[1][i]), 0
        )
    )(P.prep(T)),

    part_2: T => (s => s[0]
        .reduce(
            (a, o) => a + o * s[1].filter(p => p === o).length, 0
        )
    )(P.prep(T))
}

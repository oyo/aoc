const N = Number.parseInt
const M = a => Math.max.apply(null, a)

exports.puzzle = P = {

    prep: T => T.trim()
        .split('\n')
        .map(
            L => L.split(/(Game \d+: |; )/)
                .filter(W => W && !W.match(/(Game \d+: |; )/))
        )
        .map(
            (g, i) => [i + 1].concat(g.map(
                s => s.split(', ')
                    .reduce((a, c) => {
                        const d = c.split(' ')
                        switch (d[1]) {
                            case 'red': a[0] = N(d[0]); return a
                            case 'green': a[1] = N(d[0]); return a
                            case 'blue': a[2] = N(d[0]); return a
                            default: return a
                        }
                    }, [0, 0, 0])
            ))
        ),

    part_1: T => P.prep(T)
        .filter(s => s.slice(1).reduce(
            (a, c) => a && (c[0] < 13 && c[1] < 14 && c[2] < 15), true)
        ).reduce((a, c) => a + N(c[0]), 0),

    part_2: T => P.prep(T).map(
        g => g.slice(1).reduce(
            (a, c) => {
                a[0].push(c[0])
                a[1].push(c[1])
                a[2].push(c[2])
                return a
            }, [[], [], []]
        )
    ).reduce(
        (a, c) => a + M(c[0]) * M(c[1]) * M(c[2]), 0
    )

}

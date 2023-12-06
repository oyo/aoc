const N = n => Number.parseInt(n)

exports.puzzle = P = {

    prep_1: T => T.trim().split('\n')
        .map(L => L.split(/\s+/).slice(1).map(N)),

    prep_2: T => T.trim().split('\n')
        .map(L => N(L.split(/\s+/).slice(1).join(''))),

    race: r => {
        let w = 0
        for (let h = 1; h < r[0]; h++) {
            const d = (r[0]-h) * h
            if (d > r[1])
                ++w
        }
        return w
    },

    part_1: T => (
        p => p[0].reduce(
            (a,c,i) => a.concat([[p[0][i], p[1][i]]]), []
        )
        .map(P.race).reduce((a,c) => a*c, 1)
    )(
        P.prep_1(T)
    ),

    part_2: T => P.race(P.prep_2(T))

}

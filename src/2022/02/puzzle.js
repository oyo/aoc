exports.puzzle = P = {

    prep1: T => T.split('\n')
        .map(L => [L.charCodeAt(0) - 64, L.charCodeAt(2) - 87])
        .map(L => [L[1], (N => N === -2 ? 1 : N === 2 ? -1 : N)(L[1] - L[0])]),

    prep2: T => T.split('\n')
        .map(L => [L.charCodeAt(0) - 64, L.charCodeAt(2) - 89]),

    score: (p) => p.map(r => r[0] + (r[1] + 1) * 3).reduce((a, b) => a + b),

    part_1: T => P.score(P.prep1(T)),

    part_2: T => P.score(
        P.prep2(T).map(L => 
            L[1] === -1
            ? [L[0] === 1 ? L[0] + 2 : L[0] - 1, L[1]]
            : L[1] === 1
            ? [L[0] === 3 ? L[0] - 2 : L[0] + 1, L[1]]
            : L
        )
    )

}

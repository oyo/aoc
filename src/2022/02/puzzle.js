exports.puzzle = P = {

    prep: T => T.trim().split('\n').map(L => [L.charCodeAt(0) - 64, L.charCodeAt(2) - 87]),

    score: p => p.map(r => r[0] + r[1] * 3).reduce((a, b) => a + b),

    part_1: T => P.score(P.prep(T).map(L => [L[1], (L[1] - L[0] + 4) % 3])),

    part_2: T => P.score(P.prep(T).map(L => [(L[0] + L[1]) % 3 + 1, L[1] - 1]))

}

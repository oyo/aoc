exports.puzzle = P = {

    prep: T => T.split('\n').map(L => [L.charCodeAt(0) - 64, L.charCodeAt(2) - 87]),

    score: p => p.map(([a, b]) => a + b * 3).reduce((a, b) => a + b),

    part_1: T => P.score(P.prep(T).map(([a, b]) => [b, (b - a + 4) % 3])),

    part_2: T => P.score(P.prep(T).map(([a, b]) => [(a + b) % 3 + 1, b - 1]))

}

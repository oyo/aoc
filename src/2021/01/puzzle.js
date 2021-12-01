const P = {

    prep: T => T.split('\n').map(n => n * 1),

    countInc: p => p.map((a, i) => a - p[i - 1]).filter(v => v > 0).length,

    part_1: T => P.countInc(P.prep(T)),

    part_2: T => P.countInc((p => [...p].map((a, i) => p[i - 2] + p[i - 1] + p[i]))(P.prep(T)))

}

exports.puzzle = P
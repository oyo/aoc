exports.puzzle = P = {

    prep: T => T.split('\n').map(n => n * 1),

    countInc: p => p.reduce((s, a, i) => s += a > p[i - 1] ? 1 : 0, 0),

    part_1: T => P.countInc(P.prep(T)),

    part_2: T => P.countInc((p => [...p].map((a, i) => p[i - 2] + p[i - 1] + a))(P.prep(T)))

}

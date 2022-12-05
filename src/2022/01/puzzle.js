exports.puzzle = P = {

    prep: T => T.trim().split('\n\n').map(L => L.split('\n').reduce((a, c) => a + Number.parseInt(c), 0)),

    part_1: T => Math.max.apply(null, P.prep(T)),

    part_2: T => P.prep(T).sort((a, b) => b - a).slice(0, 3).reduce((a, c) => a + c, 0)

}

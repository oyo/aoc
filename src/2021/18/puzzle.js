const SnailNumber = require('./SnailNumber')

exports.puzzle = P = {

    prep: T => T.split('\n').map(L => JSON.parse(L)),

    part_1: T => SnailNumber.addNumbers(P.prep(T)).magnitude(),

    part_2: T => (l => Math.max(...l.flatMap(m => l.map(n => m === n ? [0, 0] : [m, n]))
        .map(p => SnailNumber.addNumbers(p).magnitude())
    ))(P.prep(T))

}

const {abs, min, max} = Math

exports.puzzle = P = {

    fuel: (T, f) => (p => min(...new Array(max(...p)).fill().map((_, h) => p.reduce((s, d) => s + f(abs(h - d)), 0))))(T.split(',').map(n => n * 1)),

    part_1: T => P.fuel(T, n => n),

    part_2: T => P.fuel(T, n => n * ++n >> 1)

}

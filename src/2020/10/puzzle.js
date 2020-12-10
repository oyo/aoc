const P = {

    prep: T => (s => s.map((a, i) => i === 0 ? a : a - s[i - 1]))(T.split('\n').map(L => L * 1).sort((a, b) => a - b)),

    part_1: T => (d => (d.filter(a => a === 1).length * (d.filter(a => a === 3).length + 1)))(P.prep(T)),

    part_2: T => P.prep(T).join('').split('3').reduce((a, b) => a * [1, 1, 2, 4, 7][b.length], 1)

}

exports.puzzle = P
const P = {

    prep: T => T.split('\n').map(L => L.split(/[- :]/)),

    match_1: L => new RegExp('^'+L[2]+'{'+L[0]+','+L[1]+'}$').test(
        L[4].replace(new RegExp('[^'+L[2]+']*', 'g'), '')
    ),

    match_2: L => (L[4][L[0]*1-1] === L[2]) ^ (L[4][L[1]*1-1] === L[2]),

    part_1: T => P.prep(T).filter(L => P.match_1(L)).length,

    part_2: T => P.prep(T).filter(L => P.match_2(L)).length

}

exports.puzzle = P
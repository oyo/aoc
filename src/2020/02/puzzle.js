const P = {

    prep: t => t.split('\n').map(l => l.split(/[- :]/)),

    match_1: l => new RegExp('^'+l[2]+'{'+l[0]+','+l[1]+'}$').test(
        l[4].replace(new RegExp('[^'+l[2]+']*', 'g'), '')
    ),

    match_2: l => (l[4].charAt(l[0]*1-1) === l[2]) ^ (l[4].charAt(l[1]*1-1) === l[2]),

    part_1: t => P.prep(t).filter(l => P.match_1(l)).length,

    part_2: t => P.prep(t).filter(l => P.match_2(l)).length

}

exports.puzzle = P
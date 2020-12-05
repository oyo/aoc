const P = {

    prep: T => T.replace(/[FL]/g,'0').replace(/[BR]/g,'1').split('\n').sort().map(s => parseInt(s,2)),

    part_1: T => Math.max(...P.prep(T)),

    part_2: T => Math.max(...(a => a.slice(1).map((n,i) => n-a[i]===2 ? a[i] : 0))(P.prep(T)))+1

}

exports.puzzle = P
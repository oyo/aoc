exports.puzzle = P = {

    prep: T => T.split('\n').map(L => L.split(',').map(M => M.split('-').map(N => Number.parseInt(N)))),

    part_1: T => P.prep(T).filter(L =>
            (L[0][0] <= L[1][0] && L[0][1] >= L[1][1]) ||
            (L[0][0] >= L[1][0] && L[0][1] <= L[1][1])
        ).length,

    part_2: T => P.prep(T).filter(L => 
            (L[0][0] >= L[1][0] && L[0][0] <= L[1][1]) ||
            (L[0][1] >= L[1][0] && L[0][1] <= L[1][1]) || 
            (L[1][0] >= L[0][0] && L[1][0] <= L[0][1]) ||
            (L[1][1] >= L[0][0] && L[1][1] <= L[0][1])
        ).length

}

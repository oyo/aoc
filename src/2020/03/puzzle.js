const P = {

    prep: T => T.split('\n'),

    slope: (R, d) => {
        let count = 0
        for (
            let x = d[0], y = d[1];
            y < R.length;
            x = (x + d[0]) % R[y].length, y += d[1]
        ) {
            count += R[y][x]==='#' ? 1 : 0
            //console.log([R[y][x], x, y].join(' '))
        }
        return count
    },

    part_1: T => {
        return P.slope(P.prep(T), [3,1])
    },

    part_2: T => {
        const p = P.prep(T)
        return [ [1,1], [3,1], [5,1], [7,1], [1,2] ]
            .map( s => P.slope(p, s) )
            .reduce( (a, b) => a * b )
    }

}

exports.puzzle = P
exports.puzzle = P = {

    prep: T => T.split('\n').map(L => L.split(' ')).map(c => [c[0][0], c[1] * 1]),

    part_1: T => P.prep(T).reduce((e, c, i) => {
        if (c[0] === 'f')
            e[0] += c[1]
        else
            e[1] += c[0] === 'd'
                ? c[1]
                : -c[1]
        return e
    }, [0, 0])
        .reduce((a, b) => a * b),

    part_2: T => P.prep(T).reduce((e, c, i) => {
        if (c[0] === 'f') {
            e[0] += c[1]
            e[1] += e[2] * c[1]
        } else
            e[2] += c[0] === 'd'
                ? c[1]
                : -c[1]
        return e
    }, [0, 0, 0])
        .slice(0, 2)
        .reduce((a, b) => a * b)

}

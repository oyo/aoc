const N = n => Number.parseInt(n)

exports.puzzle = P = {

    prep: T => T.trim().replaceAll('L', '-').replaceAll('R', '').split('\n').map(N),

    stop0: (a, c) => {
        if ((a[0] = (a[0] + c) % 100) === 0)
            a[1]++
        return a
    },

    pass0: (a, c) => {
        a[1] += ~~(Math.abs(c) / 100)
        for (let i = 0; i < Math.abs(c % 100); i++)
            if ((a[0] += Math.sign(c)) % 100 === 0)
                a[1]++
        return a
    },

    run: (T, r) => P.prep(T).reduce(r, [50, 0])[1],

    part_1: T => P.run(T, P.stop0),

    part_2: T => P.run(T, P.pass0)

}

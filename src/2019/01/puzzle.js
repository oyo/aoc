const P = {

    fuel_1: M => (~~(M / 3))-2,

    fuel_2: M => {
        let f = M
        let fs = 0
        while ((f = P.fuel_1(f)) > 0)
            fs += f < 0 ? 0 : f
        return fs
    },

    part_1: T =>  T.split('\n').reduce((sum, n) => sum + P.fuel_1(n*1), 0),

    part_2: T =>  T.split('\n').reduce((sum, n) => sum + P.fuel_2(n*1), 0)

}

exports.puzzle = P
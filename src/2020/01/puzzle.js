exports.puzzle = P = {

    prep: T => T.split('\n').map(L => L * 1),

    part_1: T => {
        const p = P.prep(T)
        let found = false;
        let a = 0;
        let b = 0;
        for (let i = 0; i < p.length && !found; i++)
            for (let j = i + 1; j < p.length && !found; j++)
                found = (a = p[j]) + (b = p[i]) === 2020
        return a * b
    },

    part_2: T => {
        const p = P.prep(T)
        let found = false;
        let a = 0;
        let b = 0;
        let c = 0;
        for (let i = 0; i < p.length && !found; i++)
            for (let j = i + 1; j < p.length && !found; j++)
                for (let k = j + 1; k < p.length && !found; k++)
                    found = (a = p[i]) + (b = p[j]) + (c = p[k]) === 2020
        return a * b * c
    }

}

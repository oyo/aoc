const P = {

    prep: T => T.split('\n').join(',').split(','),

    part_1: T => {
        const p = P.prep(T).filter(b => b !== 'x').map(b => b * 1)
        const v = p.shift()
        let bus = 0
        for (let i = v; bus === 0; i++)
            p.forEach(b => bus = i % b === 0 ? b * (i - v) : bus)
        return bus
    },

    part_2: T => [
        (d => d.reduce((a, b) => {
            let t = 0
            for (let i = a[0] - a[1], j = 0; t === 0; i += a[0], j++)
                if ((i + b[1]) % b[0] === 0)
                    t = i
            return [a[0] * b[0], a[0] * b[0] - t]
        }, d.shift()))(
            P.prep(T).slice(1).map((b, i) => [b * 1, i]).filter(b => !isNaN(b[0]))
        )
    ].reduce((a, x) => x[0] - x[1], 0),

    part_2_slow: T => {
        const d = P.prep(T).slice(1).map((b, i) => [b * 1, i]).filter(b => !isNaN(b[0]))
        let t = 0
        for (let i = 0; t === 0; i++) {
            let norest = true
            for (let b = 0; b < d.length && norest; b++)
                norest = norest && ((i + d[b][1]) % d[b][0]) === 0
            if (norest)
                t = i
        }
        return t
    }

}

exports.puzzle = P
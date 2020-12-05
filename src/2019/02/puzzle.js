const _ = require('lodash')

const P = {

    prep: T => T.split(',').map(n => 1*n),

    run: (c,noun,verb) => {
        c[1] = noun || c[1]
        c[2] = verb || c[2]
        let p = 0
        let op = 0
        while ((op=c[p++]) !== 99) {
            if (op<1 || op>2)
                console.log('error: ' + op)
            let a = c[c[p++]]
            let b = c[c[p++]]
            const val = op===1 ? a+b : a*b
            c[c[p++]] = val
            //console.log(p + ': ' + a + (op===1 ? ' + ' : ' * ') + b + ' = ' + val)
        }
        return c
    },

    part_1: T => P.run(P.prep(T), 12, 2)[0],

    part_2: T => {
        const co = P.prep(T)
        for (let n=0; n<100; n++)
            for (let v=0; v<100; v++)
                if (P.run(co.slice(), n, v)[0] === 19690720)
                    return 100 * n + v
    }

}

exports.puzzle = P
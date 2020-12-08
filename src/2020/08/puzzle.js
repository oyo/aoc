const _ = require('lodash')

const P = {

    prep: T => T.split('\n').map(L => L.split(' ')).map(L => [ L[0], L[1]*1, 0 ]),

    run: (p, l) => {
        let a = 0
        let i = 0;
        while (i<p.length) {
            const o = p[i++]
            if (o[2]++)
                break
            if (o[0] === 'acc')
                a += o[1]
            else if (o[0] === 'jmp')
                i += o[1]-1
        }
        return l || i===p.length ? a : 0
    },

    part_1: T => P.run(P.prep(T), true),
    
    part_2: T => (p =>
            p.reduce((s,l,i) =>
                s + P.run(p.slice().map((m,j) =>
                    i === j && m[0] !== 'acc'
                        ? [ (m[0] === 'jmp' ? 'nop' : 'jmp'), m[1], m[2] ]
                        : m.slice()
                )
            ), 0)
        )(P.prep(T))

}

exports.puzzle = P
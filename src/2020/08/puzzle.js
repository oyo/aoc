const _ = require('lodash')

const P = {

    prep: T => T.split('\n').map(L => L.split(' ')).map(L => [L[0],L[1]*1,0]),

    run: (p, l) => {
        let a = 0
        let n = true;
        for (let i=0; i<p.length; i++) {
            const o = p[i]
            //console.log(i+': '+a+' '+o)
            if (o[2]>0) {
                n = false;
                break
            }
            o[2]++
            const val = o[1]
            switch (o[0]) {
                case 'acc': a += val; break
                case 'jmp': i += val-1
            }
        }
        return l||n ? a : 0
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
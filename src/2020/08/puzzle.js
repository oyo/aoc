const _ = require('lodash')

const P = {

    prep: T => T.split('\n').map(L => L.split(' ')).map(L => [L[0],L[1].replace('+','')*1,0]),

    run: p => {
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
        return [ a, n ]
    },

    part_1: T => P.run(P.prep(T))[0],
    
    part_2: T => {
        const p = P.prep(T)
        let s = 0;
        for (let i=0; i<p.length && s===0; i++) {
            const c = p.slice().map(l => l.slice())
            if (c[i][0]==='jmp')
                c[i][0] = 'nop'
            else if (c[i][0]==='nop')
              c[i][0] = 'jmp'
            else continue
            const r = P.run(c)
            if (r[1])
                s += r[0]
        }
        return s
    }

}

exports.puzzle = P
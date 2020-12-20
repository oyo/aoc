const _ = require('lodash')

const P = {

    prep: T => {
        const p = T.split('\n\n').map(L => L.split('\n').map(l => l.trim()))
        const r = p[0].reduce((a,r) => {
            const rs = r.split(': ')
            const ru = rs[1].replace(/"/g,'').trim()
            a[rs[0]*1] = ru==='a' || ru ==='b'
                ? ru
                : ru.split(/ \| /).map(m => m.split(' ').map(n => n*1))
            return a
        }, new Array(200))
        P.R = r
        //console.log(r)
        return p[1]
    },

    dump: (ri, i, m0, m1) => {
        console.log(P.P+' '+P.W[P.P]+' => '+ri+' @ '+i+': '+P.R[ri][i]+' = '+m0+' '+m1+' = '+(m0&&m1))
    },

    mr: (ri,p) => {
        const r = P.R[ri]
        console.log(P.W.substring(p) +' '+ ri+': '+JSON.stringify(r))
        if (r==='a' || r==='b') {
            const m = P.W[P.P] === r
            //console.log(P.P+']'+P.W[P.P]+' = '+m)
            if (m) P.P++
            return m
        }
        let m = false
        for (let i=0; i<r.length && !m; i++) {
            const m0 = P.mr(r[i][0],P.P)
            const m1 = m0 && (r[i].length===1 ? true : P.mr(r[i][1],P.P))
            //P.dump(ri, i, m0, m1)
            m = m0 && m1
        }
        if (!m)
            P.P = p
        return m
    },

    match: w => {
        P.W = w
        P.P = 0
        const result = P.mr(0,0)
        console.log('match '+w+' = '+result +' '+P.P+' '+(w.length-P.P))
        return result && (w.length-P.P===1)
    },

    part_1: T => {
        const r = P.prep(T).filter(w => P.match(w)).length//.filter(m => m===true)//.length
        //P.match(r[1])
        return r
    },

    part_2: T => {
        const p = P.prep(T)
        return p.length
    }

}

exports.puzzle = P
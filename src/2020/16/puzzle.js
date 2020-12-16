const _ = require('lodash')

const P = {

    prep: T => T.split(/\n+(your|nearby) tickets?:\n+/).map(L => L.split('\n')),

    prepRules: R => R.map(l => l.split(/(-|: | or )/)),
    prepTicket: R => R.map(l => l.split(/,/)),

    valid: (t,r) => t.reduce((a,v) => {
        let c =  
            (r.reduce((a,f) => a ||
                (v*1 >= f[2]*1 && v*1 <= f[4]*1) ||
                (v*1 >= f[6]*1 && v*1 <= f[8]*1), false))
                ? 0
                : v*1
            return a+c
        },
        0),

    matrix: (f,tt) => {
        const result = tt.reduce((b,ti,i) => {
            let c = (ti.reduce((a,v) => a &&
                    ((v*1 >= f[2]*1 && v*1 <= f[4]*1) ||
                    (v*1 >= f[6]*1 && v*1 <= f[8]*1)), true))
            if (c)
                b.push(i)
            return b
        },[])
        return result
    },

    part_1: T => {
        const p = P.prep(T)
        const rules = P.prepRules(p[0])
        const tickets = P.prepTicket(p[4])
        const valid = tickets.reduce((a,t) => a + P.valid(t,rules),0)
        return valid
    },

    part_2: T => {
        const p = P.prep(T)
        const rules = P.prepRules(p[0])
        const my = P.prepTicket(p[2])[0]
        const tickets = P.prepTicket(p[4])
        const filter = tickets.filter(t => P.valid(t,rules)===0)
        const transpose = m => m[0].map((x,i) => m.map(x => x[i]*1))
        const tt = transpose(filter)
        let ri = rules.map(r => [r[0], P.matrix(r, tt)])
        const rulesindex = new Array(rules.length)
        while (ri.length>0) {
            let risf = ri.filter(r => r[1].length===1)
            risf.forEach(r => {
                const idx = r[1][0]
                rulesindex[idx]=r[0]
                ri = ri.map(y => [y[0], y[1].filter(fi => fi !== idx)])
            })
            ri = ri.filter(r => r[1].length>0)
        }
        const myticket = rulesindex.map((r,i) => [r,my[i]])
        const result = myticket.reduce((a,r) => a * (r[0].match(/^departure /) ? r[1] : 1),1)
        return result
    }

}

exports.puzzle = P
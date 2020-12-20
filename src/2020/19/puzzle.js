const { replace } = require('lodash')
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
        return {
            r: r,
            w: p[1]
        }
    },

    br: (ru) => {
        let re = '^(0)$'
        //let re = '^(((((a)((a)((b)((b)((b)((a)((a)|(b))|(b)(a))|(a)((b)(b)))|(a)((a)((b)(a)|((a)|(b))(b))|(b)((b)(b)|(a)(a))))|(a)((a)(((b)(b)|(a)(a))(b)|((b)(a)|((a)|(b))(b))(a))|(b)((b)((a)(a)|(a)(b))|(a)((a)(b)|(b)(b)))))|(b)((a)((b)(((b)(a)|((a)|(b))(b))(a)|((a)(a)|(b)((a)|(b)))(b))|(a)(1))|(b)(110)))|(b)(90))(b)|(100)(a)))(11))$'
        let g
        while (g = re.match(/\((\d+)\)/)) {
            //console.log(re)
            //console.log(g)
            let c = ru[g[1]]
            //console.log(c)
            if (c === 'a' || c === 'b')
                re = re.replaceAll(g[0],c)
            else {
                c = c.map(s => '('+s.join(')(')+')').join('|')
                //console.log(c)
                re = re.replaceAll(g[0],'('+c+')')
            }
        }
        return new RegExp(re)
    },

    part_1: T => {
        const p = P.prep(T)
        const re = P.br(p.r)
        const r = p.w.filter(w => w.match(re)).length
        return r
    },

    part_1w: T => (p => p.w.filter(w => w.match(P.br(p.r))).length)(P.prep(T)),

    part_2: T => {
        const p = P.prep(T)
        return p.length
    }

}

exports.puzzle = P
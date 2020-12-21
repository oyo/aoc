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
        let g
        while (g = re.match(/\((\d+)\)/)) {
            let c = ru[g[1]]
            if (c === 'a' || c === 'b')
                re = re.replaceAll(g[0],c)
            else {
                c = c.map(s => '('+s.join(')(')+')').join('|')
                re = re.replaceAll(g[0],'('+c+')')
            }
        }
        return new RegExp(re)
    },

    /*
    br2: (ru) => {
        let re = '^(0)$'
        let g
        while (g = re.match(/\((\d+)\)/)) {
            let c = ru[g[1]]
            if (c === 'a' || c === 'b')
                re = re.replaceAll(g[0],c)
            else if (g[1] === '8' || g[1] === '11') {
                //TODO
                //find regex matching abc123, abcabc123123, abcabcabc123123123, ...
                //like (?1)? in perl
                c = c.map(s => '('+s.join(')+(')+')+').join('|')
                re = re.replaceAll(g[0],'('+c+')')
            } else {
                c = c.map(s => '('+s.join(')(')+')').join('|')
                re = re.replaceAll(g[0],'('+c+')')
            }
        }
        return new RegExp(re)
    },
    */

    part_1: T => (p => p.w.filter(w => w.match(P.br(p.r))).length)(P.prep(T)),

    //part_2_todo: T => (p => p.w.filter(w => w.match(P.br2(p.r))).length)(P.prep(T)),

    part_2: T => {
        const p = P.prep(T)
        p.r[8].push([ 42, 42 ])
        p.r[8].push([ 42, 42, 42 ])
        p.r[8].push([ 42, 42, 42, 42 ])
        p.r[8].push([ 42, 42, 42, 42, 42 ])
        p.r[11].push([ 42, 42, 31, 31 ])
        p.r[11].push([ 42, 42, 42, 31, 31, 31 ])
        p.r[11].push([ 42, 42, 42, 42, 31, 31, 31, 31 ])
        p.r[11].push([ 42, 42, 42, 42, 42, 31, 31, 31, 31, 31 ])
        const re = P.br(p.r)
        return p.w.filter(w => w.match(re)).length
    }

}

exports.puzzle = P
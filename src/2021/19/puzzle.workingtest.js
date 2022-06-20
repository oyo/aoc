const _ = require('lodash')

exports.puzzle = P = {

    prep: T => T.split(/--- scanner \d+ ---\n/).slice(1).map(s => s.trim().split('\n').map(L => L.split(',').map(n => n * 1))),


    order: s => [0, 1, 2].map(a => s.map(c => c[a])),//.sort((a, b) => a - b)),

    diff: s => s.map(a => a.map((v, i, a) => a[i] - a[i - 1]).slice(1)),
    
    compareAxis: (s, q) => {
        //console.log(s)
        //console.log(q)
        //const so = s.sort((a,b) => a-b)

        const smax = Math.max(...s)
        const smin = Math.min(...s)
        const qmax = Math.max(...q)
        const qmin = Math.min(...q)
        let matches = 0
        for (let r of [false, true]) {
            let d0, d1, o
            if (r) {
                d0 = qmax - smin
                d1 = qmin - smax
                o = 1
            } else {
                d0 = -qmin - smin
                d1 = -qmax - smax
                o = -1
            }
            for (let d = d0; d >= d1; d--) {
                const qd = q.map(v => o * v - d)
                const ai = _.intersection(s, qd)
                if (ai.length > 11) {
                    console.log(r + ' ' + ai.length + ' ' + d + ': ' + ai)
                    //matches.push(r ? ai.length : -ai.length)
                    return qd
                }
            }
        }
        return 0
    },

    compare2: (s0, s1) => {
        let ax = new Array(3)
        let axmatch = true
        for (let a=0; a<3 && axmatch; a++) {
            let anot = true
            for (let b=0; b<3 && anot; b++) {
                //console.log(a+' / '+b)
                const m = P.compareAxis(s0[a], s1[b])
                if (m!==0) {
                    anot = false
                    ax[a] = m
                }
            }
            if (anot)
                axmatch = false
        }
        return ax.filter(a => a).length===3 ? ax : null
    },

    compare: s => {
        //let c
        let seq = [0]
        while (seq.length<s.length)
        {            
            let c = seq[seq.length-1]
            for (let d = 0; d < s.length; d++) {
                if (!seq.includes(d)) {
                    console.log('seq '+seq+' -> s'+d)
                    const m = P.compare2(s[c], s[d])
                    if (m) {
                        //console.log(m)
                        s[d] = m
                        seq.push(d)
                    }
                }
            }     
        }
        return s
    }        
        //P.compare2(s[0],s[1])
        /*
        P.compare2(s[0],s[3])
        P.compare2(s[0],s[4])
        P.compare2(s[1],s[2])
        P.compare2(s[1],s[3])
        P.compare2(s[1],s[4])
        P.compare2(s[2],s[3])
        P.compare2(s[2],s[4])
        P.compare2(s[3],s[4])
        */
        /*     
        new Array(s.length).fill().map((_,a) =>
            new Array(s.length).fill().map((_,b) =>
                a !== b ? P.compare2(s[a], s[b]) : false
            )
        )
            */      
        //s.map((a,i) => a.slice(i+1).map(b => P.compare2(a,b)))
    ,

    part_1: T => {
        const s = P.prep(T)
        console.log(s.length)
        const so = s.map(a => P.order(a))
        //console.log(so)
        //const sd = so.map(a => P.diff(a))
        //console.log(sd)
        const sc = P.compare(so)
        //console.log(sc)
        //const sm = sc.map(ax => ax[0].map((a,i) => ({x:ax[0][i],y:ax[1][i],z:ax[2][i]})))
        const sm = sc.map(ax => ax[0].map((a,i) => [ax[0][i],ax[1][i],ax[2][i]]).sort((a,b)=> a[0]-b[0]).map(a => a.join()))
        //const sm = sc.map(ax => ax[0].map((a,i) => [ax[0][i],ax[1][i],ax[2][i]].join(',')))
        //console.log(sm)
        //let u = _.union(sm[0],sm[1])
        //let u = _.intersection(sm[0],sm[1])
        let u = _.union(...sm)
        //u = _.union(u,sm[2])
        //u = _.union(u,sm[3])
        //console.log(u)
        return u.length
    },

    part_2: T => {
        const p = P.prep(T)
        return p.length
    }

}

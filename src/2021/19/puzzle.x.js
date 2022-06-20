const _ = require('lodash')

exports.puzzle = P = {

    prep: T => T.split(/--- scanner \d+ ---\n/).slice(1).map(s => s.trim().split('\n').map(L => L.split(',').map(n => n * 1))),

    splt: s => [0, 1, 2].map(a => s.map(c => c[a])),

    //diff: s => s.map(a => a.map((v, i, a) => a[i] - a[i - 1]).slice(1)),

    compareAxis: (s, q) => {
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
        let axmatch = 0
        for (let a = 0; a < 3; a++) {
            let anot = true
            for (let b = 0; b < 3 && anot; b++) {
                //console.log(a+' / '+b)
                const m = P.compareAxis(s0[a], s1[b])
                if (m !== 0) {
                    anot = false
                    ax[a] = m
                    axmatch++
                }
            }
        }
        return axmatch === 3 ? ax : null
    },

    matches: (s, c, w) => {
        const seq = []
        for (let d = 0; d < s.length; d++) {
            if (d !== c && !w.includes(d)) {
                const m = P.compare2(s[c], s[d])
                if (m) {
                    seq.push(d)
                    console.log(c + ' -> ' + seq)
                }
            }
        }
        return seq
    },

    compare: s => {
        console.log('-------')

        //console.log(P.matches(s,0))
        let root = s[0]
        console.log(root)
        let c2 = P.compare2(root, s[2])
        let c12 = P.compare2(root, s[12])
        let sm = [root, c2, c12].map(ax => ax[0].map((a, i) => [ax[0][i], ax[1][i], ax[2][i]]).sort((a, b) => a[0] - b[0]).map(a => a.join()))
        let u = _.union(...sm).map(s => s.split(',').map(n => n * 1))
        console.log(_.intersection(...sm))
        console.log(u)
        console.log(u.length)
        root = P.splt(u)
        s[0] = root

        console.log(root)
        sm = [root,
            P.compare2(root, s[11]),
            P.compare2(root, s[16]),
            P.compare2(root, s[24])
        ].map(ax => ax[0].map((a, i) => [ax[0][i], ax[1][i], ax[2][i]]).sort((a, b) => a[0] - b[0]).map(a => a.join()))
        u = _.union(...sm).map(s => s.split(',').map(n => n * 1))
        //console.log(_.intersection(...sm))
        console.log(u)
        console.log(u.length)
        root = P.splt(u)
        s[0] = root

        sm = [root,
            P.compare2(root, s[3]),
            P.compare2(root, s[31]),
            P.compare2(root, s[34])
        ].map(ax => ax[0].map((a, i) => [ax[0][i], ax[1][i], ax[2][i]]).sort((a, b) => a[0] - b[0]).map(a => a.join()))
        u = _.union(...sm).map(s => s.split(',').map(n => n * 1))
        //console.log(_.intersection(...sm))
        console.log(u)
        console.log(u.length)
        root = P.splt(u)
        s[0] = root


        sm = [root,
            P.compare2(root, s[18])
        ].map(ax => ax[0].map((a, i) => [ax[0][i], ax[1][i], ax[2][i]]).sort((a, b) => a[0] - b[0]).map(a => a.join()))
        u = _.union(...sm).map(s => s.split(',').map(n => n * 1))
        //console.log(_.intersection(...sm))
        console.log(u)
        console.log(u.length)
        root = P.splt(u)
        s[0] = root

        let m = P.matches(s, 0, [0, 2, 11, 12, 16, 24, 3, 31, 34, 18])

        console.log(m)
        console.log('-------')
        return root
    },

    part_1: T => {
        const s = P.prep(T)
        console.log(s.length)
        const so = s.map(a => P.splt(a))
        //console.log(so)
        const sc = P.compare(so)
        console.log(sc)
        //const sm = sc.map(ax => ax[0].map((a,i) => ({x:ax[0][i],y:ax[1][i],z:ax[2][i]})))
        //const sm = sc.map(ax => ax[0].map((a, i) => [ax[0][i], ax[1][i], ax[2][i]]).sort((a, b) => a[0] - b[0]).map(a => a.join()))
        //const sm = sc.map(ax => ax[0].map((a,i) => [ax[0][i],ax[1][i],ax[2][i]].join(',')))
        //console.log(sm)
        //let u = _.union(...sm)
        //console.log(u)
        return sc.length
    },

    part_2: T => {
        const p = P.prep(T)
        return p.length
    }

}

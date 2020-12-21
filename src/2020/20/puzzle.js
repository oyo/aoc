const _ = require('lodash')

const P = {

    prep: T => T.replace(/\./g,0).replace(/#/g,1).split('\n\n').map(t => t.split('\n'))
        .map(s => [
            s.shift().split(/[ :]/g)[1],
            P.borders(s.map(n => parseInt(n,2))),
            s.map(n => parseInt(n,2)),
            //P.inner(s.map(n => parseInt(n,2))),
        ]),

    prepBoard: () => {
        const b = new Array(12)
        for (let y = 0; y < b.length; y++)
            b[y] = new Array(12)
        return b
    },

    dump: n => console.log(n.toString(2).padStart(10,0)),

    dumpTile: t => t.map(n => P.dump(n)),

    dumpBorder: b => b.forEach(n => P.dump(n)),

    dumpInner: b => b.forEach(n => console.log(n.toString(2).padStart(10,0).split('').join(' '))),

    dumpBoardIds: b => {
        for (let y = 0; y < b.length; y++)
            console.log(b[y].map(x => x[0].padStart(5,' ')).join('')+'\n')
        console.log()
    },

    rev: b => {   
        const x = new Uint32Array(1)
        x[0] = b
        x[0] = ((x[0] & 0x0000ffff) << 16) | ((x[0] & 0xffff0000) >>> 16)
        x[0] = ((x[0] & 0x55555555) <<  1) | ((x[0] & 0xAAAAAAAA) >>>  1)
        x[0] = ((x[0] & 0x33333333) <<  2) | ((x[0] & 0xCCCCCCCC) >>>  2)
        x[0] = ((x[0] & 0x0F0F0F0F) <<  4) | ((x[0] & 0xF0F0F0F0) >>>  4)
        x[0] = ((x[0] & 0x00FF00FF) <<  8) | ((x[0] & 0xFF00FF00) >>>  8)
        return x[0] >>> 22
    },

    right: t => t.reduce((a, n, i) => a | ((n & 1) << (9 - i)), 0),

    left: t => t.reduce((a, n, i) => a | ((n >>> 9) << i), 0),

    colBits: (t,c) => t.reduce((a, n, i) => a | (((n >>> c) & 1) << (9-i)), 0),

    borders: t => [ t[0], P.right(t), P.rev(t[9]), P.left(t) ],

    inner: t => t.slice(1,9).map(n => (n >>> 1) & 0x000000FF),

    rotate: t => { const a = t.shift(); t.push(a); return t },

    flip: t => [ P.rev(t[0]), P.rev(t[3]), P.rev(t[2]), P.rev(t[1]) ],

    rotateInner: t => t.reduce((a,n,i) => { a[i] = P.colBits(t,i); return a }, []),

    flipInner: t => t.map(n => P.rev(n)),

    rotateTile: t => [
        t[0],
        P.rotate(t[1]),
        P.rotate(t[2]),
        P.rotateInner(t[3])
    ],

    flipTile: t => [
        t[0],
        P.flip(t[1]),
        [ t[2][0], t[2][3], t[2][2], t[2][1] ],
        P.flipInner(t[3])
    ],

    rotateTo: (t,r) => {
        let i = 0
        while (t[2].join('') != r && i++ < 4)
            P.rotateTile(t)
        return t
    },

    align: (u,b,s) => {
        let i = 0
        while (u[1].indexOf(b) !== s && i++ < 4)
            P.rotateTile(u)
        return u
    },

    // in bt find the tile matching t at side s [0-3] = t,r,b,l correctly rotated and flipped
    match: (bt,t,s) => {
        //console.log(t)
        const b = t[1][s]
        //console.log(bt[b])
        let u = bt[b].filter(f => f[0] !== t[0])[0]
        u = P.align(u,b,s)
        if (s % 2 === 0) {
            u = P.flipTile(u)
            u = P.rotateTile(u)
            u = P.rotateTile(u)
        } else
            u = P.flipTile(u)
        //console.log(u)
        return u
    },

    part_1: T => {
        // boundaries of all tiles
        const a = P.prep(T)
        // all values in a single array 
        const n = a.flatMap(t => [ t[1], P.flip(t[1]) ].flatMap(c => c)).sort((a,b) => b - a)
        // grouped by number of occurrence
        const g = _.groupBy(n, o => n.filter(m => m === o).length)
        g[2] = _.uniq(g[2])
        // count group size
        const c = Object.keys(g).map(n => [ n, g[n].length ])
        // reverse map n to number
        const gr = Object.keys(g).flatMap(n => g[n].map(v => [v, n*1]))
        // an array where 
        const bc = gr.reduce((a,n) => { a[n[0]] = n[1]; return a }, new Array(1024))
        // map tiles to number of side occurrence
        const s = a.map(t => [t[0], t[1].map(b => bc[b])])
        // filter single occurrences
        const sorted = {
            corner: s.filter(t => t[1].filter(b => b === 1).length === 2),
            edge:   s.filter(t => t[1].filter(b => b === 1).length === 1),
            middle: s.filter(t => t[1].filter(b => b === 1).length === 0)
        }
        // multiply corner ids -> solution part 1
        return sorted.corner.reduce((a,c) => a * c[0], 1)
    },

    part_2: T => {
        // boundaries of all tiles
        const a = P.prep(T)
        const q = a.filter(t => t[0]==='1867')[0]
        const qb = q[1]
        const qi = q[2]
        P.dumpBorder(qb)
        console.log()
        P.dumpInner(qi)
        console.log()
        P.dumpBorder(P.flip(qb))
        console.log()
        P.dumpInner(P.flipInner(qi))
        console.log()
        P.dumpBorder(P.rotate(qb))
        console.log()
        P.dumpInner(P.rotateInner(qi))
        console.log()
//        return 0

        // all values in a single array 
        const n = a.flatMap(t => [ t[1], P.flip(t[1]) ].flatMap(c => c)).sort((a,b) => b - a)
        // grouped by number of occurrence
        const g = _.groupBy(n, o => n.filter(m => m === o).length)
        g[2] = _.uniq(g[2])
        // count group size
        const c = Object.keys(g).map(n => [ n, g[n].length ])
        // reverse map n to number
        const gr = Object.keys(g).flatMap(n => g[n].map(v => [v, n*1]))
        // an array where indices are border values and value is number of occurrences
        const bc = gr.reduce((a,n) => { a[n[0]] = n[1]; return a }, new Array(1024))
        // map tiles to number of side occurrence
        const s = a.map(t => [t[0], t[1], t[1].map(b => bc[b]), t[2]])
        // filter single occurrences
        const sorted = {
            corner: s.filter(t => t[2].filter(b => b === 1).length === 2),
            edge:   s.filter(t => t[2].filter(b => b === 1).length === 1),
            middle: s.filter(t => t[2].filter(b => b === 1).length === 0)
        }

        // prepared with all tiles flipped
        const af = a.map(t => [t[0], P.flip(t[1]), P.flipInner(t[2])])
        const sf = af.map(t => [t[0], t[1], t[1].map(b => bc[b]), t[2]])

        // array where indices are border values and items are tile ids
        const bt = s.concat(sf).reduce((r,t) => { t[1].forEach(b => (r[b] = r[b] || []).push(t)); return r },[])

        const b = P.prepBoard()
        let t
        for (let y = 0; y < 12; y++) {
            t = b[y][0] = y === 0
                ? P.rotateTo(sorted.corner[0],1221)
                : P.match(bt,b[y-1][0],2)
            //console.log(t[2])
            for (let x = 1; x < 12; x++) {
                t = b[y][x] = P.match(bt,t,1)
                //console.log(t[2])
            }
            //console.log()
        }

        P.dumpBoardIds(b)
        console.log(b[0][0])
        P.dumpInner(b[0][0][3])
        console.log()
        P.dumpInner(b[1][0][3])
        return 0//bt
    }


}

exports.puzzle = P
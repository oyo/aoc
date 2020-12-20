const _ = require('lodash')

const P = {

    prepo: T => T.replace(/\./g,0).replace(/#/g,1).split('\n\n').map(t => t.split('\n'))
        .reduce((a,s) => {
            a[s.shift().split(/[ :]/g)[1]] = P.borders(s.map(n => parseInt(n,2)))
            return a
        }, {}),

    prep: T => T.replace(/\./g,0).replace(/#/g,1).split('\n\n').map(t => t.split('\n'))
        .map(s => [
            s.shift().split(/[ :]/g)[1],
            P.borders(s.map(n => parseInt(n,2)))
        ]),

    dump: n => console.log(n.toString(2).padStart(10,0)),

    dumpTile: t => t.map(n => P.dump(n)),

    dumpBorder: b => b.forEach(n => P.dump(n)),

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

    borders: t => [ t[0], P.right(t), P.rev(t[9]), P.left(t) ],

    rotate: t => { const a = t.shift(); t.push(a); return t },

    flip: t => [ P.rev(t[0]), P.rev(t[3]), P.rev(t[2]), P.rev(t[1]) ],

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
        const cr = gr.reduce((a,n) => { a[n[0]] = n[1]; return a }, new Array(1024))
        // map tiles to number of side occurrence
        const s = a.map(t => [t[0], t[1].map(b => cr[b])])
        // filter 2 times 1
        const f = s.filter(t => t[1].filter(b => b === 1).length === 2)
        // multiply corner ids
        const r = f.reduce((a,c) => a * c[0], 1) 
        return r
    },

    part_2: T => {
        const p = P.prep(T)
        return p.length
    }

}

exports.puzzle = P
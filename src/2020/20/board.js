const N = BigInt

const B = {

    D: 12,
    T: 8,

    MONSTER: [
        '                  # ',
        '#    ##    ##    ###',
        ' #  #  #  #  #  #   '
    ].join(',').replace(/ /g,0).replace(/#/g,1).split(',').map(n => parseInt(n,2)),

    toBinaryRow: n => n.toString(2).padStart(B.D*B.T,0).split('').join(' ').replace(/(^| )0/g, ' .').replace(/(^| )1/g, '██'),

    toBinary: b => b.map(n => B.toBinaryRow(n)).join('\n'),

    rev: (b,l) => {
        const x = new Uint32Array(1)
        x[0] = b
        x[0] = ((x[0] & 0x0000ffff) << 16) | ((x[0] & 0xffff0000) >>> 16)
        x[0] = ((x[0] & 0x55555555) <<  1) | ((x[0] & 0xAAAAAAAA) >>>  1)
        x[0] = ((x[0] & 0x33333333) <<  2) | ((x[0] & 0xCCCCCCCC) >>>  2)
        x[0] = ((x[0] & 0x0F0F0F0F) <<  4) | ((x[0] & 0xF0F0F0F0) >>>  4)
        x[0] = ((x[0] & 0x00FF00FF) <<  8) | ((x[0] & 0xFF00FF00) >>>  8)
        return x[0] >>> (32-l)
    },

    dumpIds: b => {
        for (let y = 0; y < b.length; y++)
            console.log(b[y].map(x => x[0].padStart(5,' ')).join('')+'\n')
        console.log()
    },

    create: (b,full) => {
        B.D = b.length
        B.T = full ? b[0][0][3].length : (b[0][0][3].length - 2)
        const bb = new Array(B.D*B.T).fill(N(0))
        for (let y=0; y<B.D; y++)
            for (let x=0; x<B.D; x++)
                B.setTile(bb,b,y,x,full)
        return bb
    },

    setTile: (bb, b, y, x, full) => {
        let by = B.T * y
        const t = b[y][x][3]
        for (let ty = 0; ty < B.T; ty++)
            bb[by+ty] = full 
                ? B.setRowFull(bb[by+ty], x, t[ty])
                : B.setRow(bb[by+ty], x, t[ty+1])
        return b
    },

    setRowFull: (r, x, v) => {
        const o = N(B.T*(B.D - x - 1))
        const n = N(v) << o
        const m = N(1023) << o
        const s = (r & (~m)) | n
       return s
    },

    setRow: (r, x, v) => {
        const o = N(B.T*(B.D - x - 1))
        const n = N((v>>>1) & 255) << o
        const m = N(255) << o
        const s = (r & (~m)) | n
        return s
    },

    monster: (bb, m, l, x, y) => {
        const o = N(B.T*B.D - x - l)
        //console.log(o)
        let match = true
        for (let my=0; my < m.length && match; my++) {
            const b = N(m[my]) << o
            const c = bb[y+my] & b
            match &&= b===c
            //console.log(B.toBinaryRow(c))
        }
        return match
    },

    boardMonster: (bb,m,l) => {
        const d = B.D*B.T
        const coords = []
        for (let y=0; y < d - m.length; y++)
            for (let x=0; x < d - l; x++)
                if (B.monster(bb, m, l, x, y))
                    coords.push([y,x])
        return coords
    },

    flipH: (m,l) => m.map(n => B.rev(n,l)),

    flipV: m => m.slice().reverse(),

    colBits: (m, c) => m.reduce((a, n, i) => a | (((n >>> c) & 1) << (m.length-i-1)), 0),

    rotate: m => {
        const a = new Array(20)
        for (let c=0; c<a.length; c++)
            a[c] = B.colBits(m, c)
        return a
    },

    monsterBinary: m => m.map(n => B.toBinaryRow(n)),

    searchMonster: bb => {
        let m
        let cm
        m = B.MONSTER
        cm = B.boardMonster(bb,m,20)
        if (cm.length>0) return {
            monster: m,
            positions: cm
        }
        m = B.flipH(m,20)
        cm = B.boardMonster(bb,m,20)
        if (cm.length>0) return {
            monster: m,
            positions: cm
        }
        m = B.flipV(m)
        cm = B.boardMonster(bb,m,20)
        if (cm.length>0) return {
            monster: m,
            positions: cm
        }
        m = B.flipH(m,20)
        cm = B.boardMonster(bb,m,20)
        if (cm.length>0) return {
            monster: m,
            positions: cm
        }
        m = B.rotate(m)
        cm = B.boardMonster(bb,m,3)
        if (cm.length>0) return {
            monster: m,
            positions: cm
        }
        m = B.flipH(m,3)
        cm = B.boardMonster(bb,m,20)
        if (cm.length>0) return {
            monster: m,
            positions: cm
        }
        m = B.flipV(m)
        cm = B.boardMonster(bb,m,20)
        if (cm.length>0) return {
            monster: m,
            positions: cm
        }
        m = B.flipH(m,3)
        cm = B.boardMonster(bb,m,20)
        return {
            monster: m,
            positions: cm
        }
    },

    monsterMap1: (bb, m, p) => {
        const d = B.D*B.T
        const y = p[0]
        const x = p[1]
        const o = N(d - x - (23-m.length))
        //console.log(o)
        for (let my=0; my < m.length; my++) {
            const b = N(m[my]) << o
            bb[y+my] |= b
            //console.log(B.toBinaryRow(c))
        }
        return bb
    },

    monsterMap: (m, p) => {
        const d = B.D*B.T
        let bb = new Array(d).fill(N(0))
        for (let i=0; i < p.length; i++)
            bb = B.monsterMap1(bb, m, p[i])
        return bb
    },

    mapDiff: (a, b) => {
        let d = new Array(a.length).fill(N(0))
        for (let y = 0; y < a.length; y++)
            d[y] = (N(1)<<(N(a.length)))-N(1) & (~b[y]) & (a[y])
        return d
    }
}

exports.board = B
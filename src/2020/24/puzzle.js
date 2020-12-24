const N = BigInt

const P = {

    D: 150,

    prep: T => T
        .replace(/nw/g, 'a').replace(/ne/g, 'b')
        .replace(/sw/g, 'c').replace(/se/g, 'd')
        .split('\n'),

    toBinaryRow: n => n.toString(2).padStart(P.D, 0).split('').join(' ').replace(/(^| )0/g, ' .').replace(/(^| )1/g, '██'),

    toBinary: b => b.map((n,i) => P.toBinaryRow(n).padStart(P.D*2+i,' ')).join('\n'),

    countBits: n => {
        let c = N(0)
        let o = N(1)
        while (n > N(0)) {
            c += n & o
            n >>= o
        }
        return Number(c)
    },

    count: b => b.reduce((a, n) => a + P.countBits(n), 0),
    //countRE: () => P.B.reduce((a, n) => n===0n ? a : a + n.toString(2).match(/1/g).length, 0),

    adjacentCount: (b, y, x) => Number(
        P.countBits(b[y - 1] & (N(3) << N(P.D - x - 2))) + // 011
        P.countBits(b[y    ] & (N(5) << N(P.D - x - 2))) + // 101
        P.countBits(b[y + 1] & (N(6) << N(P.D - x - 2)))   // 110
    ),

    tst: (b, y, x) => (b[y] & (N(1) << N(P.D - x - 1))) ? true : false,
    flp: (b, y, x) => b[y] ^= (N(1) << N(P.D - x - 1)),
    set: (b, y, x) => b[y] |= (N(1) << N(P.D - x - 1)),
    clr: (b, y, x) => b[y] &= ~(N(1) << N(P.D - x - 1)),

    flipPath: (b, l) => {
        let x = P.D >>> 1
        let y = P.D >>> 1
        for (let i = 0; i < l.length; i++) {
            switch (l[i]) {
                case 'a': y--; break
                case 'b': y--; x++; break
                case 'w': x--; break
                case 'e': x++; break
                case 'c': y++; x--; break
                case 'd': y++; break
            }
        }
        P.flp(b, y, x)
    },

    step: (board, counter, transposer) => {
        const b = board[0]
        const b1 = b.slice()
        for (let y = 1; y < P.D - 1; y++)
            for (let x = 1; x < P.D - 1; x++)
                if (transposer(P.tst(b1, y, x), counter(b1, y, x)))
                    P.flp(b, y, x)
    },

    run: (input, counter, transposer) => {
        const board = new Array(P.D).fill(N(0))
        input.map(l => P.flipPath(board, l))
        const dboard = [board, board.slice()]
        let i = 0
        while (i++ < 100)
            P.step(dboard, counter, transposer)
        return dboard[0]
    },

    part_1: T => {
        const b = new Array(P.D).fill(N(0))
        P.prep(T).map(l => P.flipPath(b, l))
        return P.count(b)
    },

    part_2: T => P.count(P.run(P.prep(T), P.adjacentCount, (s, c) =>
        (s === true && (c === 0 || c > 2)) || (s === false && c === 2)
    ))

}

exports.puzzle = P
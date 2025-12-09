const N = BigInt

exports.puzzle = P = {

    prep: T => T.trim().split('\n')
        .map(L => L.split(/(toggle |turn off |turn on | through )/))
        .map(L => [
            L[1].replaceAll('toggle ', '-')
                .replaceAll('turn on ', '1')
                .replaceAll('turn off ', '0'),
            L[2].split(',').map(c => c * 1),
            L[4].split(',').map(c => c * 1)
        ]),

    dim: d => (P.DIM = d, P),

    part_1: T => {

        const P1 = {
            clear: () => (
                P1.board = new Array(P.DIM).fill(N(0)),
                P1.M = (1n << N(P.DIM)) - 1n,
                P1
            ),
        
            pad: v => (new Array(P.DIM).fill('.').join('')
                + v.toString(2).replaceAll('0', '.')).substr(-P.DIM).split('').join(' '),
        
            toString: () => P1.board.map(r => P1.pad(r)).join('\n'),
        
            exe: c => {
                const b = P1.board
                const m = ((1n << N(1 + c[2][0] - c[1][0])) - 1n) << N(P.DIM - c[2][0] - 1)
                switch (c[0]) {
                    case '-':
                        for (let r = c[1][1]; r <= c[2][1]; r++)
                            b[r] ^= m
                        break;
                    case '0':
                        for (let r = c[1][1]; r <= c[2][1]; r++)
                            b[r] &= ~m
                        break;
                    case '1':
                        for (let r = c[1][1]; r <= c[2][1]; r++)
                            b[r] |= m
                        break;
                    case '#':
                        let s = 0
                        for (let r = c[1][1]; r <= c[2][1]; r++)
                            s += b[r].toString(2).split('0').join('').length                    
                        return s
                }
                return 0
            }        
        }

        if (!P.DIM)
            P.DIM = 1000
        P1.clear()
        const p = P.prep(T)
        p.map(c => P1.exe(c))
        return P1.exe(['#',[0,0],[P.DIM-1,P.DIM-1]])
    },

    part_2: T => {

        const P1 = {
            clear: () => (
                P1.board = new Array(P.DIM).fill(0).map(() => new Array(P.DIM).fill(0)),
                P1
            ),
        
            pad: v => ` ${v}`.substr(-2),
        
            toString: () => P1.board.map(y => y.map(x => P1.pad(x)).join('')).join('\n'),
        
            exe: c => {
                const b = P1.board
                switch (c[0]) {
                    case '-':
                        for (let y = c[1][1]; y <= c[2][1]; y++)
                            for (let x = c[1][0]; x <= c[2][0]; x++)
                                b[y][x] += 2
                        break;
                    case '0':
                        for (let y = c[1][1]; y <= c[2][1]; y++)
                            for (let x = c[1][0]; x <= c[2][0]; x++)
                                b[y][x] = Math.max(b[y][x]-1,0)
                        break;
                    case '1':
                        for (let y = c[1][1]; y <= c[2][1]; y++)
                            for (let x = c[1][0]; x <= c[2][0]; x++)
                                b[y][x] ++
                        break;
                    case '#':
                        return b.reduce((o,a) => o + a.reduce((o,b) => o+b, 0), 0)
                }
                return 0
            }        
        }

        if (!P.DIM)
            P.DIM = 1000
        P1.clear()
        const p = P.prep(T)
        p.map(c => P1.exe(c))
        return P1.exe(['#',[0,0],[P.DIM-1,P.DIM-1]])
    }

}

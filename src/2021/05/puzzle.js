exports.puzzle = P = {

    DIM: 1000,

    prep: T => T.split('\n')
        .map(L => L.split(/ -> /))
        .map(L => [
            L[0].split(',').map(c => c * 1),
            L[1].split(',').map(c => c * 1)
        ]),

    clear: () => {
        P.board = new Array(P.DIM).fill(0).map(() => new Array(P.DIM).fill(0));
        return P
    },

    toString: () => P.board.map(y => y.join('')).join('\n').replaceAll('0', '.'),

    draw: c => {
        const b = P.board
        const y1 = c[0][1]
        const y2 = c[1][1]
        const x1 = c[0][0]
        const x2 = c[1][0]
        for (let x = x1, y = y1; ;) {
            b[y][x]++
            if (x === x2 && y === y2) break;
            x += x1 === x2 ? 0 : (x2 > x1 ? 1 : -1)
            y += y1 === y2 ? 0 : (y2 > y1 ? 1 : -1)
        }
    },

    count: () => P.board.reduce((o, a) => o + a.reduce((o, b) => o + (b > 1 ? 1 : 0), 0), 0),

    part_1: T => {
        P.clear().prep(T).filter(c => c[0][0] === c[1][0] || c[0][1] === c[1][1]).map(c => P.draw(c))
        return P.count()
    },

    part_2: T => {
        P.prep(T).filter(c => c[0][0] !== c[1][0] && c[0][1] !== c[1][1]).map(c => P.draw(c))
        return P.count()
    }

}

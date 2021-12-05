exports.puzzle = P = {

    prep: T => T.split('\n')
        .map(L => L.split(/ -> /))
        .map(L => [
            L[0].split(',').map(c => c * 1),
            L[1].split(',').map(c => c * 1)
        ]),

    toString: () => P.board.map(y => y.join('')).join('\n').replaceAll('0', '.'),

    draw: c => {
        const b = P.board
        const y0 = c[0][1]
        const y1 = c[1][1]
        const x0 = c[0][0]
        const x1 = c[1][0]
        for (let x = x0, y = y0; ;) {
            b[y][x]++
            if (x === x1 && y === y1) break
            x += x0 === x1 ? 0 : (x1 > x0 ? 1 : -1)
            y += y0 === y1 ? 0 : (y1 > y0 ? 1 : -1)
        }
    },

    count: () => P.board.reduce((o, a) => o + a.reduce((o, b) => o + (b > 1 ? 1 : 0), 0), 0),

    part_1: T => {
        P.board = new Array(1000).fill(0).map(() => new Array(1000).fill(0))
        P.prep(T).filter(c => c[0][0] === c[1][0] || c[0][1] === c[1][1]).map(c => P.draw(c))
        return P.count()
    },

    part_2: T => {
        P.prep(T).filter(c => c[0][0] !== c[1][0] && c[0][1] !== c[1][1]).map(c => P.draw(c))
        return P.count()
    }

}

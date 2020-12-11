const P = {

    prep: T => {
        const p = T.split('\n').map(L => ('.' + L + '.').split(''))
        const f = new Array(p[0].length).fill('.')
        p.unshift(f)
        p.push(f)
        P.D = {
            y: p.length,
            x: p[0].length
        }
        return [p, p.slice().map(r => r.slice())]
    },

    adjacentCount: (p, y, x) => 
        (p[y - 1][x - 1] === '#' ? 1 : 0) +
        (p[y - 1][x    ] === '#' ? 1 : 0) +
        (p[y - 1][x + 1] === '#' ? 1 : 0) +
        (p[y    ][x - 1] === '#' ? 1 : 0) +
        (p[y    ][x + 1] === '#' ? 1 : 0) +
        (p[y + 1][x - 1] === '#' ? 1 : 0) +
        (p[y + 1][x    ] === '#' ? 1 : 0) +
        (p[y + 1][x + 1] === '#' ? 1 : 0),

    visibleCount: (p, y, x) =>
        P.visD(p, y, x, -1, -1) +
        P.visD(p, y, x, -1,  0) +
        P.visD(p, y, x, -1,  1) +
        P.visD(p, y, x,  0, -1) +
        P.visD(p, y, x,  0,  1) +
        P.visD(p, y, x,  1, -1) +
        P.visD(p, y, x,  1,  0) +
        P.visD(p, y, x,  1,  1),

    visD: (p, sy, sx, dy, dx) => {
        let seen = false
        for (
            let x = sx + dx, y = sy + dy;
            y > 0 && y < P.D.y - 1 && x > 0 && x < P.D.x - 1 && !seen;
            x += dx, y += dy
        ) {
            seen = (p[y][x] !== '.' ? p[y][x] : false)
        }
        return seen === '#' ? 1 : 0
    },

    dump: (p, i) => {
        for (let y = 1; y < P.D.y - 1; y++)
            console.log(p[y].join('').substring(1, P.D.x - 1))
        console.log()
    },

    step: (board, counter, transposer) => {
        board.push(board.shift())
        const p = board[0]
        const p1 = board[1]
        for (let y = 1; y < P.D.y - 1; y++)
            for (let x = 1; x < P.D.x - 1; x++)
                p[y][x] = transposer(p1[y][x], counter(p1, y, x))
        return p.reduce((a, y) => a + y.filter(c => c === '#').length, 0)
    },

    run: (board, counter, transposer) => {
        let c0 = -2
        let count = -1
        while (count !== c0) {
            c0 = count
            count = P.step(board, counter, transposer)
        }
        return count
    },

    part_1: T => P.run(P.prep(T), P.adjacentCount, (s, c) =>
        s === 'L' && c === 0
        ? '#'
        : (
            s === '#' && c > 3
            ? 'L'
            : s
        )
    ),

    part_2: T => P.run(P.prep(T), P.visibleCount, (s, c) =>
        s === 'L' && c === 0
        ? '#'
        : (
            s === '#' && c > 4
            ? 'L'
            : s
        )
    )

}

exports.puzzle = P
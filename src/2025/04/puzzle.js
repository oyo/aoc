const N = n => Number.parseInt(n)

exports.puzzle = P = {

    prep: T => T.trim().split('\n').map(L => L.split('').map(c => c === '@' ? 1 : 0)),

    border: (p, n) => [
        new Array(p[0].length + 2).fill(n),
        ...p.map(r => [n, ...r, n]),
        new Array(p[0].length + 2).fill(n)
    ],

    dup: (b, n) => new Array(b.length).fill(n).map(
        (_, i) => new Array(b[i].length).fill(n)
    ),

    //dump: b => console.log(b.map(r => r.join(' ').replaceAll('0', '.').replaceAll('1', '@')).join('\n')),

    part_1: T => {
        const p = P.prep(T)
        const b = P.border(p, 0)
        let s = 0
        for (let y = 1; y < b.length - 1; y++) {
            for (let x = 1; x < b[y].length - 1; x++) {
                const d = b[y][x]
                const c = (d === 1)
                    ? b[y - 1][x - 1]
                    + b[y - 1][x]
                    + b[y - 1][x + 1]
                    + b[y][x - 1]
                    + b[y][x + 1]
                    + b[y + 1][x - 1]
                    + b[y + 1][x]
                    + b[y + 1][x + 1]
                    : 0;
                if (d === 1 && c < 4)
                    s++
            }
        }
        return s
    },

    part_2: T => {
        let p = P.border(P.prep(T), 0)
        p = [p, P.dup(p, 0)]
        let s = 0
        for (
            let a = 1, q = p.shift(), r = p[0];
            a > 0;
            p.push(q), q = p.shift(), r = p[0]
        ) {
            a = 0
            for (let y = 1; y < q.length - 1; y++) {
                for (let x = 1; x < q[y].length - 1; x++) {
                    const d = q[y][x]
                    const n = (d === 1)
                        ? q[y - 1][x - 1]
                        + q[y - 1][x]
                        + q[y - 1][x + 1]
                        + q[y][x - 1]
                        + q[y][x + 1]
                        + q[y + 1][x - 1]
                        + q[y + 1][x]
                        + q[y + 1][x + 1]
                        : 0;
                    r[y][x] = n > 0 ? 1 : 0
                    if (d === 1 && n < 4) {
                        a++
                        s++
                        r[y][x] = 0
                    }
                }
            }
        }
        return s
    }

}

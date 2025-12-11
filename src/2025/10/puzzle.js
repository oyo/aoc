const N = n => Number.parseInt(n)

const bitsSet = (N, M) => {
    const result = new Set()
    const generate = (pos, count, num) => {
        if (count === M) {
            result.add(num)
            return
        }
        if (pos === N || count + (N - pos) < M) return
        generate(pos + 1, count + 1, num | (1 << pos))
        generate(pos + 1, count, num)
    }
    generate(0, 0, 0)
    return result
}

const bitIndices = (N, M) => {
    const idx = []
    for (let i = 0; i < M; i++)
        (N & (1 << i))
            && idx.push(M - i - 1)
    return idx
}

exports.puzzle = P = {

    button: (b, l) => b.reduce((a, c) => a | (1 << (l - c - 3)), 0),

    prep: T => T.trim().split('\n').map(L => L.split(' '))
        .map((L) => ([
            Number.parseInt(L[0].replace(/[\[\]]/g, '').replace(/\./g, '0').replace(/#/g, '1'), 2),
            L.slice(1, L.length - 1).map(b => b.replace(/[\(\)]/g, '').split(',').map(N)).map((b) => P.button(b, L[0].length)),
            L[L.length - 1].replace(/[\{\}]/g, '').split(',').map(N)
        ])),

    press: ([l, b]) => {
        let s = -1
        for (let i = 0; i <= b.length && s < 0; i++) {
            const nb = [...bitsSet(b.length, i)]
            for (let j = 0; j < nb.length && s < 0; j++)
                (bitIndices(nb[j], b.length).reduce((a, c) => a ^ b[c], 0) === l)
                    && (s = i)
        }
        return s
    },

    part_1: T => P.prep(T).map(p => P.press(p)).reduce((a, c) => a + c, 0),

    count: ([r, b]) => {
        const s = new Array(b.length).fill(0)
        const si = 0
        const rc = [...r]
        const min = Infinity
        const n = 0
        for (; si < b.length; si++) {
            let bc = b[si]
            for (; ; n++) {
                if (n < min) {
                    let rn = bc.reduce((a,c) => a[c]--, r)
                    if (rn.filter(a => a < 0).length > 0) {
                        n--
                        si++
                    } else if (rn.reduce((a, c) => a +c, 0) === 0)
                        min = n
                    else
                        r = rn
                    console.log(r)
                }
            }
        }
    },

    part_2: T => {
        const p = P.prep(T)
        return P.count(p[0])
        return p.length
    }

}

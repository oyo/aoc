const N = Number.parseInt
const clone2D = a => new Array(a.length).fill().map((_, i) => [...a[i]])

exports.puzzle = P = {

    prep: T => T.trim().split('\n').map(L => ['.'].concat(L.split('').concat(['.']))),

    part_1: T => {
        const S = c => c !== '.' && c !== 'T' && c !== 'F' && (c > '9' || c < '0')
        const p = P.prep(T)
        p.unshift(new Array(p[0].length).fill('.'))
        p.push(new Array(p[0].length).fill('.'))
        const p0 = clone2D(p)
        let sum = 0
        for (let y = 1; y < p.length - 1; y++) {
            for (let x = 1; x < p.length - 1; x++) {
                const c = p[y][x]
                if (!c.match(/\d/))
                    continue
                const a =
                    S(p[y - 1][x - 1]) ||
                    S(p[y - 1][x    ]) ||
                    S(p[y - 1][x + 1]) ||
                    S(p[y    ][x - 1]) ||
                    S(p[y    ][x + 1]) ||
                    S(p[y + 1][x - 1]) ||
                    S(p[y + 1][x    ]) ||
                    S(p[y + 1][x + 1])
                p[y][x] = a ? 'T' : 'F'
            }
        }
        const s = p.map(r => r.join('')
            .replace(/(TT|TF|FT)/g, 'TT')
            .replace(/(TTF|TFT|FTT|FFT|FTF|TFF)/g, 'TTT')
            .replace(/[^T]/g, '.')
            .split('')
        )
        for (let y = 1; y < s.length - 1; y++)
            for (let x = 1; x < s.length - 1; x++)
                if (s[y][x] !== 'T')
                    p0[y][x] = '.'
        return p0.map(r => r.join('').split(/\.+/))
            .flat().filter(w => w !== '').map(n => N(n))
            .reduce((a, c) => a + c)
    },

    part_2: T => {
        const G = c => (c >= '0' && c <= '9') ? 'T' : 'F'
        const grabN = (s, p, y, x) => {
            if (G(p[y][x]) === 'F')
                return s
            const c0 = p[y][x]
            let n = 0
            let xp = x
            for (; G(p[y][xp++]) === 'T';)
                ;
            xp--
            xp--
            for (let e = 0; G(p[y][xp]) === 'T'; e++, xp--)
                n += N(p[y][xp]) * (10 ** e)
            if (n !== 0)
                s.add(n)
            return s
        }
        const grab = (p, y, x) => {
            const s = new Set()
            grabN(s, p, y - 1, x - 1)
            grabN(s, p, y - 1, x    )
            grabN(s, p, y - 1, x + 1)
            grabN(s, p, y    , x - 1)
            grabN(s, p, y    , x + 1)
            grabN(s, p, y + 1, x - 1)
            grabN(s, p, y + 1, x    )
            grabN(s, p, y + 1, x + 1)
            const g = [...s]
            return g.length === 2
                ? g[0] * g[1]
                : g[0] * g[0]
        }
        const p = P.prep(T)
        p.unshift(new Array(p[0].length).fill('.'))
        p.push(new Array(p[0].length).fill('.'))
        const p0 = clone2D(p)
        let sum = 0
        for (let y = 1; y < p.length - 1; y++) {
            for (let x = 1; x < p.length - 1; x++) {
                const c = p[y][x]
                if (c !== '*')
                    continue
                const m = [
                    [G(p[y - 1][x - 1]), G(p[y - 1][x   ]), G(p[y - 1][x + 1])].join(''),
                    [G(p[y    ][x - 1]),               'F', G(p[y    ][x + 1])].join(''),
                    [G(p[y + 1][x - 1]), G(p[y + 1][x   ]), G(p[y + 1][x + 1])].join(''),
                ]
                const a = m.reduce((a, c) => a + (c === 'TFT' ? 2 : (c === 'FFF' ? 0 : 1)), 0)
                if (a === 2)
                    sum += grab(p, y, x)
            }
        }
        return sum
    }

}

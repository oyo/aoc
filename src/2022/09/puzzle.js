exports.puzzle = P = {

    prep: T => T.trim().split('\n').map(L => ((a) => [a[0], Number.parseInt(a[1])])(L.split(' '))),

    // leave for debug purposes
    dump: r => {
        let s = ''
        const b = r.map(c => c[0] * 1000 + c[1])
        for (let y = 5; y >= -5; y--) {
            for (let x = -5; x <= 5; x++) {
                const c = x * 1000 + y
                const bc = b.indexOf(c)
                s += (bc === -1 ? '.' : (bc === 0 ? 'H' : bc))
            }
            s += '\n'
        }
        console.log(s + '\n')
    },

    part_1: T => {
        const p = P.prep(T)
        const h = [0, 0]
        const t = [0, 0]
        const b = []
        for (let i = 0; i < p.length; i++) {
            const m = p[i]
            for (let n = 0; n < m[1]; n++) {
                switch (m[0]) {
                    case 'R': h[0]++; break;
                    case 'L': h[0]--; break;
                    case 'U': h[1]++; break;
                    case 'D': h[1]--; break;
                }
                const dx = h[0] - t[0]
                const dy = h[1] - t[1]
                if (dx > 1 && dy > 1) { t[0]++; t[1]++ }
                else if (dx > 1 && dy < -1) { t[0]++; t[1]-- }
                else if (dx < -1 && dy > 1) { t[0]--; t[1]++ }
                else if (dx < -1 && dy < -1) { t[0]--; t[1]-- }
                else if (dx > 1) { t[0]++; t[1] = h[1] }
                else if (dx < -1) { t[0]--; t[1] = h[1] }
                else if (dy > 1) { t[1]++; t[0] = h[0] }
                else if (dy < -1) { t[1]--; t[0] = h[0] }
                b.push(t[0] * 1000 + t[1])
            }
        }
        return [...new Set(b)].length
    },

    part_2: T => {
        const p = P.prep(T)
        const r = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
        const b = []
        for (let i = 0; i < p.length; i++) {
            const m = p[i]
            for (let n = 0; n < m[1]; n++) {
                let h = r[0]
                switch (m[0]) {
                    case 'R': h[0]++; break;
                    case 'L': h[0]--; break;
                    case 'U': h[1]++; break;
                    case 'D': h[1]--; break;
                }
                for (let k = 1; k < r.length; k++) {
                    let h = r[k - 1]
                    let t = r[k]
                    const dx = h[0] - t[0]
                    const dy = h[1] - t[1]
                    if (dx > 1 && dy > 1) { t[0]++; t[1]++ }
                    else if (dx > 1 && dy < -1) { t[0]++; t[1]-- }
                    else if (dx < -1 && dy > 1) { t[0]--; t[1]++ }
                    else if (dx < -1 && dy < -1) { t[0]--; t[1]-- }
                    else if (dx > 1) { t[0]++; t[1] = h[1] }
                    else if (dx < -1) { t[0]--; t[1] = h[1] }
                    else if (dy > 1) { t[1]++; t[0] = h[0] }
                    else if (dy < -1) { t[1]--; t[0] = h[0] }
                }
                b.push(r[9][0] * 1000 + r[9][1])
            }
        }
        return [...new Set(b)].length
    }

}

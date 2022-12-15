exports.puzzle = P = {

    prep: T => T.trim().split('\n').map(L => L.split(' ').slice(1).map(M => Number.parseInt(M))),

    part_1: T => {
        const p = P.prep(T)
        const t = [20, 60, 100, 140, 180, 220]
        const s = []
        let X = 1
        let c = 1
        let ti = 0
        for (let i = 0; i < p.length; i++) {
            const cmd = p[i]
            let n = 0
            if (cmd.length === 0) {
                c++
            } else {
                n = cmd[0]
                c += 2
                X += n
            }
            const d = c - t[ti]
            if (d >= 0) {
                const v = d > 0 ? X - n : X
                s.push(t[ti] * v)
                ti++
            }
        }
        return s.reduce((a, b) => a + b)
    },

    draw: (s, X) => s.concat([(s.length % 40) >= X - 1 && (s.length % 40) <= X + 1 ? '#' : '.']),

    print: t => {
        const r = [], s = [...t]
        while (s.length > 0)
            r.push(s.splice(0, 40).join(''))
        return r.join('\n')
    },

    part_2: T => {
        const p = P.prep(T)
        let s = []
        let X = 1
        let c = 1
        for (let i = 0; i < p.length; i++) {
            const cmd = p[i]
            if (cmd.length === 0) {
                c++
                s = P.draw(s, X)
            } else {
                const n = cmd[0]
                c += 2
                s = P.draw(s, X)
                s = P.draw(s, X)
                X += n
            }
        }
        return P.print(s)
    }

}

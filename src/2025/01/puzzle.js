const N = n => Number.parseInt(n)

exports.puzzle = P = {

    prep: T => T.trim().replaceAll('L', '-').replaceAll('R', '').split('\n').map(N),

    part_1: T => {
        let z = 0
        P.prep(T).reduce((a, c) => {
            const n = (a + c) % 100
            if (n === 0) z++
            return n
        }, 50)
        return z
    },

    part_2: T => {
        const p = P.prep(T)
        let a = 50
        let z = 0
        for (let c of p) {
            z += ~~(Math.abs(c) / 100)
            c = c % 100
            for (let i = 0; i < Math.abs(c); i++) {
                a += c > 0 ? 1 : -1
                if (a % 100 === 0) z++
            }
        }
        return z
    }

}

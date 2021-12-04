const pad = s => (`    ${s}`).substr(-4)

class Board {

    constructor(b) {
        const p = b.trim().split(/\s+/).map(n => n * 1)
        this.board = [p, new Array(p.length)]
        this.m = 0
        this.score = 0
    }

    check(idx) {
        const y = ~~(idx / 5)
        const x = idx % 5
        const b = this.board[1]
        let s = 0
        for (let i = 0; i < 5 && !isNaN(s); i++)
            s += b[5 * y + i]
        if (!isNaN(s))
            return true
        s = 0
        for (let i = 0; i < 5 && !isNaN(s); i++)
            s += b[i * 5 + x]
        return !isNaN(s)
    }

    countScore(n) {
        if (this.score < 1)
            this.score = this.board[0].filter(v => !isNaN(v)).reduce((o, a) => o + a, 0) * n
        return this.score
    }

    call(n) {
        if (this.score > 0)
            return this.score
        const b = this.board
        const i = b[0].indexOf(n)
        if (i < 0)
            return 0
        b[0][i] = NaN
        b[1][i] = n
        if (++this.m < 5)
            return 0
        if (this.check(i))
            return this.countScore(n)
        return 0
    }

    toString() {
        let s = ''
        for (let bi = 0; bi < 2; bi++) {
            const b = this.board[bi]
            for (let y = 0; y < 5; y++)
                s += b.slice(y * 5, y * 5 + 5).map(r => pad(r)) + '\n'
            s += '\n'
        }
        return s
    }
}

exports.puzzle = P = {

    prep: T => {
        const p = T.split('\n\n');
        const n = p.shift().trim().split(',').map(n => n * 1)
        const b = p.map(b => new Board(b))
        return { n: n, b: b }
    },

    part_1: T => {
        const p = P.prep(T)
        const b = p.b
        for (let i = 0; i < p.n.length; i++) {
            for (let j = 0; j < b.length; j++) {
                const score = b[j].call(p.n[i])
                if (score)
                    return score
            }
        }
        return 0
    },

    part_2: T => {
        const p = P.prep(T)
        let b = p.b
        for (let i = 0; i < p.n.length; i++) {
            for (let j = 0; j < b.length; j++) {
                const score = b[j].call(p.n[i])
                if (b.length === 1 && score)
                    return score
            }
            b = b.filter(u => u.score === 0)
        }
        return 0
    }

}

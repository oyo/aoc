const pad = s => (`    ${s}`).substr(-4)

class Board {

    constructor(b) {
        const p = b.trim().split(/\s+/).map(n => n * 1)
        this.board = [p, new Array(p.length)]
        this.m = 0
        this.score = 0
    }

    count(n) {
        if (this.score < 1)
            this.score = this.board[0].filter(v => !isNaN(v)).reduce((o, a) => o + a, 0) * n
        return this.score
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
            s += b[5 * i + x]
        return !isNaN(s)
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
            return this.count(n)
        return 0
    }

    toString = () => this.board.map(b =>
        new Array(5).fill().map((_, i) => b.slice(i * 5, i * 5 + 5)
            .map(v => pad(v)).join('')).join('\n')
    ).join('\n\n')
}

exports.puzzle = P = {

    prep: T => (p => ({
        n: p.shift().trim().split(',').map(n => n * 1),
        b: p.map(b => new Board(b))
    }))(T.split('\n\n')),

    part_1: T => {
        const p = P.prep(T)
        for (n of p.n) {
            for (b of p.b) {
                const score = b.call(n)
                if (score)
                    return score
            }
        }
    },

    part_2: T => {
        const p = P.prep(T)
        for (n of p.n) {
            for (b of p.b) {
                const score = b.call(n)
                if (p.b.length === 1 && score)
                    return score
            }
            p.b = p.b.filter(u => u.score === 0)
        }
    }

}

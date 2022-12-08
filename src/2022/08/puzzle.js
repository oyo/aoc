exports.puzzle = P = {

    prep: T => T.trim().split('\n').map(L => L.split('').map(n => Number.parseInt(n))),

    visible: (p, y, x) => {
        const v = p[y][x]
        let visible = true
        for (let iy = y - 1; iy >= 0 && visible; iy--)
            visible = p[iy][x] < v
        if (visible)
            return true
        visible = true
        for (let iy = y + 1; iy < p.length && visible; iy++)
            visible = p[iy][x] < v
        if (visible)
            return true
        visible = true
        for (let ix = x - 1; ix >= 0 && visible; ix--)
            visible = p[y][ix] < v
        if (visible)
            return true
        visible = true
        for (let ix = x + 1; ix < p.length && visible; ix++)
            visible = p[y][ix] < v
        if (visible)
            return true
    },

    score: (p, y, x) => {
        const v = p[y][x]
        const d = [1, 1, 1, 1]
        let visible = true
        let iy = y - 1
        for (; iy >= 0 && visible; iy--)
            visible = p[iy][x] < v
        d[0] = y - iy - 1
        visible = true
        iy = y + 1
        for (; iy < p.length && visible; iy++)
            visible = p[iy][x] < v
        d[1] = iy - y - 1
        visible = true
        let ix = x - 1
        for (; ix >= 0 && visible; ix--)
            visible = p[y][ix] < v
        d[2] = x - ix - 1
        visible = true
        ix = x + 1
        for (; ix < p.length && visible; ix++)
            visible = p[y][ix] < v
        d[3] = ix - x - 1
        return d.reduce((a, b) => a * b, 1)
    },

    part_1: T => {
        const p = P.prep(T)
        let s = 0
        for (let y = 0; y < p.length; y++)
            for (let x = 0; x < p[y].length; x++)
                s += P.visible(p, y, x) ? 1 : 0
        return s
    },

    part_2: T => {
        const p = P.prep(T)
        let s = 0
        for (let y = 0; y < p.length; y++)
            for (let x = 0; x < p[y].length; x++) {
                const vs = P.score(p, y, x)
                if (vs > s)
                    s = vs
            }
        return s
    }

}

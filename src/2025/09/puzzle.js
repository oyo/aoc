const N = n => Number.parseInt(n)

exports.puzzle = P = {

    prep: T => T.trim().split('\n').map(L => L.split(',').map(N)),

    isInsideRect: (r1, r2, p) =>
        p[0] > r1[0] &&
        p[0] < r2[0] &&
        p[1] > r1[1] &&
        p[1] < r2[1],

    checkIntersect: (r1, r2, l1, l2) => {
        const minr = [Math.min(r1[0], r2[0]), Math.min(r1[1], r2[1])]
        const maxr = [Math.max(r1[0], r2[0]), Math.max(r1[1], r2[1])]
        const l1i = P.isInsideRect(minr, maxr, l1)
        const l2i = P.isInsideRect(minr, maxr, l2)
        if (l1i && l2i) return false
        if ((l1i && !l2i) || (!l1i && l2i)) return true
        // both outside - check line intersection
        if (l1[0] === l2[0]) {
            // vertical line
            if (
                (Math.min(r1[0], r2[0]) < l1[0] && l1[0] < Math.max(r1[0], r2[0])) &&
                (
                    Math.min(l1[1], l2[1]) < Math.max(r1[1], r2[1]) &&
                    Math.max(l1[1], l2[1]) > Math.min(r1[1], r2[1])
                )
            ) return true
        }
        if (l1[1] === l2[1]) {
            // horizontal line
            if (
                (Math.min(r1[1], r2[1]) < l1[1] && l1[1] < Math.max(r1[1], r2[1])) &&
                (
                    Math.min(l1[0], l2[0]) < Math.max(r1[0], r2[0]) &&
                    Math.max(l1[0], l2[0]) > Math.min(r1[0], r2[0])
                )
            ) return true
        }
        return false

    },

    part_1: T => {
        const p = P.prep(T)
        let max = -Infinity
        for (let i = 0; i < p.length; i++) {
            for (let j = i + 1; j < p.length; j++) {
                const [x1, y1] = p[i]
                const [x2, y2] = p[j]
                dx = Math.abs(x2 - x1) + 1
                dy = Math.abs(y2 - y1) + 1
                let area = dx * dy
                if (area > max) max = area
            }
        }
        return max
    },

    // TODO:
    // - intersection check on line is ok
    part_2: T => {
        const p = P.prep(T)
        let max = [-Infinity, 0, 0]
        for (let i = 0; i < p.length; i++) {
            for (let j = i + 1; j < p.length; j++) {
                const [x1, y1] = p[i]
                const [x2, y2] = p[j]
                dx = Math.abs(x2 - x1) + 1
                dy = Math.abs(y2 - y1) + 1
                let area = dx * dy
                if (area > max[0]) {
                    let intersect = false
                    for (let k = 0; k < p.length && !intersect; k++) {
                        let pl1 = p[k]
                        let pl2 = p[(k + 1) % p.length]
                        intersect = P.checkIntersect(p[i], p[j], pl1, pl2)
                        console.log('check', p[i], p[j], pl1, pl2, '=>', intersect)
                    }
                    if (!intersect)
                        max = [area, p[i], p[j]]
                }
            }
        }
        return max
    }

}

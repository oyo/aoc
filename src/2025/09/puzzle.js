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
        const minl = [Math.min(l1[0], l2[0]), Math.min(l1[1], l2[1])]
        const maxl = [Math.max(l1[0], l2[0]), Math.max(l1[1], l2[1])]
        const l1i = P.isInsideRect(minr, maxr, l1)
        const l2i = P.isInsideRect(minr, maxr, l2)
        if (l1i || l2i) return true
        if (minl[0] === maxl[0])
            return (
                y = minl[0], 
                (y > minr[0] && y < maxr[0]) &&
                (minl[1] <= minr[1] && maxl[1] >= maxr[1])
            )
        if (minl[1] === maxl[1])
            return (
                x = minl[1],
                (x > minr[1] && x < maxr[1]) &&
                (minl[0] <= minr[0] && maxl[0] >= maxr[0])
            )
        return false
    },

    part_1: T => {
        const p = P.prep(T)
        let max = -Infinity
        for (let i = 0; i < p.length; i++)
            for (let j = i + 1; j < p.length; j++) {
                const [x1, y1] = p[i]
                const [x2, y2] = p[j]
                const area = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1)
                if (area > max)
                    max = area
            }
        return max
    },

    part_2: T => {
        const p = P.prep(T)
        let max = -Infinity
        for (let i = 0; i < p.length; i++)
            for (let j = i + 1; j < p.length; j++) {
                const [x1, y1] = p[i]
                const [x2, y2] = p[j]
                const area = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1)
                if (area > max) {
                    let intersect = false
                    for (let k = 0; k < p.length && !intersect; k++)
                        intersect = P.checkIntersect(
                            p[i],
                            p[j],
                            p[k],
                            p[(k + 1) % p.length]
                        )
                    if (!intersect)
                        max = area
                }
            }
        return max
    }

}

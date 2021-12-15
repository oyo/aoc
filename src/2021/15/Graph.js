// not used but kept
const Graph = {

    dfs: (p, v) => {
        if (v.d)
            return
        v.d = true
        const x = v.x
        const y = v.y
        if (y < p.length - 1) Graph.dfs(p, p[y + 1][x])
        if (x < p[y].length - 1) Graph.dfs(p, p[y][x + 1])
        if (y > 0) Graph.dfs(p, p[y - 1][x])
        if (x > 0) Graph.dfs(p, p[y][x - 1])
    },

    dfsStack: (p, v) => {
        let s = []
        s.push(v)
        while (s.length > 0) {
            v = s.pop()
            if (!v.d) {
                v.d = true
                const x = v.x
                const y = v.y
                if (y < p.length - 1) s.push(p[y + 1][x])
                if (x < p[y].length - 1) s.push(p[y][x + 1])
                if (y > 0) s.push(p[y - 1][x])
                if (x > 0) s.push(p[y][x - 1])
            }
        }
    },

}
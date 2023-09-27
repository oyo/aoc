const { alg, Graph } = require('graphlib')

exports.puzzle = P = {

    prep: T => T.trim().split('\n')
        .map(L => L.split(/(Valve | has flow rate=|; tunnels? leads? to valves? )/))
        .map(M => [M[2],Number.parseInt(M[4]),M[6].split(', ')]),

    part_1: T => {
        const p = P.prep(T)
        console.log(p)
        const sum = p.reduce((a,b) => a+b[1], 0)
        console.log(sum)

        const N = new Map()
        const E = new Map()
        const G = new Graph()
        p.forEach(v => N.set(v[0], v))
        console.log(N)
        p.forEach(v => G.setNode(v[0]))
        p.forEach(v => v[2].forEach(w => {
            const label = `${v[0]}-${w}`
            G.setEdge(v[0], w, label)
            E.set(label, sum-N.get(w)[1])
        }))
        console.log(E)
        console.log(G)
        const path = alg.dijkstra(G, 'AA', (e) => {
            const w = E.get(G.edge(e))
            console.log(w)
            return w
        })
        console.log(path)
        return p
    },

    part_2: T => {
        const p = P.prep(T)
        return p.length
    }

}

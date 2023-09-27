class Graph {

    constructor() {
        this.nodes = new Map()
    }

    addVertex(v) {
        this.nodes.set(v, new Map())
    }

    addEdge(v, w, uni, weight) {
        const vn = this.nodes.get(v)
        vn.set(w, weight || 1)
        if (!uni) {
            const wn = this.nodes.get(w)
            wn.set(v, weight || 1)
        }
    }

    print() {
        let keys = this.nodes.keys()
        for (let i of keys) {
            let values = this.nodes.get(i)
            let conc = ''
            for (let j of values)
                conc += j + ' '
            console.log(i + ' -> ' + conc)
        }
    }

    dijkstra(source) {
        const dist = new Map()
        const prev = new Map()
        const Q = new Array()
        const vertices = this.nodes.keys()
        for (let v of vertices) {
            dist.set(v, 1e9)
            Q.push(v)
        }
        dist.set(source, 0)

        while (Q.length !== 0) {
            u ← vertex in Q with min dist[u]
            remove u from Q

            for each neighbor v of u still in Q:
                alt ← dist[u] + Graph.Edges(u, v)
                if alt < dist[v]:
                    dist[v] ← alt
                    prev[v] ← u
        return dist[], prev[]
    }

    bfs(start) {
        let visited = {}
        let q = new Array()
        let path = new Array()
        visited[start] = true
        q.push(start)
        while (q.length !== 0) {
            let qe = q.shift()
            path.push(qe)
            let keys = this.nodes.get(qe).keys()
            console.log('QK', q, keys)
            for (let neigh of keys) {
                //let neigh = list[i]
                if (!visited[neigh]) {
                    visited[neigh] = true
                    q.push(neigh)
                }
            }
        }
        return path
    }
    
    dfsRek(vert, visited) {
        visited[vert] = true
        console.log(vert)
        let neighbors = this.nodes.get(vert)
        for (let i in neighbors) {
            let n = neighbors[i]
            if (!visited[n])
                this.dfsRek(n, visited)
        }
    }

    dfs(start) {
        let visited = {}
        this.dfsRek(start, visited)
    }

}


function example() {
    let g = new Graph()
    let vertices = ['A', 'B', 'C', 'D', 'E', 'F']

    for (let i = 0; i < vertices.length; i++)
        g.addVertex(vertices[i])

    g.addEdge('A', 'B')
    g.addEdge('A', 'D')
    g.addEdge('A', 'E')
    g.addEdge('B', 'C')
    g.addEdge('D', 'E')
    g.addEdge('E', 'F')
    g.addEdge('E', 'C')
    g.addEdge('C', 'F')

    g.print()

    console.log('BFS')
    g.bfs('A')

    console.log('DFS')
    g.dfs('A')
}

module.exports = Graph

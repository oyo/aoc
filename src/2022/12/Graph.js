class Graph {

    constructor() {
        this.nodes = new Map()
    }

    addVertex(v) {
        this.nodes.set(v, [])
    }

    addEdge(v, w, uni) {
        this.nodes.get(v).push(w)
        if (!uni)
            this.nodes.get(w).push(v)
    }

    print() {
        let get_keys = this.nodes.keys()
        for (let i of get_keys) {
            let get_values = this.nodes.get(i)
            let conc = ''
            for (let j of get_values)
                conc += j + ' '
            console.log(i + ' -> ' + conc)
        }
    }

    bfs(start) {
        let visited = {}
        let q = new Array()
        visited[start] = true
        q.push(start)
        while (q.length !== 0) {
            let qe = q.shift()
            console.log(qe)
            let get_List = this.nodes.get(qe)
            for (let i in get_List) {
                let neigh = get_List[i]
                if (!visited[neigh]) {
                    visited[neigh] = true
                    q.push(neigh)
                }
            }
        }
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

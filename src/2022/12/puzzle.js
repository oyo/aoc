const Graph = require('./Graph')

exports.puzzle = P = {

    prep: T => T.trim().split('\n').map(L => L.replace('S', '`').replace('E', '{').split('')),

    cmp: (g, p, x0, y0, x1, y1) => {
        if (y1<0 || y1>=p.length || x1<0 || x1>= p[y1].length)
            return
        const c0 = p[y0][x0]
        const d0 = c0.charCodeAt(0)
        const n0 = `${x0},${y0},${c0}`
        const c1 = p[y1][x1]                  
        const d1 = c1.charCodeAt(0)
        const n1 = `${x1},${y1},${c1}`
        console.log('cmp', n0, n1)
        if (c1 <= c0+1)
            g.addEdge(n0, n1, true)
        //g.print()
    },

    graph: p => {
        const g = new Graph()
        //for (let y = 0; y < 1; y++) {
        for (let y = 0; y < p.length; y++) {
            for (let x = 0; x < p[y].length; x++) {
                const c = p[y][x]
                const n = `${x},${y},${c}`
                g.addVertex(n)
            }
        }
        //for (let y = 0; y < 1; y++) {
        for (let y = 0; y < p.length; y++) {
            for (let x = 0; x < p[y].length; x++) {
                P.cmp(g,p,x,y,x,y-1)
                P.cmp(g,p,x,y,x,y+1)
                P.cmp(g,p,x,y,x-1,y)
                P.cmp(g,p,x,y,x+1,y)
            }
        }
        return g
    },

    part_1: T => {
        const p = P.prep(T)
        console.log(p)
        const g = P.graph(p)

        /*
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
    
        g.printGraph()
    
        console.log('BFS')
        g.bfs('A')
    
        console.log('DFS')
        g.dfs('A')
        */
        g.print()
        return '-'
    },

    part_2: T => {
        const p = P.prep(T)
        return '-'
    }

}

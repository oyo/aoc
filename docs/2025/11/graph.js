// implementation for graphs where nodes and edges are added only, never removed

class Graph {

  constructor() {
    this.nodeMap = new Map()
    this.nodes = new Array()
    this.edges = new Array()
  }

  addNode(n) {
    const id = typeof n === 'number' ? n : this.nodes.length
    const node = {
      id,
      name: n.toString(),
      edges: []
    }
    this.nodeMap.set(n, node)
    this.nodes[id] = node
    return this
  }

  addNodes(nodes) {
    nodes.forEach(n => this.addNode(n))
    return this
  }

  addEdge([v, w, uni]) {
    const vi = typeof v === 'string' ? this.nodeMap.get(v).id : v
    const wi = typeof w === 'string' ? this.nodeMap.get(w).id : w
    const edge = [vi, wi, uni]
    this.edges.push(edge)
    this.nodes[vi].edges.push(edge)
    if (!uni)
      this.nodes[wi].edges.push(edge)
    return this
  }

  addEdges(edges) {
    edges.forEach(e => this.addEdge(e))
    return this
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
    for (let n of neighbors)
      if (!visited[n])
        this.dfsRek(n, visited)
  }

  dfs(start) {
    let visited = {}
    this.dfsRek(start, visited)
  }

  pathsBetween(a, b) {
    const v = {}
    let s = 0
    const count = (c) => {
      if (c === b) {
        s++
        return
      }
      v[c] = true
      let neighbors = this.nodes.get(c)
      for (let n of neighbors)
        if (!v[n])
          count(n)
      v[c] = false
    }
    count(a)
    return s
  }

  getAsFDL() {
    return {
      nodes: this.nodes,
      links: this.edges.map(e => ({
        source: e[0],
        target: e[1]
      }))
    }
  }

}

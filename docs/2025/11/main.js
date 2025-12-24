const P = {

  prep: T => T.trim().split('\n').map(L => L.split(': ')).map(L => [L[0], L[1].split(' ')]),

  part_1: T => {
    const g = new Graph()
    const p = P.prep(T)
    p.forEach(n => g.addVertex(n[0]))
    g.addVertex('out')
    p.forEach(n => n[1].forEach(m => g.addEdge(n[0], m, true)))
    return g.pathsBetween('you', 'out')
  },

  getData: () => this.data,

  init: raw => {
    const prep = P.prep(raw)
    const graph = new Graph()
      .addNodes(prep.map(n => n[0]).concat('out'))
    prep.forEach(n => graph.addEdges(n[1].map(e => [n[0], e, true])))
    this.data = {
      raw,
      prep,
      graph
    }
    return this
  }

}

class Game {
  constructor() {
    const gnode = document.createElement('div')
    document.body.appendChild(gnode)
    this.graph = new ForceGraph3D(gnode)
      .linkDirectionalArrowLength(3.5)
      .linkDirectionalArrowRelPos(1)
      .nodeColor((n) =>
        ['you', 'out', 'svr'].includes(n.name)
          ? '#88ff88'
          : (['fft', 'dac'].includes(n.name)
            ? '#ff8888'
            : '#444444'
          )
      )
      .graphData(P.getData().graph.getAsFDL())
  }
}
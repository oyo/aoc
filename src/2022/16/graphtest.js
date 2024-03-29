var Graph = require("graphlib").Graph;

// Create a new directed graph
var g = new Graph();

console.log(g)
// Add node "a" to the graph with no label
g.setNode("a");

g.hasNode("a");
// => true

// Add node "b" to the graph with a String label
g.setNode("b", "b's value");

// Get the label for node b
g.node("b");
// => "b's value"

// Add node "c" to the graph with an Object label
g.setNode("c", { k: 123 });

// What nodes are in the graph?
g.nodes();
// => `[ 'a', 'b', 'c' ]`

// Add a directed edge from "a" to "b", but assign no label
g.setEdge("a", "b", "A-B");
g.setEdge("b", "a", "B-A");

g.edges().forEach(e => {
    console.log(e, g.edge(e))
})

// Add a directed edge from "c" to "d" with an Object label.
// Since "d" did not exist prior to this call it is automatically
// created with an undefined label.
g.setEdge("c", "d", { k: 456 });

// What edges are in the graph?
g.edges();
// => `[ { v: 'a', w: 'b' },
//       { v: 'c', w: 'd' } ]`.

// Which edges leave node "a"?
g.outEdges("a");
// => `[ { v: 'a', w: 'b' } ]`

// Which edges enter and leave node "d"?
g.nodeEdges("d");
// => `[ { v: 'c', w: 'd' } ]`

console.log(g)

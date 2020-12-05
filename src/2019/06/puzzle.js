const _ = require('lodash')

const P = {

    prep: T => T.trim().split('\n').map(L => L.split(')')),

    tree: T => {
        let node = {}
        const p = P.prep(T)
        const t = p.map(o => {
            let np = node[o[0]]
            let nc = node[o[1]]
            if (!nc) {
                nc = {
                }
                node[o[1]] = nc
            }
            nc.p = o[0]
            if (!np) {
                np = {
                    c: []
                }
                node[o[0]] = np
            }
            if (!np.c)
                np.c = []
            np.c.push(o[1])
        })
        return node
    },

    pathToRoot: (tree,n) => {
        let path = []
        while (n !== 'COM') {
            let o = tree[n]
            path.push(n)
            n = o.p
        }
        return path
    },

    part_1: T => (tree => 
            Object.keys(tree).map(n => P.pathToRoot(tree,n).length).reduce((a,b) => a+b)
        )(P.tree(T)),

    part_2: T => {
        const tree = P.tree(T)
        const you = P.pathToRoot(tree,'YOU')
        const san = P.pathToRoot(tree,'SAN')
        return _.union(you,san).length - _.intersection(you,san).length -2
    }

}

exports.puzzle = P 
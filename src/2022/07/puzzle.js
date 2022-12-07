exports.puzzle = P = {

    prep: T => T.trim().split('\n'),

    process: (node, data, ptr) => {
        for (; ptr < data.length;) {
            const c = data[ptr++]
            if (c.match(/^\$ cd /)) {
                const td = c.substring(5)
                node = td === '..' ? node.p : node.c.filter(n => n.n === td)[0]
            } else if (c.match(/^\$ ls/)) {
                for (; ptr < data.length && !data[ptr].match(/^\$ /); ptr++) {
                    const item = data[ptr].split(' ')
                    if (item[0] === 'dir')
                        node.c.push({ n: item[1], s: 0, p: node, c: [] })
                    else {
                        const size = Number.parseInt(item[0])
                        node.c.push({ n: item[1], s: size, p: node })
                    }
                }
                ptr--;
            }
        }
    },

    sumTree: node => {
        if (node.c)
            for (let i = 0; i < node.c.length; i++)
                node.s += P.sumTree(node.c[i])
        return node.s
    },

    createTree: T => {
        P.root = { c: [{ n: '/', s: 0, c: [] }], s: 0 }
        P.process(P.root, P.prep(T), 0)
        P.sumTree(P.root)
        return P.root
    },

    sumToDelete: (node) => {
        let s = 0
        if (node.c) {
            if (node.s <= 100000)
                s += node.s
            for (let i = 0; i < node.c.length; i++)
                s += P.sumToDelete(node.c[i])
        }
        return s
    },

    dirsToDelete: (dirs, node) => {
        if (node.c) {
            dirs.push(node.s)
            for (let i = 0; i < node.c.length; i++)
                P.dirsToDelete(dirs, node.c[i])
        }
    },

    part_1: T => P.sumToDelete(P.createTree(T)),

    part_2: T => {
        P.createTree(T)
        const free = 70000000 - P.root.s
        const dirs = []
        P.dirsToDelete(dirs, P.root)
        return dirs.filter(v => free + v > 30000000).sort((a, b) => a - b)[0]
    }

}

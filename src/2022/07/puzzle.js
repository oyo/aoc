exports.puzzle = P = {

    createTree: T => {
        const data = T.trim().split('\n')
        const root = { c: [{ n: '/', s: 0, c: [] }] }
        let node = root
        for (let ptr = 0; ptr < data.length;) {
            const c = data[ptr++]
            if (c.match(/^\$ cd/)) {
                const td = c.substring(5)
                node = td === '..' ? node.p : node.c.filter(n => n.n === td)[0]
            } else if (c.match(/^\$ ls/)) {
                for (; ptr < data.length && !data[ptr].match(/^\$/); ptr++) {
                    const item = data[ptr].split(' ')
                    node.c.push(
                        item[0] === 'dir'
                            ? { n: item[1], s: 0, p: node, c: [] }
                            : { s: Number.parseInt(item[0]) }
                    )
                }
                ptr--;
            }
        }
        P.sumTree(root.c[0])
        return root.c[0]
    },

    sumTree: node => {
        if (node.c)
            for (let i = 0; i < node.c.length; i++)
                node.s += P.sumTree(node.c[i])
        return node.s
    },

    dirsToDelete: (dirs, node) => {
        if (node.c) {
            dirs.push(node.s)
            for (let i = 0; i < node.c.length; i++)
                P.dirsToDelete(dirs, node.c[i])
        }
        return dirs
    },

    part_1: T => P.dirsToDelete([], P.createTree(T))
        .filter(v => v < 100000)
        .reduce((a, b) => a + b),

    part_2: T =>
        (root =>
            (free =>
                P.dirsToDelete([], root)
                    .filter(v => free + v > 30000000)
                    .sort((a, b) => a - b)[0]
            )(70000000 - root.s)
        )(P.createTree(T))

}

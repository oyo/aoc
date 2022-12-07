exports.puzzle = P = {

    tree: T => {
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
        P.sum(root.c[0])
        return root.c[0]
    },

    sum: node => {
        if (node.c)
            for (let i = 0; i < node.c.length; i++)
                node.s += P.sum(node.c[i])
        return node.s
    },

    dirs: (dirs, node) => {
        if (node.c) {
            dirs.push(node.s)
            for (let i = 0; i < node.c.length; i++)
                P.dirs(dirs, node.c[i])
        }
        return dirs
    },

    part_1: T => P.dirs([], P.tree(T))
        .filter(v => v < 1e5)
        .reduce((a, b) => a + b),

    part_2: T =>
        (root =>
            (free =>
                P.dirs([], root)
                    .filter(v => free + v > 3e7)
                    .sort((a, b) => a - b)[0]
            )(7e7 - root.s)
        )(P.tree(T))

}

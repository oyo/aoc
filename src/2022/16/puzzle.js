const { alg, Graph } = require('graphlib')

exports.puzzle = P = {

    prep: T => T.trim().split('\n')
        .map(L => L.split(/(Valve | has flow rate=|; tunnels? leads? to valves? )/))
        .map(M => [M[2], Number.parseInt(M[4]), M[6].split(', ')]),

    traverse: (N, all, flow, path, min) => {
        const c = N.get(path.at(-1))
        if (c[1]>0) {
            flow.pus
        }
        console.log(path)
        for (let n of c[2]) {
            if (!path.includes(n)) {
                const p = [...path]
                p.push(n)
                const sbest = P.traverse(N, p, min+1)
            }
        }
        return 
    },

    part_1: T => {
        const p = P.prep(T)
        console.log(p)
        const N = new Map()
        p.forEach(v => N.set(v[0], v))
        console.log(N)
        //const E = new Map()
        //p.forEach(v => E.set(v, v[2].map(w => [w,  N.get(w)[1]])))
        //console.log(E)
        //const F = E.sort((a,b) => b[0]-a[1])
        //console.log(F)
        const paths = P.traverse(N, [], [0, 'AA'])
        console.log(paths)
        return p
    },

    part_2: T => {
        const p = P.prep(T)
        return p.length
    }

}

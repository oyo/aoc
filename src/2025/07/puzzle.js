const dump = p => { console.log(p.join('\n')) }
const path = t => t.toString(2).padStart(14, 0).match(/(.{2})/g).map(v => {
    if (v === '00') return '|'
    if (v === '01') return '<'
    if (v === '10') return '>'
    if (v === '11') return '@'
}).join('')

exports.puzzle = P = {

    prep: T => T.trim().split('\n').filter((_, i) => i % 2 === 0),

    part_1: T => {
        const p = P.prep(T)
        const b = [[p[0].indexOf('S')]]
        let s = 0
        for (let y = 1; y < p.length; y++) {
            const by = new Set()
            for (let x = 0; x < p[y].length; x++) {
                if (p[y][x] === '.') {
                    if (b[y - 1].includes(x))
                        by.add(x)
                }
                else if (p[y][x] === '^' && b[y - 1].includes(x)) {
                    s++
                    by.add(x - 1)
                    by.add(x + 1)
                }
            }
            b.push([...by])
        }
        return s
    },

    // TODO:
    // 1. not getting expected result for test input
    // 2. out of memory for actual input - need to optimize:
    //    a. only store previous row
    //    a. use a DAG and calculate total number of paths
    part_2: T => {
        const p = P.prep(T)
        dump(p)
        const b = [[p[0].indexOf('S')]]
        const t = new Array(1000000)
        t[p[0].indexOf('S')] = [0]
        let s = 0
        for (let y = 1; y < p.length; y++) {
            let by = new Set()
            for (let x = 0; x < p[y].length; x++) {
                if (p[y][x] === '.') {
                    if (b[y - 1].includes(x)) {
                        by.add(x)
                        const ty0 = t[(y - 1) * 1000 + x]
                        const ty1 = ty0.map(v => v << 2)
                        t[y * 1000 + x] = ty1
                    }
                }
                else if (p[y][x] === '^' && b[y - 1].includes(x)) {
                    s++
                    by.add(x - 1)
                    by.add(x + 1)
                    const ty0 = t[(y - 1) * 1000 + x]
                    const ty11 = ty0.map(v => (v << 2) | 1)
                    const ty12 = ty0.map(v => (v << 2) | 2)
                    const i1 = y * 1000 + x - 1
                    const i2 = y * 1000 + x + 1
                    t[i1] = ([
                        ...(t[i1] ? t[i1] : []),
                        ...ty11
                    ])
                    t[i2] = ([
                        ...(t[i2] ? t[i2] : []),
                        ...ty12
                    ])
                }
            }
            b.push([...by])
        }
        //console.log(t.filter(v => v !== undefined).map(v => v.map(w => w.toString(2).padStart(14, '0'))))
        const l = t.slice((p.length - 1) * 1000).filter(v => v !== undefined)
        //console.log(l.length, l)
        const u = l.flat()
        console.log(u.length, [...u].map(v => path(v)))
        return u.length
    }

}

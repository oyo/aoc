const _ = require('lodash')

const P = {

    prep: T => T.split('\n').map(L => L.split(/ = /)),

    value: (v,m) => (BigInt(v) |
        BigInt('0b' + m.replace(/X/g, '0'))) &
        BigInt('0b' + m.replace(/X/g, '1')),

    addresses: (v,m) => {
        let list = [ BigInt(v) | BigInt('0b' + m.replace(/X/g, '0')) ]
        for (let i = 0; i < m.length; i++) {
            if (m[35-i]==='X') {
                const smask = BigInt(1)<<BigInt(i)
                list = list.flatMap(a => [
                    a | smask,
                    a & (~smask)
                ])
            }
        }
        return list.map(a => a.toString(2))
    },

    part_1: T => {
        let mask = 0
        let memory = {}
        P.prep(T).forEach(l => {
            if (l[0] === 'mask')
                mask = l[1]
            else
                memory[l[0].split(/[\[\]]/g)[1]] = P.value(l[1], mask)
        })
        return _.reduce(memory, (a,v) => a + BigInt(v), BigInt(0)).toString()*1
    },

    part_2: T => {
        let mask = 0
        let memory = {}
        P.prep(T).forEach(l => {
            if (l[0] === 'mask')
                mask = l[1]
            else
                P.addresses(l[0].split(/[\[\]]/g)[1], mask).forEach(a => memory[a] = BigInt(l[1]))
        })
        return _.reduce(memory, (a,v) => a + BigInt(v), BigInt(0)).toString()*1
    }

}

exports.puzzle = P
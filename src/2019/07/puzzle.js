const DEBUG = false

const permutate = str => {
    if (str.length <= 2)
        return str.length === 2 ? [str, str[1] + str[0]] : [str]
    return str
        .split('')
        .reduce(
            (acc, letter, i) =>
            acc.concat(permutate(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)),
            []
        )
}

const P = {

    parse: T => T.split(',').map(n => 1*n),

    op: o => ({
        o: o%100, 
        m: [o/100%10>1, o/1000%10>1]
    }),

    process: state => {
        const log = (msg, o) => {
            if (!DEBUG)
                return
            console.log((state.p-1)+' '+msg)
            if (o)
                console.log(o)
        }
        const c = state.c
        let op = P.op(c[state.p++])
        switch (op.o) {
            case 99: // HLT
                log('HLT')
                return false;
            case 1: // ADD
            {
                const pia = c[state.p++]
                const a = op.m[0] ? pia : c[pia]
                const pib = c[state.p++]
                const b = op.m[1] ? pib : c[pib]
                const val = a + b
                log('ADD '+a+' '+b+' '+val)
                c[c[state.p++]] = val
            } break;
            case 2: // MUL
            { 
                const pia = c[state.p++]
                const a = op.m[0] ? pia : c[pia]
                const pib = c[state.p++]
                const b = op.m[1] ? pib : c[pib]
                const val = a * b
                log('MUL '+a+' '+b+' '+val)
                c[c[state.p++]] = val
            } break;
            case 3: // RED
            {
                const val = state.inp.shift()
                log('RED ' + val)
                if (val===undefined)
                    return false
                c[c[state.p++]] = val
            } break;
            case 4: // WRT
            {
                const val = c[c[state.p++]]
                log('WRT ' + val)
                state.out.push(val)
            } break;
            case 5: // JPT
            { 
                const pia = c[state.p++]
                const a = op.m[0] ? pia : c[pia]
                const pib = c[state.p++]
                const b = op.m[1] ? pib : c[pib]
                log('JPT '+a+' '+b)
                if (a !== 0)
                    state.p = b
            } break;
            case 6: // JPF
            { 
                const pia = c[state.p++]
                const a = op.m[0] ? pia : c[pia]
                const pib = c[state.p++]
                const b = op.m[1] ? pib : c[pib]
                log('JPF '+a+' '+b)
                if (a === 0)
                    state.p = b
            } break;
            case 7: // LTH
            { 
                const pia = c[state.p++]
                const a = op.m[0] ? pia : c[pia]
                const pib = c[state.p++]
                const b = op.m[1] ? pib : c[pib]
                const val = a < b ? 1 : 0
                log('LTH '+a+' '+b)
                c[c[state.p++]] = val
            } break;
            case 8: // EQT
            { 
                const pia = c[state.p++]
                const a = op.m[0] ? pia : c[pia]
                const pib = c[state.p++]
                const b = op.m[1] ? pib : c[pib]
                const val = a === b ? 1 : 0
                log('EQT '+a+' '+b)
                c[c[state.p++]] = val
            } break;
            default:
                log('ERROR: ')
                console.log(op)
                console.log(state)
        }
        return true
    },

    run: (c,inp) => {
        P.state = {
            c: c,
            p: 0,
            inp: inp,
            out: []
        }
        while (P.process(P.state))
            ;
        return P.state.out
    },

    part_1: T => Math.max(...permutate('01234').map(s =>
            s.split('').reduce((a,b,c,d) =>
                P.run(P.parse(T).slice(),[b*1,a*1]).pop(), 0
            )
        )),

    part_2: T => 0/*TODO: permutate('56789').map(s =>
        s.split('').reduce((a,b,c,d) =>
            P.run(P.parse(T).slice(),[b*1,a*1,2,4,8,16,32,64,128,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]).pop(), 0
        )
    )*/

}

exports.puzzle = P
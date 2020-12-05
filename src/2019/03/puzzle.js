const _ = require('lodash')

const P = {

    F: 10000,

    prep: T => T.split('\n').map(L => L.split(',')),

    wire: (w, ci) => {
        let c = 0;
        w.forEach(m => {
            const d = m.charAt(0);
            const dist = parseInt(m.substr(1))
            _.range(0,dist).forEach(()=>{
                if (d==='R') c++;
                else if (d==='L') c--;
                else if (d==='U') c+=P.F;
                else if (d==='D') c-=P.F;
                ci.push(c);
            })
        })
        return ci
    },

    part_1: T => {
        const W = P.prep(T).map(w => P.wire(w,[]))
        const I = _.intersection(W[0], W[1])
        const D = I.map(c => Math.abs(c)%P.F + (~~(Math.abs(c)/P.F)))
        return _.min(D)
    },

    part_2: T => {
        const W = P.prep(T).map(w => P.wire(w,[]))
        const I = _.intersection(W[0], W[1])
        const L = I.map(i => W[0].indexOf(i) + W[1].indexOf(i))
        return _.min(L) + 2
    }

}

exports.puzzle = P
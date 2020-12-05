const _ = require('lodash')

const P = {

    F: 10000,

    prep: T => T.split('\n').map(L => L.split(',')).map(w => P.wire(w,[])),

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

    part_1: T => (W => Math.min(...
            _.intersection(W[0], W[1]).map(c => Math.abs(c)%P.F + (~~(Math.abs(c)/P.F)))
        ))(P.prep(T)),

    part_2: T => (W => Math.min(...
            _.intersection(W[0], W[1]).map(i => W[0].indexOf(i) + W[1].indexOf(i) + 2)
        ))(P.prep(T))

}

exports.puzzle = P
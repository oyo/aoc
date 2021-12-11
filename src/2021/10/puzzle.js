exports.puzzle = P = {

    prep: T => T.split('\n'),

    score1: {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
    },

    score: s => s.split('').reduce((o,c) => o * 5 + ' )]}>'.indexOf(c), 0),

    checkLine: l => {
        let s
        do {
            s = l.length
            l = l.replace(/\[\]/g,'').replace(/\(\)/g,'').replace(/\<\>/g,'').replace(/\{\}/g,'')
        } while (l.length < s)
        return l;
    },

    part_1: T => {
        const p = P.prep(T)
        const r = p.map(l => P.checkLine(l).replace(/[\(\[\<\{]/g, '')).filter(l => l.match(/[\)\]\>\}]/)).map(l => P.score1[l[0]]).reduce((a,b) => a+b)
        return r
    },

    part_2: T => {
        const p = P.prep(T)
        const r = p.map(l => P.checkLine(l)).filter(l => !l.match(/[\)\]\>\}]/))
        const s = r.map(l => {
            const a = '([{<'
            const b = ')]}>'
            let d = ''
            for (let c=0; c<l.length; c++) {
                d = b[a.indexOf(l[c])]+d
            }
            return d
        }).map(l => P.score(l)).sort((a,b) => a-b)[r.length>>1]
        return s
    }

}

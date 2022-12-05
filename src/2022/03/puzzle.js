exports.puzzle = P = {

    intersect: G => G.reduce((A, B) => [...new Set(A)].filter(C => new Set(B).has(C))).values().next().value,

    group: (T, S) => {
        const result = [], n = T.length
        let i = 0
        while (i < n) {
            result.push(T.slice(i, i+S))
            i += S
        }
        return result
    },

    prep1: T => T.trim().split('\n').map(L => [L.substring(0, L.length / 2), L.substring(L.length / 2)]),

    prep2: T => P.group(T.trim().split('\n'), 3),

    prio: A => (C => C > 95 ? C - 96 : C - 38)(A.charCodeAt(0)),

    prioSum: T => T.map(G => P.prio(P.intersect(G))).reduce((a, b) => a + b),

    part_1: T => P.prioSum(P.prep1(T)),

    part_2: T => P.prioSum(P.prep2(T)),

}

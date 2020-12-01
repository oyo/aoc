require('lodash.product');
const _ = require('lodash');

const puzzle = {

    // product: (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat()))),

    prepare: (input) => _.map(input.split('\n'), line => parseInt(line)),

    part_1: (input) => puzzle.functionalPart1(input),

    part_2: (input) => puzzle.functionalPart2(input),

    functionalPart1: (input) => {
        const p = puzzle.prepare(input) 
        return _.filter(_.product(p, p), (v) => _.sum(v) === 2020)[0].reduce( (a, b) => a * b )
    },

    functionalPart2: (input) => {
        const p = puzzle.prepare(input) 
        return _.filter(_.product(p, p, p), (v) => _.sum(v) === 2020)[0]
            .reduce( (a, b) => a * b )
    },

    classicalPart1: (input) => {
        const p = puzzle.prepare(input)
        let found = false;
        let a = 0;
        let b = 0;
        for (let i=0; i<p.length && !found; i++)
            for (let j=i+1; j<p.length && !found; j++)
                found = (a=p[j]) + (b=p[i]) === 2020
        return a * b
    },

    classicalPart2: (input) => {
        const p = puzzle.prepare(input)
        let found = false;
        let a = 0;
        let b = 0;
        let c = 0;
        for (let i=0; i<p.length && !found; i++)
            for (let j=i+1; j<p.length && !found; j++)
                for (let k=j+1; k<p.length && !found; k++)
                    found = (a=p[i]) + (b=p[j]) + (c=p[k]) === 2020
        return a * b * c
    }

}

exports.puzzle = puzzle
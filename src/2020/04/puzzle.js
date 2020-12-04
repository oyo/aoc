const _ = require('lodash')

const P = {

    prep: T => T.replaceAll('\n',' ').replaceAll('  ','|').split('|').map(L => L.split(' ')),

    format: L => {
        const o = {}
        L.map(C => {
            r = C.split(':')
            o[r[0]] = r[1]
        })
        o.byr *= 1
        o.iyr *= 1
        o.eyr *= 1
        if (o.hgt) {
            o.hgtv = o.hgt.substr(0,o.hgt.length-2)*1
            o.hgtu = o.hgt.substr(o.hgt.length-2)
            delete o.hgt
        }
        return o
    },

    valid: o => o.byr && o.iyr && o.eyr && o.hgtu && o.hgtv && o.hcl && o.ecl && o.pid 
        && _.inRange(o.byr, 1920, 2003)
        && _.inRange(o.iyr, 2010, 2021)
        && _.inRange(o.eyr, 2020, 2031)
        && (o.hgtu === 'cm' && _.inRange(o.hgtv, 150, 194) ||
            o.hgtu === 'in' && _.inRange(o.hgtv, 59, 77))
        && o.hcl.match(/^#[a-f0-9]{6}$/)
        && o.ecl.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/)
        && o.pid.match(/^[0-9]{9}$/),

    part_1: T => P.prep(T).map(
            L => _.uniq(L.map(C => C.split(':')[0])).filter(R => R !== 'cid')
        ).filter(L => L.length===7).length,

    part_2: T => P.prep(T).map(L => P.format(L)).filter(o => P.valid(o)).length

}

exports.puzzle = P
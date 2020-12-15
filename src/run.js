const fs = require('fs');

const pad = (num, size) => ('                    ' + num).substr(-size)
const codeColor = code => '\u001b[38;5;' + code + 'm'
const timeCode = ms =>
    (ms < 1 ? 10 :
        (ms < 10 ? 118 :
            (ms < 100 ? 11 :
                (ms < 1000 ? 208 :
                    (ms < 10000 ? 124: 9)))))
const tc = t => codeColor(timeCode(t)) + pad(t,6) + ' ms \x1b[0m';
const pc = p => '\x1b[2m' + pad(p, 18) + ' \x1b[0m';
    
[...Array(1).keys()].forEach(year => {
    const y = 2020 + year;
    let n = 0;
    let sum = 0;
    [...Array(25).keys()].forEach(day => {
        const d = String(day + 1).padStart(2, '0')
        const path = __dirname + '/' + y + '/' + d
        if (!fs.existsSync(path))
            return
        try {
            const { puzzle } = require(path + '/puzzle')
            const input = fs.readFileSync(path + '/input', 'utf-8').trim()
            //const hs1 = process.hrtime()
            //console.log(hs1[0] * 1000000 + hs1[1] / 1000)
            const s1 = Date.now()
            const p1 = puzzle.part_1(input)
            const t1 = Date.now() - s1
            const s2 = Date.now()
            const p2 = puzzle.part_2(input)
            const t2 = Date.now() - s2
            console.log(
                '\x1b[33m' + y + '-' + d + '\x1b[0m '
                + pc(p1) + tc(t1)
                + pc(p2) + tc(t2)
            )
            n += 2
            sum += t1 + t2
        } catch (e) {
            console.log(y + '-' + d + ' \x1b[41m' + e + '\x1b[0m')
        }
    })
    console.log([
        '',
        '# puzzles ' + n,
        'total ' + sum + ' ms',
        'avg   ' + (sum/n) + ' ms'
    ].join('\n'))
})
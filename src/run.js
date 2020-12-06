const fs = require('fs');

[...Array(6).keys()].forEach(year => {
    const y = 2015 + year;
    [...Array(7).keys()].forEach(day => {
        const d = String(day + 1).padStart(2, '0')
        const path = __dirname + '/' + y + '/' + d
        if (!fs.existsSync(path))
            return
        try {
            const { puzzle } = require(path + '/puzzle')
            const input = fs.readFileSync(path + '/input', 'utf-8').trim()
            const s1 = Date.now()
            const p1 = puzzle.part_1(input)
            const t1 = Date.now() - s1
            const s2 = Date.now()
            const p2 = puzzle.part_2(input)
            const t2 = Date.now() - s2
            console.log(y + '-' + d + ': ' + p1 + ' (' + t1 + ' ms), ' + p2 + ' (' + t2 + ' ms) ')
        } catch (e) {
            console.log(y + '-' + d + ': -')
        }
    })
})
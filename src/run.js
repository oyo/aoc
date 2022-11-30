const fs = require('fs');
const pad = (num, size) => (`                  ${num}`).substr(-size)
const codeColor = code => `\u001b[38;5;${code}m`
const timeCode = ms => [10, 118, 11, 208, 124, 9][`${ms}`.length]
const tc = t => `${codeColor(timeCode(t))}${pad(t, 6)} ms\x1b[0m`
const pc = p => ` \x1b[2m${pad(p, 18)}\x1b[0m`
const error = e => `\x1b[41m${e}\x1b[0m`
const rtime = (f, T) => {
    const s = process.hrtime()
    const p = f(T)
    const e = process.hrtime(s)
    const t = Math.round((e[0] * 1e9 + e[1]) / 1e6)
    return { o: `${pc(p)}${tc(t)}`, t: t }
}

[22].forEach(year => {
    const y = 2000 + year;
    let n = 0;
    let sum = 0;
    [...Array(25).keys()].forEach(day => {
        const d = String(day + 1).padStart(2, '0')
        const path = `${__dirname}/${y}/${d}`
        if (!fs.existsSync(path))
            return
        try {
            const { puzzle } = require(`${path}/puzzle`)
            const input = fs.readFileSync(`${path}/input`, 'utf-8').trim()
            const r1 = rtime(puzzle.part_1, input)
            const r2 = rtime(puzzle.part_2, input)
            console.log(`${y}-${d} ${r1.o}${r2.o}`)
            n += 2
            sum += r1.t + r2.t
        } catch (e) {
            console.log(`${y}-${d} ${error(e)}`)
        }
    })
    console.log(`
# puzzles ${n}
total ${sum} ms
avg   ${sum / n} ms`)
})
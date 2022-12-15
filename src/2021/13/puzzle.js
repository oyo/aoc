require('./letters')

exports.puzzle = P = {

    prep: T => {
        const p = T.split('\n\n')
        return {
            c: p[0].split('\n').map(l => l.split(',').map(v => v * 1)),
            f: p[1].split('\n').map(l => l.replace(/^fold along /, '').split('=').map(v => v === 'x' ? 0 : (v === 'y' ? 1 : v * 1)))
        }
    },

    fold: (d, f) => {
        for (c of d)
            if (c[f[0]] > f[1]) {
                c[f[0]] = f[1] - (c[f[0]] - f[1])
                if (d.filter(b => b[0] === c[0] && b[1] === c[1]).length > 1)
                    c[0] = -1
            }
        return d
    },

    part_1: T => {
        const p = P.prep(T)
        P.fold(p.c, p.f[0])
        const c = p.c.filter(c => c[0] >= 0)
        return c.length
    },

    // create a bitmap image and use OCR to get the code
    // add libraries, remove comment from part_2 + make it async
    // $ yarn add jimp tesseract.js
    createImage: p => {
        const max = [0, 1].map(i => p.map(c => c[i]).sort((a, b) => b - a).shift())
        const file = './resources/html/2021/13/code.png'
        const Jimp = require('jimp')
        const image = new Jimp(max[0] + 3, max[1] + 3, async (err, image) => {
            if (err) throw err;
            for (let y = 0; y < max[1] + 3; y++)
                for (let x = 0; x < max[0] + 3; x++)
                    image.setPixelColor(0xFFFFFFFF, x, y)
            for (c of p)
                image.setPixelColor(0x000000FF, c[0] + 1, c[1] + 1)
            image.scale(4)
            await image.write(file, (err) => {
                if (err) throw err;
            });
        })
        return file
    },

    recognize: async file => (await require('tesseract.js').recognize(file, 'eng')).data.text.trim(),

    populate: p => {
        const max = [0, 1].map(i => p.map(c => c[i]).sort((a, b) => b - a).shift())
        const b = new Array(max[1] + 1).fill().map((_, y) =>
            new Array(max[0] + 1).fill().map((_, x) => ' '))
        for (c of p)
            b[c[1]][c[0]] = '#'
        return b
    },

    toString: b => b.reduce((o, y) => o + y.reduce((o, x) => o + ' ' + x, '') + '\n', ''),

    parse: d => (c => new Array((c[c.length - 1][0] + 2) / 5).fill().reduce((s, _, i) =>
        s + String.fromCharCode(65 + C.binary.indexOf(
            d.filter(p => p[0] >= i * 5 && p[0] < i * 5 + 5)
                .reduce((n, c) => n | (1 << (((5-c[1]) << 2) + (3 - (c[0] - i * 5)))), 0))), ''))(
                    d.sort((a, b) => a[0] - b[0] !== 0 ? a[0] - b[0] : a[1] - b[1])
                ),

    /*
    // only used when letters don't use same size or spacing
    detect: d => {
        const s = d.map(c => c[0]).sort((a, b) => a - b)
        const max = s[s.length - 1]
        console.log(max)
        const f = s.reduce((o, c) => { o[c] = '#'; return o }, new Array(max).fill(' ')).join('')
        console.log(f)
        const l = f.split(/\s+/).map(w => w.length)
        const r = /(^|\s)#/g
        const b = []
        let n
        while (n = r.exec(f))
            b.push(n.index)
        const w = b.map((c, i) => [c, l[i]])
        return w
    },
    */

    part_2: T => {
        const p = P.prep(T)
        for (f of p.f)
            P.fold(p.c, f)
        const d = p.c.filter(c => c[0] >= 0)

        // three ways to get the code
        // 1. dump coordinates as ASCII image and read from screen
        // return P.toString(P.populate(d))

        // 2. parse the coordinates to letters
        console.log(d)
        return P.parse(d)

        // 3. detect code using ocr image recognition (slow)
        // return await P.recognize(P.createImage(s))
    }

}

const _ = require('lodash')

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

    part_2: async T => {
        const p = P.prep(T)
        for (f of p.f)
            P.fold(p.c, f)
        return await P.recognize(P.createImage(p.c.filter(c => c[0] >= 0)))
    }

}

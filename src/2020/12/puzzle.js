const _ = require('lodash')

const P = {

    prep: T => T.split('\n').map(L => [L.charAt(0), L.substr(1)*1]).map(L => L[0]==='L' ? ['R', 360-L[1]] : L),

    start: {
        x: 0,
        y: 0,
        a: 90
    },

    startWP: {
        x: 0,
        y: 0,
        dx: 10,
        dy: 1
    },

    part_1: T => (pos => Math.abs(pos.x) + Math.abs(pos.y))(
        P.prep(T).reduce((a,m) => {
            const v = m[1]
            switch (m[0]) {
                case 'N': a.y += v; break
                case 'S': a.y -= v; break
                case 'E': a.x += v; break
                case 'W': a.x -= v; break
                case 'R': a.a = (a.a+v) % 360; break
                case 'F':
                    const w = (90-a.a)*(Math.PI/180)
                    a.x += Math.round(v * Math.cos(w))
                    a.y += Math.round(v * Math.sin(w))
            }
            return a
        }, P.start)),

    part_2: T => (pos => Math.abs(pos.x) + Math.abs(pos.y))(
        P.prep(T).reduce((a,m) => {
            const v = m[1]
            switch (m[0]) {
                case 'N': a.dy += v; break
                case 'S': a.dy -= v; break
                case 'E': a.dx += v; break
                case 'W': a.dx -= v; break
                case 'R': {
                    let dx = 0
                    let dy = 0
                    switch(v) {
                        case 90:
                            dx = a.dy
                            dy = -a.dx
                            break;
                        case 180:
                            dx = -a.dx
                            dy = -a.dy
                            break;
                        case 270:
                            dx = -a.dy
                            dy = a.dx
                            break;
                    }
                    a.dx = dx
                    a.dy = dy
                    break
                }
                case 'F':
                    a.x += v * a.dx;
                    a.y += v * a.dy;
            }
            return a
        }, P.startWP))

}

exports.puzzle = P
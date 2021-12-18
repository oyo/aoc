exports.puzzle = P = {

    prep1: T => (a => -Math.min(a[6] * 1, a[8] * 1))(T.split(/([^\d]+=|\.\.)/)),

    prep2: T => (a => [a[2] * 1, a[4] * 1, a[6] * 1, a[8] * 1])(T.split(/([^\d]+=|\.\.)/)),

    xhits: p => {
        let vx = 1
        for (; ((vx * (vx + 1)) >> 1) < p[0]; vx++)
            ;
        const xa = []
        for (; vx + (vx - 1) <= p[1]; vx++)
            for (let sx = vx, dx = vx, s = 0; dx > 0 && sx <= p[1]; sx += --dx, s++)
                if (sx >= p[0] && sx <= p[1])
                    xa.push([vx, s, sx])
        return xa
    },

    yhits: (p, xh) => {
        const xvlist = xh.map(h => h[0]).filter((v, i, a) => a.indexOf(v) === i)
        let pairs = []
        for (let xvs of xvlist) {
            for (let yvs = p[2]; yvs <= -p[2]; yvs++) {
                for (
                    let xv = xvs, yv = yvs, x = 0, y = 0, nohit = true;
                    y > p[2] && nohit;) {
                    x += xv
                    y += yv
                    xv = xv > 0 ? xv - 1 : 0
                    yv--
                    if (x >= p[0] && x <= p[1] && y >= p[2] && y <= p[3]) {
                        nohit = false
                        pairs.push([xvs, yvs])
                    }
                }
            }
        }
        return pairs
    },

    part_1: T => (n => (n * (n - 1) >> 1))(P.prep1(T)),

    part_2: T => (p => P.yhits(p, P.xhits(p)).length + (p[1] - p[0] + 1) * (p[3] - p[2] + 1))(P.prep2(T))

}

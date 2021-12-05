async function modelRunner(input) {
    function work({ data }) {
        console.log('INPUT='+data)
        const P = {

            prep: T => T.split('\n'),

            prepEmpty: d => new Array(d + 2).fill(true).map(z => new Array(d + 2).fill(true).map(y => new Array(d + 2).fill('.'))),

            populate: (dim, p) => {
                const board = P.prepEmpty(dim)
                const z0 = (dim >> 1) + 1
                const o = z0 - (p.length >> 1)
                for (let y = 0; y < p.length; y++) {
                    for (let x = 0; x < p.length; x++) {
                        board[z0][o + y][o + x] = p[y][x]
                    }
                }
                return board
            },

            clone: board => board.slice().map(y => y.slice().map(x => x.slice())),

            count: () => P.board[0].reduce((a, y) => a + y.reduce((b, x) => b + x.filter(c => c === '#').length, 0), 0),

            adjacentCount: (p, z, y, x) =>
                (p[z - 1][y - 1][x - 1] === '#' ? 1 : 0) +
                (p[z - 1][y - 1][x] === '#' ? 1 : 0) +
                (p[z - 1][y - 1][x + 1] === '#' ? 1 : 0) +
                (p[z - 1][y][x - 1] === '#' ? 1 : 0) +
                (p[z - 1][y][x] === '#' ? 1 : 0) +
                (p[z - 1][y][x + 1] === '#' ? 1 : 0) +
                (p[z - 1][y + 1][x - 1] === '#' ? 1 : 0) +
                (p[z - 1][y + 1][x] === '#' ? 1 : 0) +
                (p[z - 1][y + 1][x + 1] === '#' ? 1 : 0) +
                (p[z][y - 1][x - 1] === '#' ? 1 : 0) +
                (p[z][y - 1][x] === '#' ? 1 : 0) +
                (p[z][y - 1][x + 1] === '#' ? 1 : 0) +
                (p[z][y][x - 1] === '#' ? 1 : 0) +

                (p[z][y][x + 1] === '#' ? 1 : 0) +
                (p[z][y + 1][x - 1] === '#' ? 1 : 0) +
                (p[z][y + 1][x] === '#' ? 1 : 0) +
                (p[z][y + 1][x + 1] === '#' ? 1 : 0) +
                (p[z + 1][y - 1][x - 1] === '#' ? 1 : 0) +
                (p[z + 1][y - 1][x] === '#' ? 1 : 0) +
                (p[z + 1][y - 1][x + 1] === '#' ? 1 : 0) +
                (p[z + 1][y][x - 1] === '#' ? 1 : 0) +
                (p[z + 1][y][x] === '#' ? 1 : 0) +
                (p[z + 1][y][x + 1] === '#' ? 1 : 0) +
                (p[z + 1][y + 1][x - 1] === '#' ? 1 : 0) +
                (p[z + 1][y + 1][x] === '#' ? 1 : 0) +
                (p[z + 1][y + 1][x + 1] === '#' ? 1 : 0),

            update: (counter, transposer) => {
                P.board.push(P.board.shift())
                const p = P.board[0]
                const p1 = P.board[1]
                for (let z = 1; z < P.D.z - 1; z++)
                    for (let y = 1; y < P.D.y - 1; y++)
                        for (let x = 1; x < P.D.x - 1; x++)
                            p[z][y][x] = transposer(p1[z][y][x], counter(p1, z, y, x))
                return P
            },

            step: () => P.update(P.adjacentCount, (s, c) =>
                s === '#' && (c < 2 || c > 3)
                    ? '.'
                    : (
                        c === 3
                            ? '#'
                            : s
                    )
            ),

            getData: () => P.board[0],

            init: data => {
                const p = P.prep(data.shape)
                const board = P.populate(data.dim, p)
                P.D = {
                    z: board.length - 2,
                    y: board[0].length - 2,
                    x: board[0][0].length - 2
                }
                P.board = [P.clone(board), P.clone(board)]
                return P
            }

        }

        P.init(data)

        console.log('init count '+P.count())
        console.log('steps '+data)
        let i = 0
        self.postMessage({board:P.board[0], count:P.count()});
        while (i++<10) {
            console.log('step '+i)
            P.step()
            console.log('count '+P.count())
            self.postMessage({board:P.board[0], count:P.count()});
        }
        return self.postMessage({board:P.board[0], count:P.count()});
    }

    let b = new Blob(["onmessage =" + work.toString()], { type: "text/javascript" });
    let worker = new Worker(URL.createObjectURL(b));
    worker.postMessage(input);
    return await new Promise(resolve => worker.onmessage = e => {
        console.log('OUTPUT='+JSON.stringify(e.data))
        return resolve(e.data)
    });
}

(async () => console.log(JSON.stringify(out=await modelRunner({dim:10,shape:
`.#.
..#
###`}))))()

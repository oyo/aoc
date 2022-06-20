const intersection = (setA, setB) =>
    new Set([...setA].filter(a => setB.has(a)));
const union = (setA, setB) => new Set([...setA, ...setB]);

function* rotate3d(v) {
    const roll = ([x, y, z]) => [x, z, -y];
    const turn = ([x, y, z]) => [-y, x, z];
    for (let cycle = 0; cycle < 2; cycle++) {
        for (let step = 0; step < 3; step++) {
            v = roll(v);
            yield v;
            for (let i = 0; i < 3; i++) {
                v = turn(v);
                yield v;
            }
        }
        v = roll(turn(roll(v)));
    }
}

const reduce = input => {
    input = input.split("\n\n").map(group =>
        group
            .split("\n")
            .slice(1)
            .map(row => row.split(",").map(Number))
    );

    const scanners = input.map((beacons, i) => ({
        id: i,
        beacons,
        pos: [0, 0, 0],
        dist: new Set(
            beacons.flatMap(v1 =>
                beacons
                    .map(v2 =>
                        v2
                            .map((v, c) => Math.abs(v - v1[c]) ** 2)
                            .reduce((sum, v) => sum + v)
                    )
                    .filter(Boolean)
            )
        ),
    }));

    const scannerCandidates = scanners
        .map((_, i) => scanners.map((_, j) => [i, j]))
        .flat()
        .filter(([a, b]) => a !== b)
        .filter(
            ([a, b]) =>
                intersection(scanners[a].dist, scanners[b].dist).size >= (11 * 12) / 2
        );

    let totalBeacons = new Set(scanners[0].beacons.map(v => v.join()));
    const mergedScanners = new Set([0]);
    while (mergedScanners.size !== scanners.length) {
        const [known, next] = scannerCandidates
            .find(([a, b]) => mergedScanners.has(a) && !mergedScanners.has(b))
            .map(v => scanners[v]);

        const transformed = next.beacons
            .map(v => [...rotate3d(v)])
            .reduce(
                (transposed, row) =>
                    row.map((_, i) => [...(transposed[i] || []), row[i]]),
                []
            )
            .map(beacon =>
                known.beacons.map(a =>
                    beacon.map(b => {
                        const translation = b.map((c, i) => c - a[i]);
                        return [
                            beacon.map(t => t.map((c, i) => c - translation[i])),
                            translation,
                        ];
                    })
                )
            )
            .flat(2);
        const knownBeaconSet = new Set(known.beacons.map(v => v.join()));
        const matchingTransform = transformed.find(
            ([tr]) =>
                intersection(new Set(tr.map(v => v.join())), knownBeaconSet).size >= 12
        );
        if (matchingTransform) {
            [next.beacons, next.pos] = matchingTransform;
            totalBeacons = union(
                totalBeacons,
                new Set(next.beacons.map(v => v.join()))
            );
            mergedScanners.add(next.id);
        }
    }

    return {
        beacons: totalBeacons,
        scanners: scanners.map(({ pos }) => pos),
    };
};

exports.puzzle = P = {

    part_1: input => reduce(input).beacons.size,

    part_2: input =>
        reduce(input)
            .scanners.flatMap((a, i, scanners) =>
                scanners
                    .slice(i)
                    .map(b =>
                        b.map((c, i) => Math.abs(c - a[i])).reduce((sum, v) => sum + v)
                    )
            )
            .reduce((max, v) => Math.max(max, v))

}

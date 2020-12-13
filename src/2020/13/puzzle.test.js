const { puzzle } = require('./puzzle')

const INPUT = [
    [ '939\n7,13,x,x,59,x,31,19', 1068781 ],
    [ '0\n7,13', 77 ],
    [ '0\n17,x,13,19', 3417 ],
    [ '0\n67,7,59,61', 754018 ],
    [ '0\n67,x,7,59,61', 779210 ],
    [ '0\n67,7,x,59,61', 1261476 ],
    [ '0\n1789,37,47,1889', 1202161486 ]
]

it ('solves part_1', () => {
    expect(puzzle.part_1(INPUT[0][0])).toEqual(295)
})

it ('solves part_2', () => {
    INPUT.forEach(io =>
        expect(puzzle.part_2(io[0])).toEqual(io[1])
    )
})

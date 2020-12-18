const { puzzle } = require('./puzzle')

const INPUT = {
    '1+(2*3)+(4*(5+6))': 51,
    '2*3+(4*5)': 26,
    '5+(8*3+9+3*4*3)': 437,
    '5*9*(7*3*3+9*3+(8+6*4))': 12240,
    '((2+4*9)*(6+9*8+6)+6)+2+4*2': 13632
}

const INPUT_2 = {
    '1+(2*3)+(4*(5+6))': 51,
    '2*3+(4*5)': 46,
    '5+(8*3+9+3*4*3)': 1445,
    '5*9*(7*3*3+9*3+(8+6*4))': 669060,
    '((2+4*9)*(6+9*8+6)+6)+2+4*2': 23340
}

it ('solves part_1', () => {
    Object.keys(INPUT).forEach(e =>
        expect(puzzle.eval(e)).toEqual(INPUT[e])
    )
})

it ('solves part_2', () => {
    Object.keys(INPUT_2).forEach(e =>
        expect(puzzle.eval2(e)).toEqual(INPUT_2[e])
    )
})

const { puzzle } = require('./puzzle')

const INPUT = [
    'mxmxvkd kfcds sqjhc nhms (contains dairy, fish)',
    'trh fvjkl sbzzf mxmxvkd (contains dairy)',
    'sqjhc fvjkl (contains soy)',
    'sqjhc mxmxvkd sbzzf (contains fish)'
].join('\n')

it ('solves part_1', () => {
    expect(puzzle.part_1(INPUT)).toEqual(5)
})

it ('solves part_2', () => {
    expect(puzzle.part_2(INPUT)).toEqual('mxmxvkd,sqjhc,fvjkl')
})

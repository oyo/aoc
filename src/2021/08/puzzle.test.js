const { puzzle } = require('./puzzle')

const INPUT =
    `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`

const INPUT_1 = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`
const MAPPING = ['d', 'e', 'a', 'f', 'g', 'b', 'c']

it('solves 1', () => expect(P.part_1(INPUT)).toEqual(26))

it('finds segments', () => expect(P.findSegmentMapping(P.prep(INPUT_1)[0][0])).toEqual(MAPPING))

it('finds digit', () => expect(P.findDigit(P.prep(INPUT_1)[0][0][1], MAPPING)).toEqual(5))

it('finds digits', () => expect(P.findDigits(P.prep(INPUT_1)[0][0], MAPPING)).toEqual([8, 5, 2, 3, 7, 9, 6, 4, 0, 1]))

it('finds code', () => expect(P.findCode(P.prep(INPUT_1)[0])).toEqual(5353))

it('finds codes', () => expect(P.part_2(INPUT_1)).toEqual(5353))

it('solves 2', () => expect(P.part_2(INPUT)).toEqual(61229))

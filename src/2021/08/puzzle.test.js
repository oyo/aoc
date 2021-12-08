const { puzzle } = require('./puzzle')

const LINE = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`
const MAPPING = ['d', 'e', 'a', 'f', 'g', 'b', 'c']
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

it('solves 1', () => expect(P.part_1(INPUT)).toEqual(26))
it('finds mappings', () => expect(P.findSegmentMapping(P.prep(LINE)[0][0])).toEqual(MAPPING))
it('finds digit', () => expect(P.findDigit(P.prep(LINE)[0][0][1], MAPPING)).toEqual(5))
it('finds code', () => expect(P.findCode(P.prep(LINE)[0])).toEqual(5353))
it('solves 2', () => expect(P.part_2(LINE)).toEqual(5353))
it('solves 2', () => expect(P.part_2(INPUT)).toEqual(61229))

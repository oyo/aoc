require('./puzzle')

const INPUT = `16,1,2,0,4,2,7,1,2,14`

it('solves 1', () => expect(P.part_1(INPUT)).toEqual(37))

it('solves 2', () => expect(P.part_2(INPUT)).toEqual(168))

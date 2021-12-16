const Packet = require('./Packet')

const LITERAL = `D2FE28`
const OPERATOR_0 = `38006F45291200`
const OPERATOR_1 = `EE00D40C823060`

const VERSIONS = {
    '8A004A801A8002F478': 16,
    '620080001611562C8802118E34': 12,
    'C0015000016115A2E0802F182340': 23,
    'A0016C880162017C3686B18A3D4780': 31
}

const OPS = {
    'C200B40A82': 3n,
    '04005AC33890': 54n,
    '880086C3E88112': 7n,
    'CE00C43D881120': 9n,
    'D8005AC2A8F0': 1n,
    'F600BC2D8F': 0n,
    '9C005AC2F8F0': 0n,
    '9C0141080250320F1802104A08': 1n
}

it('parses literals', () => {
    const li = new Packet(LITERAL)
    expect(li.version).toEqual(6)
    expect(li.typeid).toEqual(4)
    expect(li.value).toEqual(2021n)
})

it('parses operator 0', () => {
    const op = new Packet(OPERATOR_0)
    expect(op.version).toEqual(1)
    expect(op.typeid).toEqual(6)
    expect(op.children.length).toEqual(2)
})

it('parses operator 1', () => {
    const op = new Packet(OPERATOR_1)
    expect(op.version).toEqual(7)
    expect(op.typeid).toEqual(3)
    expect(op.children.length).toEqual(3)
})

it('calculates version sums', () => Object.entries(VERSIONS).forEach(p =>
    expect(new Packet(p[0]).calcVersionSum()).toEqual(p[1]))
)

it('calculates operations', () => Object.entries(OPS).forEach(p =>
    expect(new Packet(p[0]).calcOperation()).toEqual(p[1]))
)

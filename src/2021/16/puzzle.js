const Packet = require('./Packet')

exports.puzzle = P = {

    part_1: T => new Packet(T.trim()).calcVersionSum(),

    part_2: T => new Packet(T.trim()).calcOperation()

}

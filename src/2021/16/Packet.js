Object.assign(String.prototype, {
    splitAt(n) {
        return [this.slice(0, n), this.slice(n)]
    }
})

class Packet {

    constructor(hex, pointer) {
        this.hex = hex
        this.data = BigInt('0x'+hex)
        this.length = BigInt(hex.length << 2)
        this.pointer = pointer ? BigInt(pointer) : 0n
        this.children = []
        this.readVersionType()
        this.readValue()
    }

    readVersionType() {
        this.version = Number(this.nextToken(3))
        this.typeid = Number(this.nextToken(3))
    }

    readValue() {
        if (this.typeid === 4)
            return this.readLiteral()
        else
            return this.readOperator()
    }

    readLiteral() {
        let token
        let value = 0n
        let i = 0n
        do {
            token = this.nextToken(5)
            value = (value << 4n) | (token & 0b1111n)
            i++
        } while (token > 0b1111n && i<10)
        this.value = value
    }

    readOperator() {
        if (this.nextToken(1)) {
            const npkgs = this.nextToken(11)
            for (let p = 0; p < npkgs; p++) {
                this.readSub()
            }
        } else {
            const nbits = this.nextToken(15)
            const target = this.pointer + nbits
            for (let p = this.pointer; this.pointer < target;) {
                this.readSub()
            }
        }
    }

    readSub() {
        const child = new Packet(this.hex, this.pointer)
        this.pointer = child.pointer
        this.children.push(child)
    }

    pad(s, l) {
        return (new Array(Number(l)).fill(0).join('') + s).slice(-Number(l))
    }

    toBinary(b, l) {
        return `${this.pad(b.toString(2), l)}`
    }

    toStringDebug() {
        return `${this.length}->${this.pointer}: ${this.toBinary(this.data, this.length).splitAt(Number(this.pointer)).join('.')} ${this.children}`
    }

    toString() {
        return this.typeid === 4
            ? `LI ${this.value} v${this.version}`
            : `OP ${this.typeid} v${this.version} [ ${this.children} ]`
    }

    calcVersionSum() {
        return this.version + this.children.reduce((o, a) => o + a.calcVersionSum(), 0)
    }

    calcOperation() {
        const c = this.children
        switch (this.typeid) {
            case 0: return c.reduce((o, a) => o + a.calcOperation(), 0n)
            case 1: return c.reduce((o, a) => o * a.calcOperation(), 1n)
            case 2: return BigInt(Math.min(...c.map(c => Number(c.calcOperation()))))
            case 3: return BigInt(Math.max(...c.map(c => Number(c.calcOperation()))))
            case 4: return this.value
            case 5: return c[0].calcOperation() > c[1].calcOperation() ? 1n : 0n
            case 6: return c[0].calcOperation() < c[1].calcOperation() ? 1n : 0n
            case 7: return c[0].calcOperation() === c[1].calcOperation() ? 1n : 0n
        }
        return 0n
    }

    nextToken(b) {
        const data = this.data
        const bits = BigInt(b)
        const mask = (1n << bits) - 1n
        const right = this.length - this.pointer - bits
        const token = (data >> right) & mask
        this.pointer += bits
        return token
    }

}

module.exports = Packet
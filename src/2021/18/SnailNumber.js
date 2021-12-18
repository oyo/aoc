String.prototype.hashCode = function () {
    let hash
    if (this.length === 0) return 0
    for (let i = 0; i < this.length; i++) {
        const chr = this.charCodeAt(i)
        hash = ((hash << 5) - hash) + chr
        hash |= 0
    }
    return hash
}

class SnailNumber {

    constructor(value) {
        this.value = typeof value === 'string' ? JSON.parse(value) : value
    }

    static addNumbers(l) {
        const s = new SnailNumber(l.shift())
        return l.reduce((s, n) => s.add(n), s)
    }

    add(n) {
        this.value = [this.value, n]
        this.value = this.reduce()
        return this
    }

    reduce() {
        let before = JSON.stringify(this.value)
        let v = before
        do {
            before = v
            v = v.split('')
            v = this.explode(v)
            v = this.split(v)
            v = JSON.stringify(JSON.parse(v.join('')))
        } while (before.hashCode() !== v.hashCode())
        return JSON.parse(v)
    }

    explode(v) {
        v = v.map((t, i) => {
            if (t.match(/\d/) && v[i + 1].match(/\d/)) {
                t = (t * 10) + v[i + 1] * 1
                v[i + 1] = ''
            }
            return t
        }).filter(t => t !== '')
        let depth = 0
        let prev
        let carry
        for (let i = 0; i < v.length; i++) {
            const c = v[i]
            switch (c) {
                case '[':
                    if (++depth > 4) {
                        const a = v[i + 1] * 1 + (carry ? carry : 0)
                        const b = v[i + 3] * 1
                        carry = b
                        if (prev)
                            v[prev] += a
                        prev = i
                        v[i++] = 0
                        v[i++] = ''
                        v[i++] = ''
                        v[i++] = ''
                        v[i] = ''
                        --depth
                    }
                    break;
                case ']':
                    --depth;
                    break;
                case ',':
                    break;
                default:
                    v[i] = c * 1 + (carry ? carry : 0)
                    carry = false
                    prev = i
            }
        }
        return v
    }

    split(v) {
        for (let i = 0; i < v.length; i++) {
            if (v[i] > 9) {
                const f = Math.floor(v[i] / 2)
                const c = Math.ceil(v[i] / 2)
                v.splice(i, 1, '[', f, ',', c, ']')
                i += ['[', f, ',', c, ']'].join('').length
                break
            }
        }
        return v
    }

    magnitude() {
        let s = JSON.stringify(this.value)
        let r
        for (let l0 = 0; l0 !== s.length;) {
            l0 = s.length
            const matches = s.matchAll(/\[\d+,\d+]/g)
            for (let match of matches) {
                const p = JSON.parse(match)
                r = 3 * p[0] + 2 * p[1]
                s = s.replace(match, r)
            }
        }
        return r
    }

}

module.exports = SnailNumber

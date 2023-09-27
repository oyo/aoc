exports.puzzle = {

    part_1: T => T.split('').reduce((a, c) => a + (c === '(' ? 1 : -1), 0),

    part_2: T => T.split('').reduce((a, c, i) => {
        if (a[0] && (a[1] += c === '(' ? 1 : -1) === -1) {
            a[2] = i + 1
            a[0] = false
        }
        return a
    }, [true, 0, 0])[2]

}

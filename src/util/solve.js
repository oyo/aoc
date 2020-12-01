#!/usr/bin/node
const util = require('./util')
const date = util.getAoCDate(process.argv[3], process.argv[4])
const path = util.getDailyPath(date)
const submit = process.argv[2] ? parseInt(process.argv[2]) : 0
if (isNaN(submit)) {
    console.log(
        'AOC NODEJS TOOL\n' +
        '\n' +
        'Download AoC input and create a skeleton for puzzle code plus optionally submit the result\n' +
        '\n' +
        'Format:\n' +
        '   yarn solve [<submit>] [<day>] [<year>]\n' +
        '\n' +
        'where\n' +
        '   submit = (none) | 1 | 2 | help\n' +
        '   day    = (none) | {1-25}\n' +
        '   year   = (none) | {2015-x}\n' +
        '\n' +
        'Environment variable with session cookie from browser login must be set!\n' +
        '   export AOC_COOKIE=\'session=a1b2...x8y9;\'' +
        '\n' +
        'Examples\n' +
        '   yarn solve help       -> show this message\n' +
        '   yarn solve            -> download and setup today\'s puzzle\n' +
        '   yarn solve 1          -> solve today\'s puzzle and submit part 1\n' +
        '   yarn solve 0 4        -> solve puzzle from day 4 of current year without submit\n' +
        '   yarn solve 2 25 2015  -> solve puzzle from day 25 of 2015 and submit part 2\n'
    )
} else {
    (async () => {
        await util.copyStarter(date.day, date.year)
        await util.getInput(date.day, date.year)
        const { puzzle } = require(path + '/puzzle')
        console.log('part 1')
        console.log(await util.solve(path, puzzle.part_1, submit===1 ? 1 : 0))
        console.log('part 2')
        console.log(await util.solve(path, puzzle.part_2, submit===2 ? 2 : 0))
    })()
}

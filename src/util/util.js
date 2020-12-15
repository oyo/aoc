const fs = require('fs')
const fetch = require('node-fetch')
const HttpsProxyAgent = require('https-proxy-agent')
const _ = require('lodash')

const AOC_BASE = 'https://adventofcode.com/[YEAR]/day/[DAY]'
const COOKIE = process.env.AOC_COOKIE

const streamToString = (stream) => {
    const chunks = []
    return new Promise((resolve, reject) => {
        stream.on('data', chunk => chunks.push(chunk))
        stream.on('error', reject)
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    })
}

const util = {

    getAoCDate: (day, year) => {
        const today = new Date();
        return {
            year: parseInt(year) || today.getFullYear(),
            day: parseInt(day) || today.getDate()
        }
    }, 

    getAoCDateFromPath: (path) => {
        const tokens = path.split('/')
        return util.getAoCDate(tokens.pop(),tokens.pop())
    }, 

    getDailyURL: (aocdate) => {
        return AOC_BASE.replace('[YEAR]', aocdate.year).replace('[DAY]', aocdate.day)
    }, 

    getDailyPath: (aocdate) => {
        return __dirname + '/../' + aocdate.year + '/'
            + (aocdate.day < 10 ? '0'+aocdate.day : aocdate.day)
    },

    downloadInput: async (aocdate) => {
        try {
            const url = util.getDailyURL(aocdate) + '/input'
            const options = {
                agent: process.env.https_proxy ? new HttpsProxyAgent(process.env.https_proxy) : undefined,
                headers: {
                    cookie: COOKIE
                }
            }
            const response = await fetch(url, options)
            const input = await response.text()
            return input
        } catch (e) {
            return 'ERROR: ' + e
        }
    },

    submitAnswer: async (output, level, aocdate) => {
        try {
            const url = util.getDailyURL(aocdate) + '/answer'
            const body = 'level=' + level + '&answer=' + output
            const options = {
                method: 'POST',
                body: body,
                agent: process.env.https_proxy ? new HttpsProxyAgent(process.env.https_proxy) : undefined,
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'cookie': COOKIE
                }
            }
            const response = await fetch(url, options)
            const result = await response.text()
            return result
        } catch (e) {
            return 'ERROR: ' + e
        }
    },

    copyStarter: async (day, year) => {
        const aocdate = util.getAoCDate(day, year)
        const path = util.getDailyPath(aocdate)
        const filename = path + '/puzzle.js'
        if (fs.existsSync(filename)) {
            return
        }
        await fs.promises.mkdir(path, { recursive: true })
        await fs.copyFile(__dirname + '/puzzle.js_', path + '/puzzle.js', (err) => { if (err) console.log(err) })
        await fs.copyFile(__dirname + '/puzzle.test.js_', path + '/puzzle.test.js', (err) => { if (err) console.log(err) })
    },

    getInput: async (day, year) => {
        const aocdate = util.getAoCDate(day, year)
        const path = util.getDailyPath(aocdate)
        const filename = path + '/input'
        try {
            fs.existsSync(filename)
            return await util.getString(fs.createReadStream(filename))
        } catch (err) {
            const data = await util.downloadInput(aocdate)
            await fs.promises.mkdir(path, { recursive: true })
            fs.writeFile(filename, data, 'utf8', (err) => { if (err) console.log(err) })
            return data
        }
    },

    solve: async function(path, partFunction, submitPart) {
        try {
            const date = util.getAoCDateFromPath(path)
            const input = await util.getInput(date.day, date.year)
            const output = partFunction(input.trim())
            if (submitPart) {
                const result = await util.submitAnswer(output, submitPart, date)
                const message = _.filter(result.split('\n'), line => line.match(/^<article>/))
                console.log(message.join().replace(/<\/?[^>]+(>|$)/g, ''))
            }
            return output
        } catch (e) {
            return 'ERROR: ' + e
        }
    },

    getString: async (stream) => {
        const string = await streamToString(stream ? stream : process.stdin)
        return string.trim()
    },

    toLines: (input) => {
        return input.split('\n')
    }

}

module.exports = util

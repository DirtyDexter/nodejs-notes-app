//const validator = require('validator')
//const chalk = require('chalk')
const yargs = require('yargs')

//const fs = require('fs')
const notes = require('./notes')


// fs.writeFileSync('test.txt', 'This file has been written by code.')
// fs.appendFileSync('test.txt', '\nNew text has been appended now')

// const dataBuffer = fs.readFileSync('test.txt')
// console.log(dataBuffer.toString())
 
// console.log(validator.isEmail('rk.com@jifflenow.net'))

// console.log(chalk.white.italic.underline.inverse.bgRed('Success!!'))

// console.log(process.argv)

// customize version
yargs.version('1.1.0')

yargs.command({
    command:'add',
    describe: 'Add a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command:'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command:'list',
    describe: 'List all notes',
    handler (argv) {
        notes.listNotes()
    }
})

yargs.command({
    command:'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        notes.readNote(argv.title)
    }
})

//console.log(yargs.argv)
yargs.parse() // necessary to call yargs.argv or yargs.parse() so that it will parse yargs customization


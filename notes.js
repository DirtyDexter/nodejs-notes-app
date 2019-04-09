const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = findNoteWithGivenTitle(notes, title)
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(JSON.stringify(notes))
        console.log(chalk.green.inverse('Note saved'))
    } else {
        console.log(chalk.red.inverse('Sorry!! title taken'))
    }
}

const removeNote = title => {
    const notes = loadNotes()
    const index = getMatchedNoteIndex(notes, title)
    if (index != -1) {
        notes.splice(index, 1)
        saveNotes(JSON.stringify(notes))
        console.log(chalk.bgGreen('Note removed'))
    } else {
        console.log(chalk.bgRed('Note does not exit'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    if (notes.length !== 0) {
        console.log(chalk.green('Your notes are following'))
        notes.forEach(note => console.log(chalk.blue(note.title)))
    } else {
        console.log(chalk.red('No note found!!'))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const matchedNote = findNoteWithGivenTitle(notes, title)
    if (matchedNote) {
        console.log(chalk.green(matchedNote.title))
        console.log(matchedNote.body)
    } else {
        console.log(chalk.red.inverse('Sorry !! Note not found'))
    }
}

const loadNotes = () => {
    try {
        const dataBuffer =  fs.readFileSync('notes.json')
        const noteJSON = dataBuffer.toString()
        return JSON.parse(noteJSON)
    } catch (e) {
        return []
    }
}

const findNoteWithGivenTitle = (notes, title) => notes.find(note => note.title === title)

const getMatchedNoteIndex = (notes, title) => {
    let index = -1
    for (let i = 0; i< notes.length; i++) {
        if (notes[i].title === title) {
            index = i
            break
        }
    }
    return index
}

const saveNotes = notes => fs.writeFileSync('notes.json', notes)


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
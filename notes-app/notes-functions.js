//Read existing notes from localStorage
const getSavedNotes = function () {
    const notesJSON = localStorage.getItem('notes')

    if (notesJSON !== null) {
        return JSON.parse(notesJSON)
    } else {
        return []
    }
}

//Save notes to the localStorage
const saveNotes = function(notes) {
    localStorage.setItem('notes', JSON.stringify(notes))
} 

//Remove a note from the list 
const removeNote = function (id) {
    const noteIndex = notes.findIndex(function(note) {
        return note.id === id
    })
    if (noteIndex > -1 ) {
        notes.splice(noteIndex, 1)
    }
}

//Create the DOM structure for a note
const generateNoteDom = function (note) {
    const noteEl = document.createElement('div')
    const textEl = document.createElement('a')
    const button = document.createElement('button')

    //Setup the remove note button
    button.textContent= 'x'
    noteEl.appendChild(button)
    button.addEventListener('click', function() {
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })
    
    //Setup the note title text
    textEl.setAttribute('href', `edit.html#${note.id}`)
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    noteEl.appendChild(textEl)
    
    return noteEl
}

// sort your notes by one of three ways
const sortNotes = function (notes, sortBy) {
    if (sortBy === 'byEdited') {
        return notes.sort(function(a, b) {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort (function(a, b) {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    }  else if (sortBy === 'alphabetical') {
        return notes.sort(function(a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.lowercase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}

//Render application notes
const renderNotes = function (notes, filters) {
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter(function (note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    
    document.querySelector('#notes').innerHTML = ''

    filteredNotes.forEach(function (note) {
        const noteEl = generateNoteDom(note)
        document.querySelector('#notes').appendChild(noteEl)
    })
}

//Get timestamp at any moment
const getTimestamp = function() {
    const time = moment()
    return time.valueOf()
}

const updateLastEdited = function(timestamp) {
    return `Last edited ${moment(timestamp).fromNow()}`
}
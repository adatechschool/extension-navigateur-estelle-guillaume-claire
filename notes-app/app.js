
// tableau des notes
const allNotes = [
    {
        "title": "coucou tout le monde",
        "note": "we are the best group ever ! <3",
        "created": "Today",
        "tags": ["Personal"]
    }
]

// variables (utilisées dans les fonctions ensuite)
const newNoteForm = document.querySelector("#newNoteForm")
newNoteForm.style.display = 'none'

const allNotesList = document.querySelector("#allNotes")

let title = document.querySelector("#title").value
let note = document.querySelector("#note").value
let tags = []
let checkedTags = document.querySelectorAll(".tag")
let newNoteBtn = document.querySelector(".newNoteBtn")

const dayOfYear = date =>
    Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);


// fonction pour créer une nouvelle note
const newNote = () => {
    newNoteForm.style.display = 'flex' // affichage du formulaire
    document.querySelector("#title").value = ''
    document.querySelector("#note").value = ''
    tags = []

    for (let tag of checkedTags) {
        tag.checked = false
    }

    allNotesList.style.display = 'none' // cacher la liste des notes
}

// validation du formulaire
newNoteForm.addEventListener("submit", (e) => {
    e.preventDefault()
    title = document.querySelector("#title").value
    note = document.querySelector("#note").value

    for (let tag of checkedTags) {
        if (tag.checked) {
            tags.push(tag.value)
        }
    }

    let timestamp = new Date()
    if (dayOfYear(timestamp) == dayOfYear(new Date())) {
        timestamp = "Today " + timestamp.toLocaleTimeString()
    } else {
        timestamp = timestamp.toLocaleDateString()
    }

    // push des infos dans le tableau des notes
    allNotes.push({ "title": title, "note": note, "created": timestamp, "tags": tags })
    displayNotes()
    newNoteForm.style.display = 'none' // cacher le formulaire
})

// click du bouton pour créer une nouvelle note
newNoteBtn.addEventListener("click", newNote)

// affichage de la liste de notes (avec une boucle)
const displayNotes = () => {
    document.querySelector('#allNotes').innerHTML = ''
    for (let i = 0; i < allNotes.length; i++) {
        const tagsArr = []
        for (let j = 0; j < allNotes[i].tags.length; j++) {
            tagsArr.push(allNotes[i].tags[j])
        }

        document.querySelector('#allNotes').innerHTML += `
        <div class="listItem">
            <h2 class="title">${allNotes[i].title}</h2>
            <div class="tagsList">${tagsArr}</div>
            <div class="note">${allNotes[i].note}</div>
            <div class="timestamp">${allNotes[i].created}</div>
        </div>`
    }

    allNotesList.style.display = 'inherit'
}

displayNotes()
// localStorage.clear()

// masquer le formulaire à l'initialisation du js
const newNoteForm = document.querySelector("#newNoteForm")
newNoteForm.style.display = 'none'

// variables (utilisées dans les fonctions ensuite)
const allNotesList = document.querySelector("#allNotes")
const noNotes = document.querySelector("#noNotes")
let title = document.querySelector("#title").value
let note = document.querySelector("#note").value
let tags = []
let checkedTags = document.querySelectorAll(".tag")
let newNoteBtn = document.querySelector(".newNoteBtn")

const dayOfYear = date =>
    Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

// tableau des notes 
let allNotes = []
if (localStorage.getItem('allNotes')) {
    allNotesList.innerHTML = ''
    allNotes = JSON.parse(localStorage.getItem('allNotes'))
} 
if (allNotes.length == 0) {
    noNotes.innerHTML += "<p> no notes yet </p>"
}

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
    newNoteBtn.style.display = 'none' // cacher le bouton new note
    noNotes.style.display = 'none' // cacher "no notes yet"
}

// validation du formulaire
newNoteForm.addEventListener("submit", (event) => {
    event.preventDefault() // empêcher reload du js
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

    newNoteForm.style.display = 'none' // cacher le formulaire
    displayNotes()
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
    newNoteBtn.style.display = 'inherit'

    localStorage.setItem('allNotes', JSON.stringify(allNotes))
}

displayNotes()
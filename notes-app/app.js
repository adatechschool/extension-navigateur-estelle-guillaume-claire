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

const archives = []

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
    isBoxChecked();
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
    timestamp = timestamp.toLocaleDateString()
    

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
    console.log(allNotes)
    for (let i = 0; i < allNotes.length; i++) {
        const tagsArr = []
        for (let j = 0; j < allNotes[i].tags.length; j++) {
            tagsArr.push(allNotes[i].tags[j])
        }

        document.querySelector('#allNotes').innerHTML += `
        <div class="listItem tag${tagsArr}">
            <div class="headerNote"><h2 class="title">${allNotes[i].title}</h2><button id="${i.toString()}"><svg class="icon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button></div>
            <div class="tagsList">${tagsArr}</div>
            <div class="note"><a id='noteContent${i}'>${allNotes[i].note.slice(0,150) + '...'}</a></div>
            <div class="timestamp">${allNotes[i].created}</div>
            <div align='center'><button class='seeMore' id='seeMore${i}'>See more</button></div>
        </div>`

        //si la note fait - de 150 caractères, pas de bouton see more
        if (allNotes[i].note.length<150){
            let lop = document.getElementById(`seeMore${i}`)
            lop.parentNode.removeChild(lop)
        }
    }
    
    allNotesList.style.display = 'inherit'
    newNoteBtn.style.display = 'inherit'
    

    localStorage.setItem('allNotes', JSON.stringify(allNotes))
}
displayNotes()

for (let i = 0 ; i < allNotes.length ; i++) {
    const noteToArchive = document.getElementById(`${i.toString()}`)
    noteToArchive.addEventListener("click", (event) => {
        const note = allNotes.splice(i, 1)
        archives.push(note)
        displayNotes()
        
        if (allNotes.length == 0) {
    noNotes.innerHTML += "<p> no notes yet </p>"
}})}

//bouton see more qui affiche le rest de la note de plus de 150 caractères
for (let i = 0 ; i < allNotes.length ; i++) {
    const noteToModify = document.getElementById(`seeMore${i}`)
    noteToModify.addEventListener("click", (event) => {
        let noteContent = document.getElementById(`noteContent${i}`);
        let newNoteContent = document.createTextNode(`${allNotes[i].note}`);
        
    //remplacer les 150 premiers caractères par la note en entière
        noteContent.replaceChild(newNoteContent, noteContent.firstChild);
    //retire le bouton "see more" après avoir cliqué dessus.
        noteToModify.parentNode.removeChild(noteToModify);})
}
    


const isBoxChecked = () => {
    let isChecked = document.getElementById("checkboxReminder").checked;
    if (isChecked == true)
        console.log("The box is checked");
        console.log(document.getElementById("reminder").value);
        //return isChecked;
    //console.log(isChecked);
    return isChecked;
}

//isBoxChecked()

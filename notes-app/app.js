const allNotes = []

const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

const newNote = () => {
    const newNoteForm = document.querySelector("#newNoteForm")
    newNoteForm.innerHTML =
        `
        <label for="title">Title:</label><br>
        <input id="title" style="width:200px"><br><br>
        <label for="note">Note:</label><br>
        <textarea id="note" style="width:200px; height:200px"></textarea><br><br>
        <button id="submit">Submit</button>
    `

    const form = document.querySelector("#submit")
    form.addEventListener("click", (e) => {
        const title = document.querySelector("#title").value
        const note = document.querySelector("#note").value
        let timestamp = new Date()
            if (dayOfYear(timestamp) == dayOfYear(new Date())) {
                timestamp = "Today " + timestamp.toLocaleTimeString()
            } else {
                timestamp = timestamp.toLocaleDateString()
            }

        allNotes.push({ "title": title, "note": note, "created": timestamp })
        displayNotes()
        newNoteForm.innerHTML = ""
    })
}

const newNoteBtn = document.querySelector(".newNoteBtn")
newNoteBtn.addEventListener("click", newNote)

const displayNotes = () => {
    const allNotesList = document.querySelector("#allNotes")
    allNotesList.innerHTML = ''

    for (let i = 0; i < allNotes.length; i++) {
        allNotesList.innerHTML += `
    <div>Title : ${allNotes[i].title} Note: ${allNotes[i].note} Created: ${allNotes[i].created}</div>
    `
    }
}


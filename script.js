const colors = ["#DDFFBB", "#C7E9B0", "#B3C99C", "#A4BC92"]
const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

function getNotes() {
    return JSON.parse(localStorage.getItem("mynotes") || "[]");
}

function saveNotes(notes) {
    localStorage.setItem("mynotes", JSON.stringify(notes));
}

// testNotes = [
//     {"id": 1, "content": "Привет из первой заметки!" },
//     {"id": 2, "content": "Это вторая заметка" },
//     {"id": 3, "content": "Третья заметка" }
// ]

console.log(getNotes());

//Создаем заметку

function createNoteElement(id, content, color) {
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.style.backgroundColor = colors[color];
    element.placeholder = "Новая заметка!";

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    element.addEventListener("dblclick", () => {
        const doDelete = confirm("Удалить заметку?");

        if (doDelete) {
            deleteNote(id, element);
        }
    });

    return element;
}

function addNote() {
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: "",
        color: Math.floor(Math.random() * colors.length)
    };
    const noteElement = createNoteElement(noteObject.id, noteObject.content, noteObject.color);
    notesContainer.insertBefore(noteElement, addNoteButton)

    notes.push(noteObject);
    saveNotes(notes);
    console.log("Добавляем заметку...")
}

function updateNote(id, newContent) {

    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
    console.log("Изменяем заметку...");
    console.log(id, newContent);
}

function deleteNote(id, element) {

    const notes = getNotes().filter(note => note.id != id);
    saveNotes(notes);
    notesContainer.removeChild(element);
    console.log("Удаляем заметку...");
    console.log(id);
}

// Выводим заметки на страницу
getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content, note.color);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());


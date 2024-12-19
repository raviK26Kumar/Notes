const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll('.input-box');

// Load notes from localStorage when the page loads
function showNotes() {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
        notesContainer.innerHTML = storedNotes;
    }
}
showNotes();

// Save the current state of notes to localStorage
function updateStorage() {
    localStorage.setItem('notes', notesContainer.innerHTML);
}

// Create a new note and save it
createBtn.addEventListener('click', () => {
    let inputBox = document.createElement('p');
    let img = document.createElement('img');

    // Style and attributes for the new note
    inputBox.className = "input-box";
    inputBox.setAttribute('contenteditable', 'true');
    img.src = "delete.png";

    // Append the new note and update storage
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
    updateStorage();

    // Add onkeyup event for the new note
    inputBox.onkeyup = function () {
        updateStorage();
    };
});

// Handle delete and edit events
notesContainer.addEventListener("click", function (e) {
    // Handle delete action
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }

    // Handle edit action
    else if (e.target.tagName === "P") {
        notes = document.querySelectorAll('.input-box');
        notes.forEach(nt => {
            nt.onkeyup = function () {
                updateStorage();
            };
        });
    }
});

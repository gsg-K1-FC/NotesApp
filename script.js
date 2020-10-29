let storedNotes = JSON.parse(localStorage.getItem("notes"));

let notes = storedNotes ? storedNotes : [];
let list = document.getElementById("list");

showNotes();
document.getElementById("add-btn").addEventListener("click", function () {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  console.log(description, "des");

  if (title === "") {
    alert("pleas enter the title of the note");
  } else {
    notes.push({ title: title, description: description });
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

    console.log(notes, "notes");
    showNotes();
  }
});

function showNotes() {
  list.innerHTML = "";

  notes.map(function (note, i) {
    let listItem = document.createElement("LI");

    let divTitle = document.createElement("DIV");
    divTitle.textContent = note.title;

    let divDescription = document.createElement("DIV");
    divDescription.textContent = note.description;

    let deleteNoteBtn = document.createElement("BUTTON");
    let deleteBtnText = document.createTextNode("Delete");

    deleteNoteBtn.appendChild(deleteBtnText);
    deleteNoteBtn.addEventListener("click", function () {
      let confirmationResults = confirm(
        "Are you sure you want to delete this note"
      );

      if (confirmationResults) {
        notes.splice(i, 1);
        showNotes();
      }
    });

    listItem.appendChild(divTitle);
    listItem.appendChild(divDescription);
    listItem.appendChild(deleteNoteBtn);

    list.appendChild(listItem);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

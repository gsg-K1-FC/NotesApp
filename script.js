let storedNotes = JSON.parse(localStorage.getItem("notes"));
let notes = storedNotes ? storedNotes : [];
let list = document.getElementById("list");
let divEdit = document.getElementById("edit-note");

showNotes();
document.getElementById("add-btn").addEventListener("click", function () {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  if (title === "") {
    alert("pleas enter the title of the note");
  } else {
    notes.push({ title: title, description: description });
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    showNotes();
  }
});

function showNotes() {
  sortNotes();
  list.innerHTML = "";

  notes.map(function (note, i) {
    let listItem = document.createElement("LI");
    listItem.setAttribute("id", i);

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

    let EditnoteBtn = document.createElement("BUTTON");
    let EditBtnText = document.createTextNode("Edit");

    EditnoteBtn.appendChild(EditBtnText);

    EditnoteBtn.addEventListener("click", function () {
      if (document.querySelector("#list li.selected") != null) {
        document
          .querySelector("#list li.selected")
          .classList.remove("selected");
      }

      divEdit.classList.remove("hide");
      listItem.classList.add("selected");

      document.getElementById("save").addEventListener("click", function () {
        let title = document.getElementById("edit-title").value;
        let description = document.getElementById("edit-description").value;

        if (document.querySelector("#list li.selected") != null) {
          selectedId = document
            .querySelector("#list li.selected")
            .getAttribute("id");

          notes.map((note, i) => {
            if (selectedId == i) {
              note.title = title;
              note.description = description;
              divEdit.classList.add("hide");
              document.getElementById("edit-title").value = "";
              document.getElementById("edit-description").value = "";
              listItem.classList.remove("selected");
              showNotes();
            }
          });
        }
      });
    });

    listItem.appendChild(divTitle);
    listItem.appendChild(divDescription);
    listItem.appendChild(deleteNoteBtn);
    listItem.appendChild(EditnoteBtn);

    list.appendChild(listItem);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

function sortNotes() {
  notes.sort(function (a, b) {
    var nameA = a.title.toUpperCase();
    var nameB = b.title.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}

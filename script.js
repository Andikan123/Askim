const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popupTitle = popupBox.querySelector("header p");
const closeBtn = popupBox.querySelector("header i");
const titleTag = popupBox.querySelector("input");
const descTag = popupBox.querySelector("textarea");
const addBtn = popupBox.querySelector("button");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
//getting localstoarge notes if exist and parsing them
//to js object else passing an empty array to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,
  updateId;

addBox.addEventListener("click", () => {
  titleTag.focus();
  popupBox.classList.add("show");
});
closeBtn.addEventListener("click", () => {
  popupBox.classList.remove("show");
  addBtn.innerHTML = "Add Note";
  popupTitle.innerHTML = "Add a Note";
  titleTag.value = "";
  descTag.value = "";
  isUpdate = false;
});

function showNotes() {
  document.querySelectorAll(".note").forEach((note) => note.remove());

  notes.forEach((note, index) => {
    let liTag = ` <li class="note">
   <div class="details">
     <p>${note.title}</p>
     <span>${note.description}</span>
   </div>
   <div class="bottom-content">
     <span>${note.date}</span>
     <div class="setting">
       <i onclick ="showMenu(this)" class="fa-solid fa-ellipsis"></i>
       <ul class="menu">
         <li onclick="updateNote(${index},'${note.title}','${note.description}')"><i class="fa-solid fa-pen"></i>Edit</li>
         <li onclick="deleteNote(${index})"><i class="fa-solid fa-trash"></i>Delete</li>
       </ul>
     </div>
   </div>
 </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}
showNotes();

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}
function deleteNote(noteId) {
  let confirmDel = confirm("Are you sure you want to delete this?");
  if (!confirmDel) return;
  notes.splice(noteId, 1);
  //saving updated notes to locationstorage
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function updateNote(noteId, title, desc) {
  isUpdate = true;
  updateId = noteId;
  addBox.click();
  titleTag.value = title;
  descTag.value = desc;
  addBtn.innerHTML = "Update Note";
  popupTitle.innerHTML = "Update a Note";
  console.log(noteId, title, desc);
}
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = titleTag.value,
    noteDesc = descTag.value;

  if (noteTitle || noteDesc) {
    let dateObj = new Date(),
      month = months[dateObj.getMonth()],
      day = dateObj.getDate(),
      year = dateObj.getFullYear();

    let noteInfo = {
      title: noteTitle,
      description: noteDesc,
      date: `${month} ${day}, ${year}`,
    };
    if (!isUpdate) {
      notes.push(noteInfo); //adding new note to notes
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo; //updating specified note
    }

    //saving notes to locationstorage
    localStorage.setItem("notes", JSON.stringify(notes));
    closeBtn.click();
    showNotes();
  }
});

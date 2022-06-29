const addButton = document.querySelectorAll("[data-add-button]");
const closeButton = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
/* open and close buttons */
addButton.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.addButton);
    openModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

closeButton.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(".modal-add-book");
    closeModal(modal);
  });
});

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

let myLibrary = [];

class Book {
  constructor(title, author, description, pages, read) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary() {
  // do stuff here
}

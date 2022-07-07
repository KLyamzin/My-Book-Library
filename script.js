const addButton = document.querySelectorAll("[data-add-button]");
const closeButton = document.querySelectorAll("[data-close-button]");
const submitButton = document.getElementById("submit");
const overlay = document.getElementById("overlay");
const cardContainer = document.querySelector(".card-container");
const addBookForm = document.querySelector("#add-book-form");
const addBookModal = document.querySelector("#modal-add-book");
const errorTitle = document.getElementById("errorTitle");
let readCheckBox = document.getElementById("read");
addBookForm.onsubmit = addBookToLibrary;

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
    closeModal();
  });
});
overlay.addEventListener("click", () => {
  closeModal();
});
function closeModal() {
  addBookModal.classList.remove("active");
  overlay.classList.remove("active");
  addBookForm.reset();
  errorTitle.classList.remove("active");
}

/* constructors */
class Book {
  constructor(title, author, isbn, description, read) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.description = description;
    this.read = read;
  }
}

class Library {
  constructor() {
    this.books = [];
  }
  addBook(newBook) {
    if (!this.duplicateCheck(newBook)) {
      this.books.push(newBook);
    }
  }
  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }
  duplicateCheck(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }
  getBook(isbn) {
    return this.books.find((book) => book.isbn === isbn);
  }
}

/* main functionality*/
const library = new Library();

function getInputValue() {
  const title = document.querySelector("#book-title").value;
  const author = document.querySelector("#author-name").value;
  const description = document.querySelector("#description").value;
  const isbn = document.querySelector("#isbn").value;
  const read = document.querySelector("#read").checked;
  return new Book(title, author, isbn, description, read);
}

function addBookToLibrary(e) {
  e.preventDefault();
  const newBook = getInputValue();
  if (library.duplicateCheck(newBook)) {
    errorTitle.classList.add("active");
  } else {
    library.addBook(newBook);
    saveLocal();
    displayBook();
    closeModal();
  }
}

function displayBook() {
  cardContainer.innerHTML = "";
  restoreLocal();
  for (let book of library.books) {
    createCard(book);
  }
}

function createCard(book) {
  const card = document.createElement("div");
  const title = document.createElement("h3");
  const author = document.createElement("h4");
  const description = document.createElement("p");
  const footer = document.createElement("div");
  const cardButtons = document.createElement("div");
  const isbnLabel = document.createElement("p");
  const isbnNumber = document.createElement("p");
  const isRead = document.createElement("img");
  const deleteCard = document.createElement("img");

  card.classList.add("card");
  title.classList.add("title");
  author.classList.add("author");
  description.classList.add("description");
  cardButtons.classList.add("card-buttons");
  footer.classList.add("card-footer");
  isbnLabel.innerText = `ISBN: `;
  isbnNumber.classList.add("isbn");
  isRead.classList.add("read");
  deleteCard.classList.add("deleteCard");
  cardButtons.classList.add("push-left");

  title.textContent = `${book.title}`;
  author.textContent = `${book.author}`;
  isbnNumber.textContent = `${book.isbn}`;
  description.textContent = `${book.description}`;
  isRead.textContent = `${book.read}`;
  if (isRead.textContent == "true") {
    isRead.setAttribute("src", "assets/icons/eye-check.svg");
  }
  if (isRead.textContent == "false") {
    isRead.setAttribute("src", "assets/icons/eye-off.svg");
  }
  deleteCard.setAttribute("src", "assets/icons/trash-can.svg");

  isRead.onclick = changeRead;
  deleteCard.onclick = deleteBook;

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(description);
  card.appendChild(footer);
  footer.appendChild(isbnLabel);
  footer.appendChild(isbnNumber);
  footer.appendChild(cardButtons);
  cardButtons.appendChild(deleteCard);
  cardButtons.appendChild(isRead);
  cardContainer.appendChild(card);
}

function changeRead(e) {
  const isbn = e.target.parentNode.parentNode.firstChild.nextSibling.innerHTML;
  const book = library.getBook(isbn);
  book.read = !book.read;
  saveLocal();
  displayBook();
}

function deleteBook(e) {
  const title = e.target.parentNode.parentNode.parentNode.firstChild.innerHTML;
  library.removeBook(title);
  saveLocal();
  displayBook();
}

displayBook();

// save to local storage
function saveLocal() {
  localStorage.setItem("library", JSON.stringify(library.books));
}
function restoreLocal() {
  const books = JSON.parse(localStorage.getItem("library"));
  if (books) {
    library.books = books.map((book) => JSONToBook(book));
  } else {
    library.books = [];
  }
}
function JSONToBook(book) {
  return new Book(
    book.title,
    book.author,
    book.isbn,
    book.description,
    book.read
  );
}

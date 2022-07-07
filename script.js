const addButton = document.querySelectorAll("[data-add-button]");
const closeButton = document.querySelectorAll("[data-close-button]");
const submitButton = document.getElementById("submit");
const overlay = document.getElementById("overlay");
const cardContainer = document.querySelector(".card-container");
const addBookForm = document.querySelector("#add-book-form");
const addBookModal = document.querySelector("#modal-add-book");

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
    // const modal = document.querySelector(".modal-add-book");
    // closeModal(modal);
    closeModal();
  });
});
overlay.addEventListener("click", () => {
  // const activeModals = document.querySelectorAll(".modal-add-book.active");
  // activeModals.forEach((modal) => {
  // closeModal(modal);
  closeModal();
  // });
});
submitButton.addEventListener("submit", (e) => {
  // e.preventDefault();
  // const modal = document.querySelector(".modal-add-book");
  closeModal();
  // addBookToLibrary();
});
/* function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
} */
function closeModal() {
  // if (modal == null) return;
  addBookModal.classList.remove("active");
  overlay.classList.remove("active");
}

/*  add a book to the library */
/* let myLibrary = [
  {
    title: "The Hobbit",
    author: "John Smith",
    isbn: "123456",
    description: "The Hobbits and the lord of the ring",
    read: true,
  },
  {
    title: "The Matrix",
    author: "Wachovski",
    isbn: "3394853",
    description: "The Matrix Beginning",
    read: true,
  },
  {
    title: "Witcher",
    author: "John Mickel",
    isbn: "993456",
    description: "Cool dude killing bad things",
    read: false,
  },
]; */

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
    this.books = [
      {
        title: "The Hobbit",
        author: "John Smith",
        isbn: "123456",
        description: "The Hobbits and the lord of the ring",
        read: true,
      },
    ];
  }
  addBook(newBook) {
    this.books.push(newBook);
  }
  removeBook(isbn) {
    this.books = this.books.filter((book) => book.isbn !== isbn);
  }
}
const library = new Library();

function displayBook() {
  resetBook();
  // restoreLocal();
  // saveLocal();
  for (let book of library.books) {
    createCard(book);
  }
}
function resetBook() {
  cardContainer.innerHTML = "";
}
function createCard(book) {
  const card = document.createElement("div");
  const title = document.createElement("h3");
  const author = document.createElement("h4");
  const description = document.createElement("p");
  const cardButtons = document.createElement("div");
  const isbnNumber = document.createElement("h4");
  const isRead = document.createElement("img");

  card.classList.add("card");
  title.classList.add("title");
  author.classList.add("author");
  description.classList.add("description");
  cardButtons.classList.add("card-buttons");
  isbnNumber.classList.add("isbn");
  isRead.setAttribute("src", "assets/icons/eye-off.svg");
  isRead.classList.add("read");

  title.textContent = `${book.title}`;
  author.textContent = `${book.author}`;
  isbnNumber.textContent = `${book.isbn}`;
  description.textContent = `${book.description}`;
  isRead.textContent = `${book.read}`;

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(description);
  cardButtons.appendChild(isbnNumber);
  cardButtons.appendChild(isRead);
  card.appendChild(cardButtons);
  cardContainer.appendChild(card);
}

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
  library.addBook(newBook);
  saveLocal();
  displayBook();
  closeModal();
}

addBookForm.onsubmit = addBookToLibrary;
displayBook();

// save to local storage
function saveLocal() {
  if (library.books.length !== 0) {
    localStorage.setItem("library", JSON.stringify(library.books));
  }
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
    book.isRead
  );
}

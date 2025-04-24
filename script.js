const myLibrary = [];
const docBody = document.querySelector("body");
const container = document.getElementById("container");
const card = document.getElementById("card");
const newBookForm = document.getElementById("new-book-entry");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");
const ratingInput = document.getElementById("rating");

const submitButton = document.querySelector("button");
const dialog = document.querySelector("dialog");
const showButton = document.getElementById("add-new");
const cancelButton = document.getElementById("cancel");

showButton.addEventListener("click", () => dialog.showModal());

cancelButton.addEventListener("click", (e) => {
  dialog.close();
  e.preventDefault();
});

function Book(title, author, pages, read, rating, id) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.rating = rating;
  this.id = id;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages. Read=${read}.`;
  };
  this.changeReadStatus = function () {
    const parents = document.querySelectorAll(".book-card");

    const elementParent = document.querySelector(
      `.book-card[data-id='${this.id}']`
    );
    elementParent.setAttribute("id", `${this.id}`);
    console.log(`elementParent: ${elementParent}`);
    const toggle = elementParent.querySelector("input[type='checkbox']");
    let checkBoxStatus = toggle.checked;
    console.log(checkBoxStatus);

    if (checkBoxStatus == true) {
      this.read = "Yes";

      const ratingUpdater = document.createElement("div");

      ratingUpdater.innerHTML =
        '<label for="newRating">New Rating</label><input type="number" class="new-rating" name="new-rating" min="1" max="5" step="1" /> <button type="submit" class="new-rating-button">Update</button>';
      elementParent.appendChild(ratingUpdater);
      console.log(`ratingUpdater: ${ratingUpdater}`);
      const updateButton = elementParent.querySelector(".new-rating-button");
      const updatedRating = document.querySelector(".new-rating");

      console.log(elementParent.querySelector(".new-rating").value);

      updateButton.addEventListener("click", () => {
        const newRating = updatedRating.value;
        this.rating = newRating;
        displayObjects();
      });
    } else {
      this.read = "No";
      displayObjects();
    }
  };
}

function addBookToLibrary(
  newTitle,
  newAuthor,
  newPages,
  newRead,
  newRating,
  bookId
) {
  const book = new Book(
    newTitle,
    newAuthor,
    newPages,
    newRead,
    newRating,
    (bookId = crypto.randomUUID())
  );

  myLibrary.push(book);

  // addBookToDom();
  displayObjects();
}

function displayObjects() {
  container.innerHTML = "";
  myLibrary.forEach((book) => {
    const newCard = document.createElement("div");
    newCard.className = "book-card";
    newCard.setAttribute("data-id", `${book.id}`);
    const newCardTitle = document.createElement("h3");

    const newCardAuthor = document.createElement("div");

    const newCardPages = document.createElement("div");

    const newCardRead = document.createElement("div");
    const newCardRating = document.createElement("div");
    const deleteButton = document.createElement("button");

    deleteButton.className = "delete-button";

    if (!document.querySelector(".book-card")) {
      container.appendChild(newCard);
    } else {
      container.insertAdjacentElement("afterbegin", newCard);
    }

    newCard.appendChild(newCardTitle);
    newCard.appendChild(newCardAuthor);
    newCard.appendChild(newCardPages);
    newCard.appendChild(newCardRead);
    newCard.appendChild(newCardRating);
    newCard.appendChild(deleteButton);

    newCardTitle.textContent = `${book.title}`;

    newCardAuthor.innerHTML = `<div> <span class="category">Author: </span>${book.author}</div>`;
    newCardPages.innerHTML = `<div> <span class="category">Pages: </span>${book.pages}</div>`;
    newCardRead.innerHTML = `<div> <span class="category">Read? </span>${book.read} <span class="toggle"><label class="switch"><input type="checkbox"><span class="slider round"></span></label></span></div>`;

    deleteButton.innerHTML = "Delete this book";

    if (book.read === "Yes") {
      newCardRead.innerHTML = `<div> <span class="category">Read? </span>${book.read} <span class="toggle"><label class="switch"><input type="checkbox" class="toggle-read" checked/ ><span class="slider round"></span></label></span></div>`;
      newCardRating.innerHTML = `<div> <span class="category">Rating: </span>${book.rating}/5</div>`;
    } else {
      newCardRead.innerHTML = `<div> <span class="category">Read? </span>${book.read} <span class="toggle"><label class="switch"><input type="checkbox" class="toggle-read"><span class="slider round"></span></label></span></div>`;
      newCardRating.innerHTML = `<div> <span class="category">Rating: </span>Unrated</div>`;
    }

    const toggle = newCardRead.querySelector(".toggle-read");

    toggle.addEventListener("change", () => {
      const cardId = newCard.getAttribute("data-id");

      const bookToToggle = myLibrary.find((readBook) => {
        return readBook.id === cardId;
      });

      bookToToggle.changeReadStatus();
    });

    getDeleteButton();
    clearDialogFields();
  });
}

function getDeleteButton() {
  let deleteButtonArray = document.querySelectorAll(".delete-button");

  deleteButtonArray.forEach((i) => {
    i.addEventListener("click", () => {
      console.log("BEGIN");

      let deleteId = i.parentElement.getAttribute("data-id");
      console.log(i.parentElement);

      const indexForDeletion = myLibrary.findIndex((book) => {
        return book.id === deleteId;
      });

      let confirmText = "Are you sure you want to delete?";

      console.log(deleteId);
      if (indexForDeletion === -1) {
        console.log("not found");
      } else if (confirm(confirmText) == true) {
        i.parentElement.remove();
        console.log(`index to delete is: ${indexForDeletion}`);
        let deletedItems = [];
        console.table(myLibrary);
        deletedItems.push(myLibrary.splice(indexForDeletion, 1));
        console.table(`deletedItems: ${deletedItems}`);
        console.table(`After deletion, array is: ${myLibrary}`);
        return deletedItems;
      } else {
        console.log("cancelled");
      }
    });
  });
}

function updateRating() {
  const ratingUpdater = document.createElement("div[class='rating-updater']");

  ratingUpdater.innerHTML = `<label for="newRating">New Rating</label><input type="number" class="new-rating"
 name="new-rating" min="1" max="5" setp="1" /> <button type="submit" class="new-rating-button">Update</button>`;

  //  const currentCard = document.querySelector(".book-card[data-id='");

  elementParent.appendChild(ratingUpdater);
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  const readValue = () => (readInput.value === "yes" ? "Yes" : "No");

  addBookToLibrary(
    titleInput.value,
    authorInput.value,
    pagesInput.value,

    readValue(),
    ratingInput.value
  );
  dialog.close();
});

function clearDialogFields() {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
}

//OLD FUNCTION
// function addBookToDom() {
//   let n = myLibrary.length;
//   const newCard = document.createElement("div");
//   newCard.className = "book-card";
//   newCard.setAttribute("data-id", `${myLibrary[n - 1].id}`);
//   const newCardTitle = document.createElement("h3");

//   const newCardAuthor = document.createElement("div");

//   const newCardPages = document.createElement("div");

//   const newCardRead = document.createElement("div");
//   const deleteButton = document.createElement("button");
//   deleteButton.className = "delete-button";

//   if(!document.querySelector(".book-card")){
//   container.appendChild(newCard)
//   } else {
//    container.insertAdjacentElement("afterbegin", newCard);
//   }

//   newCard.appendChild(newCardTitle);
//   newCard.appendChild(newCardAuthor);
//   newCard.appendChild(newCardPages);
//   newCard.appendChild(newCardRead);
//   newCard.appendChild(deleteButton);

//   newCardTitle.textContent = `${myLibrary[n - 1].title}`;

//   newCardAuthor.innerHTML = `<div> <span class="category">Author: </span>${myLibrary[n - 1].author}</div>`;
//   newCardPages.innerHTML = `<div> <span class="category">Pages: </span>${myLibrary[n - 1].pages}</div>`;
//   newCardRead.innerHTML = `<div> <span class="category">Read? </span>${myLibrary[n - 1].read}</div>`;
//   deleteButton.innerHTML = "Delete this book";

//   getDeleteButton();
//   clearDialogFields();

// }
